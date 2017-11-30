/**
 * @module ./src/externals/Environment
 */

const
  envVarCompose = require("12factor-config"),
  Implements    = require("contracts-es6"),

  {
    EnvironmentInterface,
  }             = require("src/gateways/Config");

class Environment extends Implements(EnvironmentInterface) {
  constructor () {
    super();
  }

  /**
   * Validates and composes environment variables as an Object.
   *
   * @returns {
   *    {
   *      darkSkyTokenKey:      String,
   *      darkSkyWeatherApiUrl: String,
   *      googleTokenKey:       String,
   *      googleGeocodeApiUrl:  String,
   *      googleTimezoneApiUrl: String,
   *      expressWebServerPort: Number,
   *    }
   *  }
   */
  variables () {
    return envVarCompose({
      darkSkyTokenKey:      {
        env:      "APP_WEATHER_DARK_SKY_TOKEN_KEY",
        type:     "string",
        required: true,
      },
      darkSkyWeatherApiUrl: {
        env:      "APP_WEATHER_DARK_SKY_WEATHER_API_URL",
        type:     "string",
        required: true,
      },
      googleTokenKey:       {
        env:      "APP_WEATHER_GOOGLE_TOKEN_KEY",
        type:     "string",
        required: true,
      },
      googleGeocodeApiUrl:  {
        env:      "APP_WEATHER_GOOGLE_GEOCODE_API_URL",
        type:     "string",
        required: true,
      },
      googleTimezoneApiUrl: {
        env:      "APP_WEATHER_GOOGLE_TIMEZONE_API_URL",
        type:     "string",
        required: true,
      },
      expressWebServerPort: {
        env:      "APP_WEATHER_EXPRESS_WEB_SERVER_PORT",
        type:     "integer",
        required: true,
      },
    });
  }
}

module.exports = Environment;
