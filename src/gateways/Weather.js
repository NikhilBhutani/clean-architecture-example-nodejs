const
  Implements = require("contracts-es6"),
  _          = require("lodash"),
  moment     = require("moment-timezone"),

  {
    WeatherGatewayInterface,
  }          = require("src/usecases/AddressWeatherHistory");

/**
 * @interface
 */
class WeatherApiInterface {
  async getWeather ({ latitude, longitude, unixTimeUtc }) {
  }
}

class WeatherGateway extends Implements(WeatherGatewayInterface) {
  constructor ({ weatherApi }) {
    super();
    this.weatherApi = weatherApi;
  }

  /**
   * Converts the parameters to be convenient for the gateway and converts them back on the return.
   *
   * @param latitudeParam
   * @param longitudeParam
   * @param dateTimeParam
   * @returns {Promise.<{dateTime: Date, daytimeHighTemp: Number, overnightLowTemp: Number}>}
   */
  async getHistoricInfo ({ latitude: latitudeParam, longitude: longitudeParam, dateTime: dateTimeParam }) {
    const unixTimeUtcParam = moment(dateTimeParam).unix();

    const
      {
        unixTimeUtc:      unixTimeUtcRet,
        daytimeHighTemp:  daytimeHighTempRet,
        overnightLowTemp: overnightLowTempRet,
      } = await this.weatherApi.getWeather({ latitude: latitudeParam, longitude: longitudeParam, unixTimeUtc: unixTimeUtcParam });

    return {
      dateTime:         moment(unixTimeUtcRet * 1000).toDate(),
      daytimeHighTemp:  daytimeHighTempRet,
      overnightLowTemp: overnightLowTempRet,
    };
  }
}

module.exports = {
  WeatherGateway,
  WeatherApiInterface,
};
