const Code = require("code"),
      Lab  = require("lab"),

      lab  = exports.lab = Lab.script(),

      { expect }                             = Code,
      { suite, test, beforeEach, afterEach } = lab,

      fakeAddress                            = require("src/entities/Address");

suite(`Entity :: Address`, () => {
  suite(`class`, () => {
    test(`should be defined when instantiated with an empty Object`, async () => {
      // Conditions
      const fakeAddressEntity = new fakeAddress({});

      // Assertions
      expect(fakeAddressEntity).
        and.not.to.be.undefined().
        and.to.be.instanceof(fakeAddress);
    });
  });

  suite(`field`, () => {
    let fakeValidAddressAttrs;

    beforeEach(async () => {
      fakeValidAddressAttrs = {
        streetNumber: 42,
        streetName:   "Any Fake Street Name",
        city:         "Any Fake City Name",
        state:        "Any Fake State",
        zipCode:      42424,
      };
    });

    afterEach(async () => {
      fakeValidAddressAttrs = {};
    });

    suite(`streetNumber`, () => {
      const fieldNameToTest = "streetNumber";

      test(`should be "valid" when a positive number value greater than zero is provided`, async () => {
        // Conditions
        const fakeAddressEntity = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(42);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
        expect(fakeErrors).
          and.to.be.undefined();
      });

      test(`should be "invalid" when a decimal number value is provided`, async () => {
        // Conditions
        fakeValidAddressAttrs[fieldNameToTest] = 42.42;
        const fakeAddressEntity                = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(42.42);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });

      test(`should be "invalid" when a negative number value is provided`, async () => {
        // Conditions
        fakeValidAddressAttrs[fieldNameToTest] = -42;
        const fakeAddressEntity                = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(-42);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });

      test(`should be "invalid" when a zero number value is provided`, async () => {
        // Conditions
        fakeValidAddressAttrs[fieldNameToTest] = 0;
        const fakeAddressEntity                = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });

      test(`should be "invalid" when empty string value is provided`, async () => {
        // Conditions
        fakeValidAddressAttrs[fieldNameToTest] = "";
        const fakeAddressEntity                = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });

      test(`should be "invalid" when undefined`, async () => {
        // Conditions
        delete fakeValidAddressAttrs[fieldNameToTest];
        const fakeAddressEntity = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.to.be.undefined();
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });

      test(`should be "invalid" when null`, async () => {
        // Conditions
        fakeValidAddressAttrs[fieldNameToTest] = null;
        const fakeAddressEntity                = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.to.be.number().
          and.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });
    });

    suite(`streetName`, () => {
      const fieldNameToTest = "streetName";

      test(`should be "valid" when a non-empty string value is provided`, async () => {
        // Conditions
        fakeValidAddressAttrs[fieldNameToTest] = "Any Fake Street Name";
        const fakeAddressEntity                = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.string().
          and.to.equal("Any Fake Street Name");
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
        expect(fakeErrors).
          and.to.be.undefined();
      });

      test(`should be "invalid" when an empty string value is provided`, async () => {
        // Conditions
        fakeValidAddressAttrs[fieldNameToTest] = "";
        const fakeAddressEntity                = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.string().
          and.to.be.empty();
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });

      test(`should be "invalid" when undefined provided`, async () => {
        // Conditions
        delete fakeValidAddressAttrs[fieldNameToTest];
        const fakeAddressEntity = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.to.be.undefined();
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });

      test(`should be "invalid" when null provided`, async () => {
        // Conditions
        fakeValidAddressAttrs[fieldNameToTest] = null;
        const fakeAddressEntity                = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.empty();
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });
    });

    suite(`city`, () => {
      const fieldNameToTest = "city";

      test(`should be "valid" when a non-empty string value is provided`, async () => {
        // Conditions
        fakeValidAddressAttrs[fieldNameToTest] = "Any Fake City Name";
        const fakeAddressEntity                = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.string().
          and.to.equal("Any Fake City Name");
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
        expect(fakeErrors).
          and.to.be.undefined();
      });

      test(`should be "invalid" when an empty string value is provided`, async () => {
        // Conditions
        fakeValidAddressAttrs[fieldNameToTest] = "";
        const fakeAddressEntity                = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.string().
          and.to.be.empty();
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });

      test(`should be "invalid" when undefined provided`, async () => {
        // Conditions
        delete fakeValidAddressAttrs[fieldNameToTest];
        const fakeAddressEntity = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.to.be.undefined();
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });

      test(`should be "invalid" when null provided`, async () => {
        // Conditions
        fakeValidAddressAttrs[fieldNameToTest] = null;
        const fakeAddressEntity                = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.empty();
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });
    });

    suite(`state`, () => {
      const fieldNameToTest = "state";

      test(`should be "valid" when a non-empty string value is provided`, async () => {
        // Conditions
        fakeValidAddressAttrs[fieldNameToTest] = "Any Fake State Name";
        const fakeAddressEntity                = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.string().
          and.to.equal("Any Fake State Name");
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
        expect(fakeErrors).
          and.to.be.undefined();
      });

      test(`should be "invalid" when an empty string value is provided`, async () => {
        // Conditions
        fakeValidAddressAttrs[fieldNameToTest] = "";
        const fakeAddressEntity                = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.string().
          and.to.be.empty();
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });

      test(`should be "invalid" when undefined provided`, async () => {
        // Conditions
        delete fakeValidAddressAttrs[fieldNameToTest];
        const fakeAddressEntity = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.to.be.undefined();
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });

      test(`should be "invalid" when null provided`, async () => {
        // Conditions
        fakeValidAddressAttrs[fieldNameToTest] = null;
        const fakeAddressEntity                = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.empty();
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });
    });

    suite(`zipCode`, () => {
      const fieldNameToTest = "zipCode";

      test(`should be "valid" when a positive number value greater than zero is provided`, async () => {
        // Conditions
        const fakeAddressEntity = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(42424);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
        expect(fakeErrors).
          and.to.be.undefined();
      });

      test(`should be "invalid" when a decimal number value is provided`, async () => {
        // Conditions
        fakeValidAddressAttrs[fieldNameToTest] = 42.42;
        const fakeAddressEntity                = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(42.42);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });

      test(`should be "invalid" when a negative number value is provided`, async () => {
        // Conditions
        fakeValidAddressAttrs[fieldNameToTest] = -42;
        const fakeAddressEntity                = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(-42);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });

      test(`should be "valid" when a zero number value is provided`, async () => {
        // Conditions
        fakeValidAddressAttrs[fieldNameToTest] = 0;
        const fakeAddressEntity                = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
        expect(fakeErrors).
          and.to.be.undefined();
      });

      test(`should be "valid" with a value of zero when empty string value is provided`, async () => {
        // Conditions
        fakeValidAddressAttrs[fieldNameToTest] = "";
        const fakeAddressEntity                = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
        expect(fakeErrors).
          and.to.be.undefined();
      });

      test(`should be "invalid" when undefined`, async () => {
        // Conditions
        delete fakeValidAddressAttrs[fieldNameToTest];
        const fakeAddressEntity = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.to.be.undefined();
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });

      test(`should be "valid" with a value of zero when null provided`, async () => {
        // Conditions
        fakeValidAddressAttrs[fieldNameToTest] = null;
        const fakeAddressEntity                = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
        expect(fakeErrors).
          and.to.be.undefined();
      });
    });
  });
});
