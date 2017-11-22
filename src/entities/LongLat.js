/**
 * @module ./src/entities/LongLat
 */

const
  { attributes } = require("structure"),

  LongLat        = attributes({
    longitude: {
      type:     Number,
      max:      180,
      min:      -180,
      required: true,
    },
  })(
    class LongLat {
    },
  );

module.exports = LongLat;
