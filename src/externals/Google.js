/**
 * @module ./src/externals/Google
 */

const
  axios      = require("axios"),
  Implements = require("contracts-es6"),
  moment     = require("moment"),

  {
    GeocoderApiInterface,
  }          = require("src/gateways/Geocoder"),
  {
    TimezoneApiInterface,
  }          = require("src/gateways/Timezone");

class GeocoderApi extends Implements(GeocoderApiInterface) {
  constructor ({ config }) {
    super();
    this.config = config;
  }

  /**
   * Retrieves coordinates for a given address.
   *
   * @param {String} address
   * @returns {Promise.<String|{latitude: Number, longitude: Number}>}
   */
  async getCoordinates (address) {
    const
      _composeGeocodeApiParams = Symbol.for("_composeGeocodeApiParams"),
      _toCoordinates           = Symbol.for("_toCoordinates"),

      apiReqParams             = GeocoderApi[_composeGeocodeApiParams]({
        tokenKey: this.config.tokenKeys.google,
        address,
      });

    return axios({
      url:    this.config.apiUrls.geocode,
      method: "get",
      params: apiReqParams,
    }).then(
      GeocoderApi[_toCoordinates],
    ).catch(
      error => {
        console.log(error);
        return error;
      },
    );
  }

  /**
   * Composes the required parameters.
   *
   * @param tokenKey
   * @param address
   * @returns {{key: String, address: String}}
   */
  static [Symbol.for("_composeGeocodeApiParams")] ({ tokenKey, address }) {
    return {
      key:     tokenKey,
      address: `${address}`,
    };
  }

  /**
   * Composes a response.
   *
   * @param {Object} data
   * @returns {{latitude: Number, longitude: Number}}
   */
  static [Symbol.for("_toCoordinates")] ({ data }) {
    return {
      latitude:  data.results[0].geometry.location.lat,
      longitude: data.results[0].geometry.location.lng,
    };
  }
}

class TimezoneApi extends Implements(TimezoneApiInterface) {
  constructor ({ config }) {
    super();
    this.config = config;
  }

  /**
   * Retrieves the timezone for given coordinates.
   *
   * @param latitude
   * @param longitude
   * @returns {Promise.<String|{timezone: String}>}
   */
  async getTimezone ({ latitude, longitude }) {
    const
      _composeTimezoneApiParams = Symbol.for("_composeTimezoneApiParams"),
      _toTimezone               = Symbol.for("_toTimezone"),

      apiReqParams              = TimezoneApi[_composeTimezoneApiParams]({
        tokenKey: this.config.tokenKeys.google,
        latitude,
        longitude,
      });

    return axios({
      url:    this.config.apiUrls.timezone,
      method: "get",
      params: apiReqParams,
    }).then(
      TimezoneApi[_toTimezone],
    ).catch(
      error => {
        console.log(error);
        return error;
      },
    );
  }

  /**
   * Composes the required parameters.
   *
   * @static
   * @private
   * @param tokenKey
   * @param latitude
   * @param longitude
   * @returns {{key: String, location: String}}
   */
  static [Symbol.for("_composeTimezoneApiParams")] ({ tokenKey, latitude, longitude }) {
    return {
      key:       tokenKey,
      location:  `${latitude},${longitude}`,
      timestamp: moment().unix(),
    };
  }

  /**
   * Composes a response.
   *
   * @param data
   * @returns {{timezone: String}}
   */
  static [Symbol.for("_toTimezone")] ({ data }) {
    return {
      timezone: data.timeZoneId,
    };
  }
}

module.exports = {
  GeocoderApi,
  TimezoneApi,
};
