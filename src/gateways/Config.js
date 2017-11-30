/**
 * @module ./src/gateways/Config
 */

const
  /** @type {Operation} */
  {
    Operation: getPrivate,
    Operation: setPrivate,
  } = require("src/usecases/Operation");

/**
 * @interface
 */
class EnvironmentInterface {
  get variables () {
  }
}

class ConfigGateway {
  constructor ({ environment }) {
    this[Symbol.for("_envVars")] = environment.variables;
  }

  /**
   * Composes the configs imported from the environment.
   *
   * @returns {Object}
   */
  get compiled () {
    const
      _envVars = Symbol.for("_envVars");

    return {
      tokenKeys:     {
        darkSky: this[_envVars].darkSkyTokenKey,
        google:  this[_envVars].googleTokenKey,
      },
      apiUrls:       {
        weather:  this[_envVars].darkSkyWeatherApiUrl,
        geocode:  this[_envVars].googleGeocodeApiUrl,
        timezone: this[_envVars].googleTimezoneApiUrl,
      },
      apiListenPort: this[_envVars].expressWebServerPort,
    };
  }

  /**
   * Retrieve a private value of envVars.
   *
   * @private
   * @readonly
   * @returns {Object}
   */
  get [Symbol.for("_envVars")] () {
    return getPrivate("envVars", this);
  }

  /**
   * Assign a private value of envVars.
   *
   * @private
   * @param {Object} value
   */
  set [Symbol.for("_envVars")] (value) {
    setPrivate("envVars", value, this);
  }
}

module.exports = {
  ConfigGateway,
  EnvironmentInterface,
};
