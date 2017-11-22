const { attributes } = require("structure"),

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
        class Address {
        },
      );

module.exports = Address;
