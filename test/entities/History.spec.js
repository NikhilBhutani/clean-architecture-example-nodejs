const Code = require("code"),
      Lab  = require("lab"),

      lab  = exports.lab = Lab.script(),

      { expect }                             = Code,
      { suite, test, beforeEach, afterEach } = lab,

      fakeHistory                            = require("src/entities/History"),
      fakeWeatherEntity                      = require("src/entities/Weather");

suite(`Entity :: History`, () => {
  let fakeValidHistoryAttrs;
  let fakeValidWeatherAttrs;
  let fakeMixedWeatherAttrs = [];

  beforeEach(async () => {
    fakeValidWeatherAttrs = {
      dateTime:         42,
      daytimeHighTemp:  44,
      overnightLowTemp: -44,
    };

    fakeValidHistoryAttrs = {
      address:           "Any Fake Street Address",
      longitude:         42,
      latitude:          42,
      originalMoment:    1511194690, //Monday, November 20, 2017 5:18:10 AM GMT-05:00
      timezone:          "America/New_York",
      observationPoints: [
        fakeValidWeatherAttrs,
      ],
    };

    fakeMixedWeatherAttrs = [
      {
        dateTime:         4242,
        daytimeHighTemp:  44.01,
        overnightLowTemp: -44.01,
      }, {
        dateTime:         4243,
        daytimeHighTemp:  "forced invalid",
        overnightLowTemp: -44.02,
      }, {
        dateTime:         4244,
        daytimeHighTemp:  44.03,
        overnightLowTemp: -44.03,
      },
    ];
  });

  afterEach(async () => {
    fakeValidHistoryAttrs = {};
    fakeValidWeatherAttrs = {};
    fakeMixedWeatherAttrs = [];
  });

  suite(`class`, () => {
    test(`should be defined when instantiated with an empty Object`, async () => {
      // Conditions
      const fakeHistoryEntity = new fakeHistory({});

      // Assertions
      expect(fakeHistoryEntity).
        and.not.to.be.undefined().
        and.to.be.instanceof(fakeHistory);
    });
  });

  suite(`method`, () => {
    suite(`getDailyStartOfDay()`, () => {
      test(`should be defined`, async () => {
        // Conditions
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity.getDailyStartOfDay).
          and.to.be.a.function();
      });

      test(`should return an empty array if zero is used`, async () => {
        // Conditions
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);
        const fakeResponse      = fakeHistoryEntity.getDailyStartOfDay(0);

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeResponse).
          and.to.be.an.array().
          and.to.be.empty();
      });

      test(`should return an empty array if null`, async () => {
        // Conditions
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);
        const fakeResponse      = fakeHistoryEntity.getDailyStartOfDay(null);

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeResponse).
          and.to.be.an.array().
          and.to.be.empty();
      });

      test(`should return an empty array if undefined`, async () => {
        // Conditions
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);
        const fakeResponse      = fakeHistoryEntity.getDailyStartOfDay();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeResponse).
          and.to.be.an.array().
          and.to.be.empty();
      });

      test(`should return a single unix timestamp when -1 is used`, async () => {
        // Conditions
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);
        const fakeResponse      = fakeHistoryEntity.getDailyStartOfDay(-1);

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeResponse).
          and.to.be.an.array().
          and.to.have.length(1);
        expect((fakeResponse[0])).
          and.to.be.a.date().
          and.to.equal(new Date("2017-11-19T05:00:00.000Z"));
      });

      test(`should return a double unix timestamp when -2 is used`, async () => {
        // Conditions
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);
        const fakeResponse      = fakeHistoryEntity.getDailyStartOfDay(-2);

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeResponse).
          and.to.be.an.array().
          and.to.have.length(2);
        expect((fakeResponse[0])).
          and.to.be.a.date().
          and.to.equal(new Date("2017-11-19T05:00:00.000Z"));
        expect((fakeResponse[1])).
          and.to.be.a.date().
          and.to.equal(new Date("2017-11-18T05:00:00.000Z"));
      });

      test(`should return an empty array when a postive integer is used`, async () => {
        // Conditions
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);
        const fakeResponse      = fakeHistoryEntity.getDailyStartOfDay(2);

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeResponse).
          and.to.be.an.array().
          and.to.be.empty();
      });
    });

    suite(`addObservationPoints()`, () => {
      test(`should be defined`, async () => {
        // Conditions
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity.addObservationPoints).
          and.to.be.a.function();
      });

      test(`should not add an undefined weather data point`, async () => {
        // Conditions
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);
        const fakeResponse      = fakeHistoryEntity.addObservationPoints();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeResponse).
          and.to.be.a.number().
          and.to.equal(0);
        expect(fakeHistoryEntity.observationPoints).
          and.to.be.an.array().
          and.to.have.length(1);
        expect(fakeHistoryEntity.observationPoints[0]).
          and.to.be.an.instanceof(fakeWeatherEntity);
      });

      test(`should not add a null weather data point`, async () => {
        // Conditions
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);
        const fakeResponse      = fakeHistoryEntity.addObservationPoints(null);

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeResponse).
          and.to.be.a.number().
          and.to.equal(0);
        expect(fakeHistoryEntity.observationPoints).
          and.to.be.an.array().
          and.to.have.length(1);
        expect(fakeHistoryEntity.observationPoints[0]).
          and.to.be.an.instanceof(fakeWeatherEntity);
      });

      test(`should not add an invalid weather data point`, async () => {
        // Conditions
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);
        const fakeResponse      = fakeHistoryEntity.addObservationPoints([fakeMixedWeatherAttrs[1]]);

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeResponse).
          and.to.be.a.number().
          and.to.equal(0);
        expect(fakeHistoryEntity.observationPoints).
          and.to.be.an.array().
          and.to.have.length(1);
        expect(fakeHistoryEntity.observationPoints[0]).
          and.to.be.an.instanceof(fakeWeatherEntity);
      });

      test(`should add just one when weather data point is valid`, async () => {
        // Conditions
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);
        const fakeResponse      = fakeHistoryEntity.addObservationPoints([fakeMixedWeatherAttrs[2]]);

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeResponse).
          and.to.be.a.number().
          and.to.equal(1);
        expect(fakeHistoryEntity.observationPoints).
          and.to.be.an.array().
          and.to.have.length(2);
        expect(fakeHistoryEntity.observationPoints[1]).
          and.to.be.an.instanceof(fakeWeatherEntity);
      });

      test(`should add just two when weather data points are mixed`, async () => {
        // Conditions
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);
        const fakeResponse      = fakeHistoryEntity.addObservationPoints(fakeMixedWeatherAttrs);

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeResponse).
          and.to.be.a.number().
          and.to.equal(2);
        expect(fakeHistoryEntity.observationPoints).
          and.to.be.an.array().
          and.to.have.length(3);
        expect(fakeHistoryEntity.observationPoints[1]).
          and.to.be.an.instanceof(fakeWeatherEntity);
      });
    });
  });

  suite(`field`, () => {
    suite(`address`, () => {
      const fieldNameToTest = "address";

      test(`should be "valid" when a non-empty string value is provided`, async () => {
        // Conditions
        fakeValidHistoryAttrs[fieldNameToTest] = "Any Fake Street Address";
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.string().
          and.to.equal("Any Fake Street Address");
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
        expect(fakeErrors).
          and.to.be.undefined();
      });

      test(`should be "invalid" when an empty string value is provided`, async () => {
        // Conditions
        fakeValidHistoryAttrs[fieldNameToTest] = "";
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
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
        delete fakeValidHistoryAttrs[fieldNameToTest];
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
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
        fakeValidHistoryAttrs[fieldNameToTest] = null;
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
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

    suite(`longitude`, () => {
      const fieldNameToTest = "longitude";

      test(`should be "valid" when a positive integer value greater than zero is provided`, async () => {
        // Conditions
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(42);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "valid" when a negative integer value greater than zero is provided`, async () => {
        // Conditions
        fakeValidHistoryAttrs[fieldNameToTest] = -42;
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(-42);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "valid" when a positive decimal value greater than zero is provided`, async () => {
        // Conditions
        fakeValidHistoryAttrs[fieldNameToTest] = 42.42;
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(42.42);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "valid" when a zero value is provided`, async () => {
        // Conditions
        fakeValidHistoryAttrs[fieldNameToTest] = 0;
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "valid" when a null value is provided`, async () => {
        // Conditions
        fakeValidHistoryAttrs[fieldNameToTest] = null;
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "invalid" when undefined`, async () => {
        // Conditions
        delete fakeValidHistoryAttrs[fieldNameToTest];
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.to.be.undefined().
          and.not.to.be.a.number().
          and.not.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
      });

      test(`should be "invalid" when a value is too large`, async () => {
        // Conditions
        fakeValidHistoryAttrs[fieldNameToTest] = 180.00001;
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(180.00001);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
      });

      test(`should be "invalid" when a value is too small`, async () => {
        // Conditions
        fakeValidHistoryAttrs[fieldNameToTest] = -180.00001;
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
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
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(42);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "valid" when a negative integer value greater than zero is provided`, async () => {
        // Conditions
        fakeValidHistoryAttrs[fieldNameToTest] = -42;
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(-42);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "valid" when a positive decimal value greater than zero is provided`, async () => {
        // Conditions
        fakeValidHistoryAttrs[fieldNameToTest] = 42.42;
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(42.42);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "valid" when a zero value is provided`, async () => {
        // Conditions
        fakeValidHistoryAttrs[fieldNameToTest] = 0;
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "valid" when a null value is provided`, async () => {
        // Conditions
        fakeValidHistoryAttrs[fieldNameToTest] = null;
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
      });

      test(`should be "invalid" when undefined`, async () => {
        // Conditions
        delete fakeValidHistoryAttrs[fieldNameToTest];
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.to.be.undefined().
          and.not.to.be.a.number().
          and.not.to.equal(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
      });

      test(`should be "invalid" when a value is too large`, async () => {
        // Conditions
        fakeValidHistoryAttrs[fieldNameToTest] = 90.00001;
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(90.00001);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
      });

      test(`should be "invalid" when a value is too small`, async () => {
        // Conditions
        fakeValidHistoryAttrs[fieldNameToTest] = -90.00001;
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(-90.00001);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
      });
    });

    suite(`originalMoment`, () => {
      const fieldNameToTest = "originalMoment";

      test(`should be "valid" when a positive number value greater than zero is provided`, async () => {
        // Conditions
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.number().
          and.to.equal(1511194690);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
        expect(fakeErrors).
          and.to.be.undefined();
      });

      test(`should be "invalid" when a decimal number value is provided`, async () => {
        // Conditions
        fakeValidHistoryAttrs[fieldNameToTest] = 42.42;
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
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
        fakeValidHistoryAttrs[fieldNameToTest] = -42;
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
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
        fakeValidHistoryAttrs[fieldNameToTest] = 0;
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
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
        fakeValidHistoryAttrs[fieldNameToTest] = "";
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
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
        delete fakeValidHistoryAttrs[fieldNameToTest];
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
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
        fakeValidHistoryAttrs[fieldNameToTest] = null;
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
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

    suite(`timezone`, () => {
      const fieldNameToTest = "timezone";

      test(`should be "valid" when a non-empty string value is provided`, async () => {
        // Conditions
        fakeValidHistoryAttrs[fieldNameToTest] = "Any/Fake_Zone";
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.a.string().
          and.to.equal("Any/Fake_Zone");
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
        expect(fakeErrors).
          and.to.be.undefined();
      });

      test(`should be "invalid" when an empty string value is provided`, async () => {
        // Conditions
        fakeValidHistoryAttrs[fieldNameToTest] = "";
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
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
        delete fakeValidHistoryAttrs[fieldNameToTest];
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
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
        fakeValidHistoryAttrs[fieldNameToTest] = null;
        const fakeHistoryEntity                = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
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

    suite(`observationPoints`, () => {
      const fieldNameToTest = "observationPoints";

      test(`should be "valid" when a single element is provided`, async () => {
        // Conditions
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.an.array().
          and.to.have.length(1);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
        expect(fakeErrors).
          and.to.be.undefined();
      });

      test(`should be "invalid" when a null element is provided`, async () => {
        // Conditions
        fakeValidHistoryAttrs.observationPoints = [null];
        const fakeHistoryEntity                 = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.an.array().
          and.to.have.length(1);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });

      test(`should be "invalid" when a undefined element is provided`, async () => {
        // Conditions
        fakeValidHistoryAttrs.observationPoints = [undefined];
        const fakeHistoryEntity                 = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.an.array().
          and.to.have.length(1);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.false();
        expect(fakeErrors).
          and.not.to.be.empty().
          and.to.be.an.array();
      });

      test(`should be "valid" when a "undefined" is provided as a value instead of an array`, async () => {
        // Conditions
        delete fakeValidHistoryAttrs.observationPoints;
        const fakeHistoryEntity = new fakeHistory(fakeValidHistoryAttrs);

        // Interrogate a response
        const { valid: fakeValid, errors: fakeErrors } = fakeHistoryEntity.validate();

        // Assertions
        expect(fakeHistoryEntity).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeHistory);
        expect(fakeHistoryEntity[fieldNameToTest]).
          and.not.to.be.undefined().
          and.to.be.an.array().
          and.to.have.length(0);
        expect(fakeValid).
          and.to.be.a.boolean().
          and.to.be.true();
        expect(fakeErrors).
          and.to.be.undefined();
      });
    });
  });
});
