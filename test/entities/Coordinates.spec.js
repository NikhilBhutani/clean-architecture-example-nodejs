const Code = require("code"),
      Lab  = require("lab"),

      lab  = exports.lab = Lab.script(),

      { expect }                             = Code,
      { suite, test, beforeEach, afterEach } = lab,

      fakeCoordinates                        = require("src/entities/Coordinates");

suite(`Entity :: Coordinates`, () => {
  let fakeValidCoordinatesAttrs;

  beforeEach(async () => {
    fakeValidCoordinatesAttrs = {
      longitude: 42,
      latitude:  42,
    };
  });

  afterEach(async () => {
    fakeValidCoordinatesAttrs = {};
  });

  suite(`class`, () => {
    test(`should be defined when instantiated with an empty Object`, async () => {
      // Conditions
      const fakeCoordinatesEntity = new fakeCoordinates({});

      // Assertions
      expect(fakeCoordinatesEntity).
        and.not.to.be.undefined().
        and.to.be.instanceof(fakeCoordinates);
    });
  });

  suite(`field`, () => {
    suite(`longitude`, () => {
      const fieldNameToTest = "longitude";

      test(`should be "valid" when a positive integer value greater than zero is provided`, async () => {
        // Conditions
        const fakeCoordinatesEntity = new fakeCoordinates(fakeValidCoordinatesAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeCoordinatesEntity.validate();

        // Assertions
        expect(fakeCoordinatesEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeCoordinates);
        expect(fakeCoordinatesEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(42);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "valid" when a negative integer value greater than zero is provided`, async () => {
        // Conditions
        fakeValidCoordinatesAttrs[fieldNameToTest] = -42;
        const fakeCoordinatesEntity                = new fakeCoordinates(fakeValidCoordinatesAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeCoordinatesEntity.validate();

        // Assertions
        expect(fakeCoordinatesEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeCoordinates);
        expect(fakeCoordinatesEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(-42);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "valid" when a positive decimal value greater than zero is provided`, async () => {
        // Conditions
        fakeValidCoordinatesAttrs[fieldNameToTest] = 42.42;
        const fakeCoordinatesEntity                = new fakeCoordinates(fakeValidCoordinatesAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeCoordinatesEntity.validate();

        // Assertions
        expect(fakeCoordinatesEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeCoordinates);
        expect(fakeCoordinatesEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(42.42);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "valid" when a zero value is provided`, async () => {
        // Conditions
        fakeValidCoordinatesAttrs[fieldNameToTest] = 0;
        const fakeCoordinatesEntity                = new fakeCoordinates(fakeValidCoordinatesAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeCoordinatesEntity.validate();

        // Assertions
        expect(fakeCoordinatesEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeCoordinates);
        expect(fakeCoordinatesEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "valid" when a null value is provided`, async () => {
        // Conditions
        fakeValidCoordinatesAttrs[fieldNameToTest] = null;
        const fakeCoordinatesEntity                = new fakeCoordinates(fakeValidCoordinatesAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeCoordinatesEntity.validate();

        // Assertions
        expect(fakeCoordinatesEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeCoordinates);
        expect(fakeCoordinatesEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "invalid" when undefined`, async () => {
        // Conditions
        delete fakeValidCoordinatesAttrs[fieldNameToTest];
        const fakeCoordinatesEntity = new fakeCoordinates(fakeValidCoordinatesAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeCoordinatesEntity.validate();

        // Assertions
        expect(fakeCoordinatesEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeCoordinates);
        expect(fakeCoordinatesEntity[fieldNameToTest]).
          and.to.be.undefined().
          and.not.to.be.a.number().
          and.not.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
      });

      test(`should be "invalid" when a value is too large`, async () => {
        // Conditions
        fakeValidCoordinatesAttrs[fieldNameToTest] = 180.00001;
        const fakeCoordinatesEntity                = new fakeCoordinates(fakeValidCoordinatesAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeCoordinatesEntity.validate();

        // Assertions
        expect(fakeCoordinatesEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeCoordinates);
        expect(fakeCoordinatesEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(180.00001);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
      });

      test(`should be "invalid" when a value is too small`, async () => {
        // Conditions
        fakeValidCoordinatesAttrs[fieldNameToTest] = -180.00001;
        const fakeCoordinatesEntity                = new fakeCoordinates(fakeValidCoordinatesAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeCoordinatesEntity.validate();

        // Assertions
        expect(fakeCoordinatesEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeCoordinates);
        expect(fakeCoordinatesEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(-180.00001);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
      });
    });

    suite(`latitude`, () => {
      const fieldNameToTest = "latitude";

      test(`should be "valid" when a positive integer value greater than zero is provided`, async () => {
        // Conditions
        const fakeCoordinatesEntity = new fakeCoordinates(fakeValidCoordinatesAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeCoordinatesEntity.validate();

        // Assertions
        expect(fakeCoordinatesEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeCoordinates);
        expect(fakeCoordinatesEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(42);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "valid" when a negative integer value greater than zero is provided`, async () => {
        // Conditions
        fakeValidCoordinatesAttrs[fieldNameToTest] = -42;
        const fakeCoordinatesEntity                = new fakeCoordinates(fakeValidCoordinatesAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeCoordinatesEntity.validate();

        // Assertions
        expect(fakeCoordinatesEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeCoordinates);
        expect(fakeCoordinatesEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(-42);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "valid" when a positive decimal value greater than zero is provided`, async () => {
        // Conditions
        fakeValidCoordinatesAttrs[fieldNameToTest] = 42.42;
        const fakeCoordinatesEntity                = new fakeCoordinates(fakeValidCoordinatesAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeCoordinatesEntity.validate();

        // Assertions
        expect(fakeCoordinatesEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeCoordinates);
        expect(fakeCoordinatesEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(42.42);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "valid" when a zero value is provided`, async () => {
        // Conditions
        fakeValidCoordinatesAttrs[fieldNameToTest] = 0;
        const fakeCoordinatesEntity                = new fakeCoordinates(fakeValidCoordinatesAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeCoordinatesEntity.validate();

        // Assertions
        expect(fakeCoordinatesEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeCoordinates);
        expect(fakeCoordinatesEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "valid" when a null value is provided`, async () => {
        // Conditions
        fakeValidCoordinatesAttrs[fieldNameToTest] = null;
        const fakeCoordinatesEntity                = new fakeCoordinates(fakeValidCoordinatesAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeCoordinatesEntity.validate();

        // Assertions
        expect(fakeCoordinatesEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeCoordinates);
        expect(fakeCoordinatesEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "invalid" when undefined`, async () => {
        // Conditions
        delete fakeValidCoordinatesAttrs[fieldNameToTest];
        const fakeCoordinatesEntity = new fakeCoordinates(fakeValidCoordinatesAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeCoordinatesEntity.validate();

        // Assertions
        expect(fakeCoordinatesEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeCoordinates);
        expect(fakeCoordinatesEntity[fieldNameToTest]).
          and.to.be.undefined().
          and.not.to.be.a.number().
          and.not.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
      });

      test(`should be "invalid" when a value is too large`, async () => {
        // Conditions
        fakeValidCoordinatesAttrs[fieldNameToTest] = 90.00001;
        const fakeCoordinatesEntity                = new fakeCoordinates(fakeValidCoordinatesAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeCoordinatesEntity.validate();

        // Assertions
        expect(fakeCoordinatesEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeCoordinates);
        expect(fakeCoordinatesEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(90.00001);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
      });

      test(`should be "invalid" when a value is too small`, async () => {
        // Conditions
        fakeValidCoordinatesAttrs[fieldNameToTest] = -90.00001;
        const fakeCoordinatesEntity                = new fakeCoordinates(fakeValidCoordinatesAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeCoordinatesEntity.validate();

        // Assertions
        expect(fakeCoordinatesEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeCoordinates);
        expect(fakeCoordinatesEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(-90.00001);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
      });
    });
  });
});
