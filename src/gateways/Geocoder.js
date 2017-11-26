const
  Implements = require("contracts-es6"),

  {
    AddressGeocoderInterface,
  }          = require("src/usecases/AddressWeatherHistory");

/**
 * @interface
 */
class GeocoderApiInterface {
  async getCoordinates (address) {
  }
}

class GeocoderGateway extends Implements(AddressGeocoderInterface) {
  constructor ({ geocoderApi }) {
    super();
    this.geocoderApi = geocoderApi;
  }

  /**
   * Converts the parameters to be convenient for the gateway and converts them back on the return.
   *
   * @param singleLineAddress
   * @returns {Promise.<*>}
   */
  async fromAddress (singleLineAddress) {
    const
      {
        latitude,
        longitude,
      } = await this.geocoderApi.getCoordinates(singleLineAddress);

    return {
      latitude,
      longitude,
    };
  }
}

module.exports = {
  GeocoderGateway,
  GeocoderApiInterface,
};
