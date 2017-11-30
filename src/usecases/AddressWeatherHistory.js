/**
 * @module ./src/usecases/AddressWeatherHistory
 */

const
  _                         = require("lodash"),
  moment                    = require("moment-timezone"),

  /** @type {Operation} */
  Operation                 = require("./Operation"),

  /** @type {AddressInputInterface} */
  { AddressInputInterface } = require("src/http/controllers/WeatherAddress"), // TODO: Enforce implementation???

  /** @type {Address} */
  Address                   = require("src/entities/Address"),
  /** @type {Coordinates} */
  Coordinates               = require("src/entities/Coordinates"),
  /** @type {History} */
  History                   = require("src/entities/History");

/**
 * @interface
 */
class AddressGeocoderInterface {
  fromAddress (singleLineAddress) {
  }
}

/**
 * @interface
 */
class TimezoneGatewayInterface {
  fromCoordinates ({ latitude, longitude }) {
  }
}

/**
 * @interface
 */
class WeatherGatewayInterface {
  async getHistoricInfo ({ latitude: latitudeParam, longitude: longitudeParam, dateTime: dateTimeParam }) {
  }
}

class WeatherHistoryPresenterInterface {
  toOutputPort ({ observationPoints, isErrorFree }) {
  }
}

class AddressWeatherHistoryInteractor extends Operation {
  constructor ({ geocoderGateway, timezoneGateway, weatherGateway }) {
    super();

    this.geocoderGateway = geocoderGateway;
    this.timezoneGateway = timezoneGateway;
    this.weatherGateway  = weatherGateway;

    // Init privates
    this[Symbol.for("_isErrorFree")] = true;
  }

  /**
   * Composes weather history data for the past week.
   *
   * @public
   * @param streetNumber
   * @param streetName
   * @param city
   * @param state
   * @param zipCode
   * @returns {Promise.<void>}
   */
  async composePreviousDaily ({ streetNumber, streetName, city, state, zipCode }) {
    const
      _isErrorFree             = Symbol.for("_isErrorFree"),
      _composeHistoryEntity    = Symbol.for("_composeHistoryEntity"),
      _assembleHistoricInfo    = Symbol.for("_assembleHistoricInfo"),

      { DAILY_SUCCESS, ERROR } = this.outputs;

    try {
      await this.getCoordinates({ streetNumber, streetName, city, state, zipCode });
      await this[_composeHistoryEntity]();
      await this[_assembleHistoricInfo]();
    } catch (error) {
      this[_isErrorFree] = false;
      // This return structure depends on the WeatherHistoryPresenterInterface defined in this module.
      return this.emit(ERROR, {
        errorDetails: error,
        isErrorFree:  this[_isErrorFree],
      });
    }

    const observationPoints = _.get(this.historyEntity.toJSON(), "observationPoints", []);
    // This return structure depends on the WeatherHistoryPresenterInterface defined in this module.
    return this.emit(DAILY_SUCCESS, {
      observationPoints: observationPoints,
      isErrorFree:       this[_isErrorFree],
    });
  }

  /**
   * Obtains the GPS coordinates of a standard address.
   *
   * @public
   * @param streetNumber
   * @param streetName
   * @param city
   * @param state
   * @param zipCode
   * @returns {Promise.<{latitude: Number, longitude: Number}|Boolean>}
   */
  async getCoordinates ({ streetNumber, streetName, city, state, zipCode }) {
    const
      _isErrorFree                                     = Symbol.for("_isErrorFree"),

      { COORDINATES_SUCCESS, VALIDATION_ERROR, ERROR } = this.outputs;

    this.validateAddress({ streetNumber, streetName, city, state, zipCode });

    if (this[_isErrorFree]) {
      try {
        const
          coordinatesAttrs  = await this.geocoderGateway.fromAddress(this.addressEntity.singleLineAddress),
          coordinatesEntity = new Coordinates(coordinatesAttrs),

          {
            valid:  isValidCoordinates,
            errors: validationErrors,
          }                 = coordinatesEntity.validate();
        if (isValidCoordinates) {
          this.coordinatesEntity = coordinatesEntity;
          return this.emit(COORDINATES_SUCCESS, this.coordinatesEntity.toJSON());
        }
        // TODO: Add some logging
        this[_isErrorFree] = false;
        return this.emit(VALIDATION_ERROR, validationErrors);
      } catch (error) {
        // TODO: Add some logging
        this[_isErrorFree] = false;
        return this.emit(ERROR, error);
      }
    }

    // TODO: Add some logging
    this[_isErrorFree] = false;
    return this.emit(VALIDATION_ERROR, this[_isErrorFree]);
  }

  /**
   * Validates the input address attributes.
   *
   * @public
   * @param streetNumber
   * @param streetName
   * @param city
   * @param state
   * @param zipCode
   * @returns {Boolean}
   */
  validateAddress ({ streetNumber, streetName, city, state, zipCode }) {
    const
      _isErrorFree                             = Symbol.for("_isErrorFree"),

      { VALIDATION_SUCCESS, VALIDATION_ERROR } = this.outputs,

      addressEntity                            = new Address({ streetNumber, streetName, city, state, zipCode }),

      {
        valid:  isValidAddress,
        errors: validationErrors,
      }                                        = addressEntity.validate();
    if (isValidAddress) {
      this.addressEntity = addressEntity;
      return this.emit(VALIDATION_SUCCESS, this[_isErrorFree]);
    }

    // TODO: Add some logging
    this[_isErrorFree] = false;
    return this.emit(VALIDATION_ERROR, validationErrors);
  }

  /**
   * Composes a base history entity using existing address and coordinate entities.
   *
   * @private
   * @returns {Boolean}
   */
  async [Symbol.for("_composeHistoryEntity")] () {
    const
      _setTimezone                          = Symbol.for("_setTimezone"),
      _isErrorFree                          = Symbol.for("_isErrorFree"),

      { COMPOSE_SUCCESS, VALIDATION_ERROR } = this.outputs;

    await this[_setTimezone]();
    if (false !== this[_isErrorFree]) {
      const historyEntity = new History(Object.assign(
        this.coordinatesEntity, {
          timezone:       this.timezone,
          address:        this.addressEntity.singleLineAddress,
          originalMoment: moment().unix(),
        },
      ));

      const { valid: isValidHistory, errors: validationErrors } = historyEntity.validate();
      if (isValidHistory) {
        this.historyEntity = historyEntity;
        return this.emit(COMPOSE_SUCCESS, this[_isErrorFree]);
      }
      this[_isErrorFree] = false;
      return this.emit(VALIDATION_ERROR, validationErrors);
    }

    // TODO: Add some logging
    this[_isErrorFree] = false;
    return this.emit(VALIDATION_ERROR, this[_isErrorFree]);
  }

  /**
   * Assembles daily weather info in history data structure.
   *
   * @returns {Promise.<{Boolean}>}
   */
  async [Symbol.for("_assembleHistoricInfo")] () {
    const
      _isErrorFree                = Symbol.for("_isErrorFree"),
      weatherGatewayPromises      = [],

      { ASSEMBLE_SUCCESS, ERROR } = this.outputs,

      pastWeekDailyTimestamps     = this.historyEntity.getDailyStartOfDay(-7);

    if (false !== this[_isErrorFree]) {
      for (let dx = 0; dx < pastWeekDailyTimestamps.length; dx++) {
        weatherGatewayPromises.push(new Promise((resolve, reject) => {
          this.weatherGateway.getHistoricInfo(Object.assign(
            this.coordinatesEntity.toJSON(), {
              dateTime: pastWeekDailyTimestamps[dx],
            },
          )).then(weatherInfo => {
            resolve(weatherInfo);
          }).catch(error => {
            this[_isErrorFree] = false;
            return reject(error);
          });
        }));
      }

      return Promise.
        all(weatherGatewayPromises).
        then(weatherInfo => {
          this.historyEntity.addObservationPoints(weatherInfo);
        }).
        then(() => {
          return this.emit(ASSEMBLE_SUCCESS, this[_isErrorFree]);
        }).catch(error => {
          this[_isErrorFree] = false;
          return this.emit(ERROR, error);
        });
    }

    return this.emit(ASSEMBLE_SUCCESS, this[_isErrorFree]);
  }

  /**
   * Retrieves the timezone from an external source.
   *
   * @returns {Promise.<{timezone: *}>}
   * @private
   */
  async [Symbol.for("_setTimezone")] () {
    const { timezone } = await this.timezoneGateway.fromCoordinates(
      this.coordinatesEntity.toJSON(),
    );

    this.timezone = timezone;
    return { timezone };
  }

  /**
   * Has an error occurred?
   *
   * @private
   * @readonly
   * @returns {Boolean}
   */
  get [Symbol.for("_isErrorFree")] () {
    return AddressWeatherHistoryInteractor.getPrivate("isErrorFree", this);
  }

  /**
   * Assign a value when an error has occurred.
   *
   * @private
   * @param {Boolean} value
   */
  set [Symbol.for("_isErrorFree")] (value) {
    AddressWeatherHistoryInteractor.setPrivate("isErrorFree", value, this);
  }
}

AddressWeatherHistoryInteractor.setOutputs([
  "DAILY_SUCCESS",
  "COORDINATES_SUCCESS",
  "ASSEMBLE_SUCCESS",
  "COMPOSE_SUCCESS",
  "VALIDATION_SUCCESS",
  "VALIDATION_ERROR",
  "ERROR",
]);

module.exports = {
  AddressGeocoderInterface,
  TimezoneGatewayInterface,
  WeatherGatewayInterface,
  WeatherHistoryPresenterInterface,
  AddressWeatherHistoryInteractor,
};
