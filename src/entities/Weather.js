/**
 * @module ./src/entities/Weather
 *
 */

const
  { attributes } = require("structure"),

  Weather        = attributes({
    dateTime:        {
      type:     Date,
      min:      1,
      required: true,
    },
    daytimeHighTemp: {
      type:      Number,
      precision: 2,
      required:  true,
    },
  })(
    class Weather {
    },
  );

module.exports = Weather;
