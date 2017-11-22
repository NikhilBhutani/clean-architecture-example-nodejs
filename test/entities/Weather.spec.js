const Code = require("code"),
      Lab  = require("lab"),

      lab  = exports.lab = Lab.script(),

      { expect }                             = Code,
      { suite, test, beforeEach, afterEach } = lab,

      fakeWeather                            = require("src/entities/Weather");

suite(`Entity :: Weather`, () => {
  let fakeValidWeatherAttrs;

  beforeEach(async () => {
    fakeValidWeatherAttrs = {
      dateTime: 42,
    };
  });

  afterEach(async () => {
    fakeValidWeatherAttrs = {};
  });

  suite(`class`, () => {
    test(`should be defined when instantiated with an empty Object`, async () => {
      // Conditions
      const fakeWeatherEntity = new fakeWeather({});

      // Assertions
      expect(fakeWeatherEntity).
        and.not.to.be.undefined().
        and.to.be.instanceof(fakeWeather);
    });
  });

  suite(`field`, () => {
    suite(`dateTime`, () => {
      const fieldNameToTest = "dateTime";

      test(`should be "valid" when the type of value is a positive "integer"`, async () => {
        // Conditions
        fakeValidWeatherAttrs[fieldNameToTest] = 42;
        const fakeWeatherEntity                = new fakeWeather(fakeValidWeatherAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeWeatherEntity.validate();

        // Assertions
        expect(fakeWeatherEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeWeather);
        expect(fakeWeatherEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.date().
          and.to.equal(new Date(42));
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
        expect(fakeErrors).
          and.to.be.undefined();
      });

      test(`should be "valid" when the type of value is a positive "decimal"`, async () => {
        // Conditions
        fakeValidWeatherAttrs[fieldNameToTest] = 42.42;
        const fakeWeatherEntity                = new fakeWeather(fakeValidWeatherAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeWeatherEntity.validate();

        // Assertions
        expect(fakeWeatherEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeWeather);
        expect(fakeWeatherEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.date().
          and.to.equal(new Date(42.42));
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
        expect(fakeErrors).
          and.to.be.undefined();
      });

      test(`should be "invalid" when null`, async () => {
        // Conditions
        fakeValidWeatherAttrs[fieldNameToTest] = null;
        const fakeWeatherEntity                = new fakeWeather(fakeValidWeatherAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeWeatherEntity.validate();

        // Assertions
        expect(fakeWeatherEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeWeather);
        expect(fakeWeatherEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.date().
          and.to.equal(new Date(null));
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });

      test(`should be "invalid" when undefined`, async () => {
        // Conditions
        delete fakeValidWeatherAttrs[fieldNameToTest];
        const fakeWeatherEntity = new fakeWeather(fakeValidWeatherAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeWeatherEntity.validate();

        // Assertions
        expect(fakeWeatherEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeWeather);
        expect(fakeWeatherEntity[fieldNameToTest]).
          and.to.be.undefined();
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
