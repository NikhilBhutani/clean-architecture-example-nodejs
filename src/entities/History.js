/**
 * @module ./src/entities/History
 */

const
  Weather        = require("./Weather"),

  { attributes } = require("structure"),

  History        = attributes({
    address:           {
      type:     String,
      required: true,
    },
    longitude:         {
      type:     Number,
      max:      180,
      min:      -180,
      required: true,
    },
    latitude:          {
      type:     Number,
      max:      90,
      min:      -90,
      required: true,
    },
    originalMoment:    {
      type:     Number,
      integer:  true,
      greater:  0,
      required: true,
    },
    timezone:          {
      type:     String,
      required: true,
    },
    observationPoints: {
      type:     Array,
      itemType: "Weather",
      sparse:   false,
      default:  [],
      required: true,
    },
  }, {
    dynamics: {
      Weather: () => Weather,
    },
  })(
    /**
     * @member {String} address
     * @member {Number} longitude
     * @member {Number} latitude
     * @member {Number} originalMoment
     * @member {String} timezone
     * @member {Array.<Weather>} observationPoints
     */
    class History {
    },
  );

module.exports = History;
