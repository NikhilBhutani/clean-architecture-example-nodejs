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
      })(
        class Address {
        },
      );

module.exports = Address;
