/**
 * @module ./src/externals/Google
 */

const
  Implements = require("contracts-es6"),
  axios      = require("axios"),
  {
    GeocoderApiInterface,
  }          = require("src/gateways/Geocoder"),
  {
    TimezoneApiInterface,
  }          = require("src/gateways/Timezone");

class GeocoderApi extends Implements(GeocoderApiInterface) {
  constructor ({ config }) {
    super();
    this.tokenKey = config.tokenKeys.google;
    this.url      = config.apiUrls.geocode;
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
        tokenKey: this.tokenKey,
        address,
      });

    return axios.get(
      this.url, apiReqParams,
    ).then(
      GeocoderApi[_toCoordinates],
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
   * @param {Object} response
   * @returns {{latitude: Number, longitude: Number}}
   */
  static [Symbol.for("_toCoordinates")] ({ response }) {
    return {
      latitude:  response.data.results[0].geometry.location.lat,
      longitude: response.data.results[0].geometry.location.lng,
    };
  }
}

class TimezoneApi extends Implements(TimezoneApiInterface) {
  constructor ({ config }) {
    super();
    this.tokenKey = config.tokenKeys.google;
    this.url      = config.apiUrls.timezone;
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
        tokenKey: this.tokenKey,
        latitude,
        longitude,
      });

    return axios.get(
      this.url, apiReqParams,
    ).then(
      TimezoneApi[_toTimezone],
    ).catch(
      error => {
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
      key:      tokenKey,
      location: `${latitude},${longitude}`,
    };
  }

  /**
   * Composes a response.
   *
   * @param timeZoneId
   * @returns {{timezone: String}}
   */
  static [Symbol.for("_toTimezone")] ({ timeZoneId }) {
    return {
      timezone: timeZoneId,
    };
  }
}

module.exports = {
  GeocoderApi,
  TimezoneApi,
};
