const
  Implements = require("contracts-es6"),
  _          = require("lodash"),

  {
    TimezoneGatewayInterface,
  }          = require("src/usecases/AddressWeatherHistory");

/**
 * @interface
 */
class TimezoneApiInterface {
  async getTimezone ({ latitude, longitude }) {
  }
}

class TimezoneGateway extends Implements(TimezoneGatewayInterface) {
  constructor ({ timezoneApi }) {
    super();
    this.timezoneApi = timezoneApi;
  }

  /**
   * Converts the parameters to be convenient for the gateway and converts them back on the return.
   *
   * @param latitude
   * @param longitude
   * @returns {Promise.<{timezone: String}>}
   */
  async fromCoordinates ({ latitude, longitude }) {
    const
      {
        timezone,
      } = await this.timezoneApi.getTimezone({ latitude, longitude });

    return {
      timezone,
    };
  }
}

module.exports = {
  TimezoneGateway,
  TimezoneApiInterface,
};
