const
  Address     = require("src/entities/Address"),
  Coordinates = require("src/entities/Coordinates");


class GeocodingInterface {
  fromAddress (singleLineAddress) {
  }
}

class GeocodingInteractor {
  constructor ({ geocoder }) {
    this.geoCodeFromAddress = geocoder.fromAddress;
  }

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
