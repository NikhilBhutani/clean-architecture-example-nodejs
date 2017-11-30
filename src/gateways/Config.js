/**
 * @module ./src/gateways/Config
 */

const
  /** @type {Operation} */
  {
    getPrivate,
    setPrivate,
  } = require("src/usecases/Operation");

/**
 * @interface
 */
class EnvironmentInterface {
  variables () {
  }
}

class ConfigGateway {
  constructor ({ environment }) {
    this[Symbol.for("_environment")] = environment;
  }

  /**
   * Composes the configs imported from the environment.
   *
   * @returns {Object}
   */
  get compiled () {
    const
      _environment = Symbol.for("_environment"),
      _envVars     = this[_environment].variables();

    return {
      tokenKeys:     {
        darkSky: _envVars.darkSkyTokenKey,
        google:  _envVars.googleTokenKey,
      },
      apiUrls:       {
        weather:  _envVars.darkSkyWeatherApiUrl,
        geocode:  _envVars.googleGeocodeApiUrl,
        timezone: _envVars.googleTimezoneApiUrl,
      },
      apiListenPort: _envVars.expressWebServerPort,
    };
  }

  /**
   * Retrieve a private value of environment.
   *
   * @private
   * @readonly
   * @returns {Object}
   */
  get [Symbol.for("_environment")] () {
    return getPrivate("environment", this);
  }

  /**
   * Assign a private value of environment.
   *
   * @private
   * @param {Object} value
   */
  set [Symbol.for("_environment")] (value) {
    setPrivate("environment", value, this);
  }
}

module.exports = {
  ConfigGateway,
  EnvironmentInterface,
};
