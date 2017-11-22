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
      };
    });

    afterEach(async () => {
      fakeValidAddressAttrs = {};
    });

    suite(`streetNumber`, () => {
      test(`should be "valid" when a positive number value greater than zero is provided`, async () => {
        // Conditions
        const fakeAddressEntity = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity.streetNumber).
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
        fakeValidAddressAttrs.streetNumber = 42.42;
        const fakeAddressEntity            = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity.streetNumber).
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
        fakeValidAddressAttrs.streetNumber = -42;
        const fakeAddressEntity            = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity.streetNumber).
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
        fakeValidAddressAttrs.streetNumber = 0;
        const fakeAddressEntity            = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity.streetNumber).
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
        fakeValidAddressAttrs.streetNumber = "";
        const fakeAddressEntity            = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity.streetNumber).
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
        delete fakeValidAddressAttrs.streetNumber;
        const fakeAddressEntity = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity.streetNumber).
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
        fakeValidAddressAttrs.streetNumber = null;
        const fakeAddressEntity            = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity.streetNumber).
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
      test(`should be "valid" when a non-empty string value is provided`, async () => {
        // Conditions
        fakeValidAddressAttrs.streetName = "Any Fake Street Name";
        const fakeAddressEntity          = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity.streetName).
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
        fakeValidAddressAttrs.streetName = "";
        const fakeAddressEntity          = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity.streetName).
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
        delete fakeValidAddressAttrs.streetName;
        const fakeAddressEntity = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity.streetName).
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
        fakeValidAddressAttrs.streetName = null;
        const fakeAddressEntity          = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity.streetName).
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
      test(`should be "valid" when a non-empty string value is provided`, async () => {
        // Conditions
        const fakeAddressEntity = new fakeAddress({
          streetNumber: 42,
          streetName:   "Any Fake Street Name",
          city:         "Any Fake City Name",
          state:        "Any Fake State Name",
        });

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity.city).
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
        const fakeAddressEntity = new fakeAddress({
          streetNumber: 42,
          streetName:   "Any Fake Street Name",
          city:         "",
        });

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity.city).
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
        const fakeAddressEntity = new fakeAddress({
          streetNumber: 42,
          streetName:   "Any Fake Street Name",
        });

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity.city).
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
        const fakeAddressEntity = new fakeAddress({
          streetNumber: 42,
          streetName:   "Any Fake Street Name",
          city:         null,
        });

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity.city).
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
      test(`should be "valid" when a non-empty string value is provided`, async () => {
        // Conditions
        fakeValidAddressAttrs.state = "Any Fake State Name";
        const fakeAddressEntity     = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity.state).
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
        fakeValidAddressAttrs.state = "";
        const fakeAddressEntity     = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity.state).
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
        delete fakeValidAddressAttrs.state;
        const fakeAddressEntity = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity.state).
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
        fakeValidAddressAttrs.state = null;
        const fakeAddressEntity     = new fakeAddress(fakeValidAddressAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeAddressEntity.validate();

        // Assertions
        expect(fakeAddressEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeAddress);
        expect(fakeAddressEntity.state).
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
  });
});
