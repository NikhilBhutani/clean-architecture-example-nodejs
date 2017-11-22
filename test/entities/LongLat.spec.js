const Code = require("code"),
      Lab  = require("lab"),

      lab  = exports.lab = Lab.script(),

      { expect }                             = Code,
      { suite, test, beforeEach, afterEach } = lab,

      fakeLongLat                            = require("src/entities/LongLat");

suite(`Entity :: LongLat`, () => {
  let fakeValidLongLatAttrs;

  beforeEach(async () => {
    fakeValidLongLatAttrs = {
      longitude: 42,
    };
  });

  afterEach(async () => {
    fakeValidLongLatAttrs = {};
  });

  suite(`class`, () => {
    test(`should be defined when instantiated with an empty Object`, async () => {
      // Conditions
      const fakeLongLatEntity = new fakeLongLat({});

      // Assertions
      expect(fakeLongLatEntity).
        and.not.to.be.undefined().
        and.to.be.instanceof(fakeLongLat);
    });
  });

  suite(`field`, () => {
    suite(`longitude`, () => {
      const fieldNameToTest = "longitude";

      test(`should be "valid" when a positive integer value greater than zero is provided`, async () => {
        // Conditions
        const fakeLongLatEntity = new fakeLongLat(fakeValidLongLatAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeLongLatEntity.validate();

        // Assertions
        expect(fakeLongLatEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeLongLat);
        expect(fakeLongLatEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(42);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "valid" when a negative integer value greater than zero is provided`, async () => {
        // Conditions
        fakeValidLongLatAttrs[fieldNameToTest] = -42;
        const fakeLongLatEntity                = new fakeLongLat(fakeValidLongLatAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeLongLatEntity.validate();

        // Assertions
        expect(fakeLongLatEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeLongLat);
        expect(fakeLongLatEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(-42);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "valid" when a positive decimal value greater than zero is provided`, async () => {
        // Conditions
        fakeValidLongLatAttrs[fieldNameToTest] = 42.42;
        const fakeLongLatEntity                = new fakeLongLat(fakeValidLongLatAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeLongLatEntity.validate();

        // Assertions
        expect(fakeLongLatEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeLongLat);
        expect(fakeLongLatEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(42.42);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "valid" when a zero value is provided`, async () => {
        // Conditions
        fakeValidLongLatAttrs[fieldNameToTest] = 0;
        const fakeLongLatEntity                = new fakeLongLat(fakeValidLongLatAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeLongLatEntity.validate();

        // Assertions
        expect(fakeLongLatEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeLongLat);
        expect(fakeLongLatEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "valid" when a null value is provided`, async () => {
        // Conditions
        fakeValidLongLatAttrs[fieldNameToTest] = null;
        const fakeLongLatEntity                = new fakeLongLat(fakeValidLongLatAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeLongLatEntity.validate();

        // Assertions
        expect(fakeLongLatEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeLongLat);
        expect(fakeLongLatEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "invalid" when undefined`, async () => {
        // Conditions
        delete fakeValidLongLatAttrs[fieldNameToTest];
        const fakeLongLatEntity = new fakeLongLat(fakeValidLongLatAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeLongLatEntity.validate();

        // Assertions
        expect(fakeLongLatEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeLongLat);
        expect(fakeLongLatEntity[fieldNameToTest]).
          and.to.be.undefined().
          and.not.to.be.a.number().
          and.not.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
      });

      test(`should be "invalid" when a value is too large`, async () => {
        // Conditions
        fakeValidLongLatAttrs[fieldNameToTest] = 180.00001;
        const fakeLongLatEntity = new fakeLongLat(fakeValidLongLatAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeLongLatEntity.validate();

        // Assertions
        expect(fakeLongLatEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeLongLat);
        expect(fakeLongLatEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(180.00001);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
      });

      test(`should be "invalid" when a value is too small`, async () => {
        // Conditions
        fakeValidLongLatAttrs[fieldNameToTest] = -180.00001;
        const fakeLongLatEntity = new fakeLongLat(fakeValidLongLatAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeLongLatEntity.validate();

        // Assertions
        expect(fakeLongLatEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeLongLat);
        expect(fakeLongLatEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(-180.00001);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
      });
    });
  });
});
