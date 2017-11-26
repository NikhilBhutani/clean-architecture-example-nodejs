const
  Implements = require("contracts-es6"),
  moment     = require("moment-timezone"),
  _          = require("lodash"),

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
    this.getInfo = weatherApi.getWeather;
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
      } = await this.getInfo({ latitudeParam, longitudeParam, unixTimeUtcParam });

    return {
      dateTime:         moment(unixTimeUtcRet).toDate(),
      daytimeHighTemp:  daytimeHighTempRet,
      overnightLowTemp: overnightLowTempRet,
    };
  }
}

module.exports = {
  WeatherGateway,
  WeatherApiInterface,
};
