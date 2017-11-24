/**
 * @module ./src/usecases/AddressWeatherHistory
 */

const
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
    this.geocoderGateway = geocoderGateway;
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
      coordinatesAttrs = await this.geocoderGateway.fromAddress(addressEntity.singleLineAddress);

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
}

module.exports = {
  AddressGeocoderInterface,
  AddressWeatherHistoryInteractor,
};
