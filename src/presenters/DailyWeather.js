const
  Implements = require("contracts-es6"),

  {
    WeatherHistoryPresenterInterface,
  }          = require("src/usecases/AddressWeatherHistory");

class DailyWeatherPresenter extends Implements(WeatherHistoryPresenterInterface) {
  constructor () {
    super();
  }

  toOutputPort ({ observationPoints, isErrorFree }) {
    return {
      data:    observationPoints,
      success: isErrorFree,
    };
  }
}

module.exports = DailyWeatherPresenter;
