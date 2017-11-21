const Code = require("code"),
      Lab  = require("lab"),

      lab  = exports.lab = Lab.script(),

      { expect }      = Code,
      { suite, test } = lab,

      fakeAddress     = require("src/entities/Address");

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
    suite(`streetNumber`, () => {
      test(`should be "valid" when a positive number value greater than zero is provided`, async () => {
        // Conditions
        const fakeAddressEntity = new fakeAddress({
          streetNumber: 42,
        });

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
        const fakeAddressEntity = new fakeAddress({
          streetNumber: 42.42,
        });

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
        const fakeAddressEntity = new fakeAddress({
          streetNumber: -42,
        });

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
        const fakeAddressEntity = new fakeAddress({
          streetNumber: 0,
        });

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
        const fakeAddressEntity = new fakeAddress({
          streetNumber: "",
        });

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
    });
  });
});
