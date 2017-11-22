/**
 * @module ./src/entities/Coordinates
 */

const
  { attributes } = require("structure"),

  Coordinates    = attributes({
    longitude: {
      type:     Number,
      max:      180,
      min:      -180,
      required: true,
    },
  })(
    class Coordinates {
    },
  );

module.exports = Coordinates;
