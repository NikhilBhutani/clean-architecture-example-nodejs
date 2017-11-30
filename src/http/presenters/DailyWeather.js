/**
 * @module ./src/http/presenter/DailyWeather
 */

const
  Implements = require("contracts-es6"),

  {
    WeatherHistoryPresenterInterface,
  }          = require("src/usecases/AddressWeatherHistory");

class DailyWeatherPresenter extends Implements(WeatherHistoryPresenterInterface) {
  constructor () {
    super();
  }

  /**
   * Transforms the data to fit the need of a controller's expectation.
   *
   * @param observationPoints
   * @param isErrorFree
   * @returns {{data: *, success: *}}
   */
  toOutputPort ({ observationPoints, isErrorFree }) {
    return {
      data:    observationPoints,
      success: isErrorFree,
    };
  }
}

module.exports = DailyWeatherPresenter;
