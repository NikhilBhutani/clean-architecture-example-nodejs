const Address = require("src/entities/Address");

class GeocodingInteractor {
  static validateAddress (addressData) {
    const addressEntity = new Address(addressData);

    const { valid: isValidAddress, errors: validationErrors } = addressEntity.validate();
    if (!isValidAddress) {
      // TODO: Add some logging
      return isValidAddress;
    }

    return addressEntity;
  }
}

module.exports = GeocodingInteractor;
