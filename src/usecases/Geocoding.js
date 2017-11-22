/**
 * @module ./src/usecases/Geocoding
 */

const
  /** @type {Address} */
  Address     = require("src/entities/Address"),
  /** @type {Coordinates} */
  Coordinates = require("src/entities/Coordinates");

/**
 * @interface
 */
class GeocodingInterface {
  fromAddress (singleLineAddress) {
  }
}

class GeocodingInteractor {
  constructor ({ geocoder }) {
    this.geoCodeFromAddress = geocoder.fromAddress;
  }

  /**
   * Obtains the GPS coordinates of a standard address.
   *
   * @public
   * @param   {Object} addressData
   * @returns {Promise.<Coordinates|Boolean>}
   */
  async getCoordinates (addressData) {
    const addressEntity    = GeocodingInteractor.validateAddress(addressData);
    const coordinatesAttrs = await this.geoCodeFromAddress(addressEntity.singleLineAddress);

    if (false !== addressEntity && false !== coordinatesAttrs) {
      const coordinatesEntity = new Coordinates(coordinatesAttrs);

      const { valid: isValidCoordinates, errors: validationErrors } = coordinatesEntity.validate();
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
   * @static
   * @public
   * @param   {Object} addressData
   * @returns {Address|Boolean}
   */
  static validateAddress (addressData) {
    const addressEntity = new Address(addressData);

    const { valid: isValidAddress, errors: validationErrors } = addressEntity.validate();
    if (isValidAddress) {
      return addressEntity;
    }

    // TODO: Add some logging
    return isValidAddress;
  }
}

module.exports = {
  GeocodingInterface,
  GeocodingInteractor,
};
