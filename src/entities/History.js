/**
 * @module ./src/entities/History
 */

const
  _              = require("lodash"),
  moment         = require("moment-timezone"),

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
      /**
       * Generates an array of timestamps representing the last "x" days.
       *
       * @public
       * @param {Number} daysRelativeToToday
       * @returns {Array.<Date>}
       */
      getDailyStartOfDay (daysRelativeToToday) {
        const retVal            = [];
        const aMoment           = moment.tz(this.originalMoment * 1000, this.timezone);
        const dayStartOfAMoment = aMoment.startOf("day");

        if (_.isNumber(daysRelativeToToday) && daysRelativeToToday <= -1) {
          for (let dx = 0; dx > daysRelativeToToday; dx--) {
            const dayStartOneDayEarlier = dayStartOfAMoment.subtract({ days: 1 });
            retVal.push(dayStartOneDayEarlier.toDate());
          }
        }
        return retVal;
      }
    },
  );

module.exports = History;
