/**
 * @module ./src/entities/Weather
 *
 */

const
  { attributes } = require("structure"),

  Weather        = attributes({
    dateTime:         {
      type:     Date,
      min:      1,
      required: true,
    },
    daytimeHighTemp:  {
      type:      Number,
      precision: 2,
      greater:   { attr: "overnightLowTemp" },
      required:  true,
    },
    overnightLowTemp: {
      type:      Number,
      precision: 2,
      less:      { attr: "daytimeHighTemp" },
      required:  true,
    },
  })(
    class Weather {
    },
  );

module.exports = Weather;
