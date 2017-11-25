/**
 * @module ./src/usecases/AddressWeatherHistory
 */

const
  moment      = require("moment-timezone"),

  // Private Map of Members
  privateMap  = new Map(),

  /** @type {Address} */
  Address     = require("src/entities/Address"),
  /** @type {Coordinates} */
  Coordinates = require("src/entities/Coordinates"),
  /** @type {History} */
  History     = require("src/entities/History");

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

class AddressWeatherHistoryInteractor {
  constructor ({ geocoderGateway, timezoneGateway, weatherGateway }) {
    this.geocoderGateway = geocoderGateway;
    this.timezoneGateway = timezoneGateway;
    this.weatherGateway  = weatherGateway;

    // Init privates
    this[Symbol.for("_isErrorFree")] = true;
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
    const _isErrorFree = Symbol.for("_isErrorFree");

    this.validateAddress({ streetNumber, streetName, city, state, zipCode });

    if (this[_isErrorFree]) {
      const
        coordinatesAttrs  = await this.geocoderGateway.fromAddress(this.addressEntity.singleLineAddress),
        coordinatesEntity = new Coordinates(coordinatesAttrs),

        {
          valid: isValidCoordinates,
        }                 = coordinatesEntity.validate();
      if (isValidCoordinates) {
        this.coordinatesEntity = coordinatesEntity;
        return this.coordinatesEntity.toJSON();
      }
      // TODO: Add some logging
      this[_isErrorFree] = false;
    }

    // TODO: Add some logging
    this[_isErrorFree] = false;
    return this[_isErrorFree];
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
      _isErrorFree  = Symbol.for("_isErrorFree"),
      addressEntity = new Address({ streetNumber, streetName, city, state, zipCode }),

      {
        valid: isValidAddress,
      }             = addressEntity.validate();
    if (isValidAddress) {
      this.addressEntity = addressEntity;
      return this[_isErrorFree];
    }

    // TODO: Add some logging
    this[_isErrorFree] = false;
    return this[_isErrorFree];
  }

  /**
   * Composes a base history entity using existing address and coordinate entities.
   *
   * @private
   * @returns {Boolean}
   */
  async [Symbol.for("_composeHistoryEntity")] () {
    const
      _setTimezone = Symbol.for("_setTimezone"),
      _isErrorFree = Symbol.for("_isErrorFree");

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
        return this[_isErrorFree];
      }
    }

    // TODO: Add some logging
    this[_isErrorFree] = false;
    return this[_isErrorFree];
  }

  /**
   * Assembles daily weather info in history data structure.
   *
   * @returns {Promise.<{Boolean}>}
   */
  async [Symbol.for("_assembleHistoricInfo")] () {
    const
      _isErrorFree            = Symbol.for("_isErrorFree"),
      pastWeekDailyTimestamps = this.historyEntity.getDailyStartOfDay(-7);

    if (false !== this[_isErrorFree]) {
      for (let dx = 0; dx < pastWeekDailyTimestamps.length; dx++) {
        const weatherInfo = await this.weatherGateway.getHistoricInfo(Object.assign(
          this.coordinatesEntity.toJSON(), {
            dateTime: pastWeekDailyTimestamps[dx],
          },
        ));
        this.historyEntity.addObservationPoints([weatherInfo]);
      }
    }

    // TODO: Add some logging
    return this[_isErrorFree];
  }

  /**
   * A helper that retrieves the value for a privately stored property.
   *
   * @static
   * @param   {String}                          privateVar - The name of the private variable
   * @param   {AddressWeatherHistoryInteractor} ctx        - Context
   * @public
   * @returns {*}                                          - The value assigned to the private variable.
   */
  static getPrivate (privateVar, ctx) {
    if (privateMap.has(ctx)) {
      return privateMap.get(ctx).get(Symbol.for(`${privateVar}Private`));
    }
  }

  /**
   * A helper that assigns a value to a privately stored property.
   *
   * @static
   * @param   {String}                          privateVar - The name of the private variable
   * @param   {*}                               value      - The value to assign to the private variable.
   * @param   {AddressWeatherHistoryInteractor} ctx        - Context
   * @public
   */
  static setPrivate (privateVar, value, ctx) {
    if (!privateMap.has(ctx)) {
      privateMap.set(ctx, new Map());
    }
    privateMap.get(ctx).set(Symbol.for(`${privateVar}Private`), value);
  }

  /**
   * Retrieves the timezone from an external source.
   *
   * @returns {Promise.<{timezone: *}>}
   * @private
   */
  async [Symbol.for("_setTimezone")] () {
    const { timezone } = await this.timezoneGateway.fromCoordinates(this.coordinatesEntity.toJSON());
    this.timezone      = timezone;
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

module.exports = {
  AddressGeocoderInterface,
  TimezoneGatewayInterface,
  WeatherGatewayInterface,
  AddressWeatherHistoryInteractor,
};
