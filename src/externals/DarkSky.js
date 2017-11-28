/**
 * @module ./src/externals/DarkSky
 */

const
  Implements = require("contracts-es6"),
  axios      = require("axios"),

  {
    WeatherApiInterface,
  }          = require("src/gateways/Weather");

class WeatherApi extends Implements(WeatherApiInterface) {
  constructor ({ config }) {
    super();
    this.tokenKey = config.tokenKeys.darkSky;
    this.url      = config.apiUrls.weather;
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
        tokenKey: this.tokenKey,
        latitude,
        longitude,
        unixTimeUtc,
      });

    return axios.get(
      `${this.url}/${apiReqParams}`,
    ).then(
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
   * @param tokenKey
   * @param latitude
   * @param longitude
   * @param unixTimeUtc
   * @returns {String}
   */
  static [Symbol.for("_composeWeatherApiParams")] ({ tokenKey, latitude, longitude, unixTimeUtc }) {
    return `${tokenKey}/${latitude},${longitude},${unixTimeUtc}`;
  }

  /**
   * Composes a response.
   *
   * @param response
   * @returns {{unixTimeUtc: Number, daytimeHighTemp: Number, overnightLowTemp: Number}}
   */
  static [Symbol.for("_toWeather")] ({ response }) {
    return {
      unixTimeUtc:      response.data.daily.data[0].time,
      daytimeHighTemp:  response.data.daily.data[0].temperatureHigh,
      overnightLowTemp: response.data.daily.data[0].temperatureLow,
    };
  }
}

module.exports = {
  WeatherApi,
};
