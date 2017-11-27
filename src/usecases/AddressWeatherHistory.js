/**
 * @module ./src/usecases/AddressWeatherHistory
 */

const
  // Private Map of Members
  privateMap  = new Map(),

  /** @type {Address} */
  Address     = require("src/entities/Address"),
  /** @type {Coordinates} */
  Coordinates = require("src/entities/Coordinates");

/**
 * @interface
 */
class AddressGeocoderInterface {
  fromAddress (singleLineAddress) {
  }
}

class AddressWeatherHistoryInteractor {
  constructor ({ geocoderGateway }) {
    this.geoCodeFromAddress = geocoderGateway.fromAddress;

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
        coordinatesAttrs  = await this.geoCodeFromAddress(this.addressEntity.singleLineAddress),
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
  AddressWeatherHistoryInteractor,
};
