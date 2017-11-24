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
   * @returns {Promise.<Coordinates|Boolean>}
   */
  async getCoordinates ({ streetNumber, streetName, city, state, zipCode }) {
    const
      addressEntity    = AddressWeatherHistoryInteractor.validateAddress({ streetNumber, streetName, city, state, zipCode }),
      coordinatesAttrs = await this.geoCodeFromAddress(addressEntity.singleLineAddress);

    if (false !== addressEntity && false !== coordinatesAttrs) {
      const
        coordinatesEntity = new Coordinates(coordinatesAttrs),

        {
          valid: isValidCoordinates,
        }                 = coordinatesEntity.validate();
      if (isValidCoordinates) {
        return coordinatesEntity;
      }
    }

    // TODO: Add some logging
    return false;
  }

  /**
   * Validates the input address attributes.
   *
   * @public
   * @static
   * @param streetNumber
   * @param streetName
   * @param city
   * @param state
   * @param zipCode
   * @returns {Address|Boolean}
   */
  static validateAddress ({ streetNumber, streetName, city, state, zipCode }) {
    const
      addressEntity = new Address({ streetNumber, streetName, city, state, zipCode }),

      {
        valid: isValidAddress,
      }             = addressEntity.validate();
    if (isValidAddress) {
      return addressEntity;
    }

    // TODO: Add some logging
    return isValidAddress;
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
}

module.exports = {
  AddressGeocoderInterface,
  AddressWeatherHistoryInteractor,
};
