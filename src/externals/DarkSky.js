/**
 * @module ./src/externals/DarkSky
 */

const
  axios      = require("axios"),
  Implements = require("contracts-es6"),

  {
    WeatherApiInterface,
  }          = require("src/gateways/Weather");

class WeatherApi extends Implements(WeatherApiInterface) {
  constructor ({ config }) {
    super();
    this.config = config;
  }

  /**
   * Retrieves weather information for given coordinates at a given timestamp
   *
   * @param latitude
   * @param longitude
   * @param unixTimeUtc
   * @returns {Promise.<String|{unixTimeUtc: Number, daytimeHighTemp: Number, overnightLowTemp: Number}>}
   */
  async getWeather ({ latitude, longitude, unixTimeUtc }) {
    const
      _composeWeatherApiParams = Symbol.for("_composeWeatherApiParams"),
      _toWeather               = Symbol.for("_toWeather"),

      apiReqParams             = WeatherApi[_composeWeatherApiParams]({
        latitude,
        longitude,
        unixTimeUtc,
      });

    return axios({
      baseURL: this.config.apiUrls.weather,
      url:     `${this.config.tokenKeys.darkSky}/${apiReqParams}`,
      method:  "get",
      params:  apiReqParams,
    }).then(
      WeatherApi[_toWeather],
    ).catch(
      error => {
        return error;
      },
    );
  }

  /**
   * Composes the required parameters.
   *
   * @param latitude
   * @param longitude
   * @param unixTimeUtc
   * @returns {String}
   */
  static [Symbol.for("_composeWeatherApiParams")] ({ latitude, longitude, unixTimeUtc }) {
    return `${latitude},${longitude},${unixTimeUtc}`;
  }

  /**
   * Composes a response.
   *
   * @param data
   * @returns {{unixTimeUtc: Number, daytimeHighTemp: Number, overnightLowTemp: Number}}
   */
  static [Symbol.for("_toWeather")] ({ data }) {
    return {
      unixTimeUtc:      data.daily.data[0].time,
      daytimeHighTemp:  data.daily.data[0].temperatureHigh,
      overnightLowTemp: data.daily.data[0].temperatureLow,
    };
  }
}

module.exports = {
  WeatherApi,
};
