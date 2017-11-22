/**
 * @module ./src/entities/Address
 */

const
  { attributes } = require("structure"),

  Address        = attributes({
    streetNumber: {
      type:     Number,
      integer:  true,
      greater:  0,
      required: true,
    },
    streetName:   {
      type:     String,
      required: true,
    },
    city:         {
      type:     String,
      required: true,
    },
    state:        {
      type:     String,
      required: true,
    },
    zipCode:      {
      type:     Number,
      integer:  true,
      min:      0,
      max:      99999,
      required: true,
    },
  })(
    /**
     * @member {Number} streetNumber
     * @member {Number} streetName
     * @member {Number} city
     * @member {Number} state
     * @member {Number} zipCode
     */
    class Address {
      /**
       * @public
       * @returns {String} - A single line formatted address.
       */
      get singleLineAddress () {
        return `${this.streetNumber} ${this.streetName}, ${this.city}, ${this.state} ${this.zipCode}`;
      }
    },
  );

module.exports = Address;
