const Code = require("code"),
      Lab  = require("lab"),

      lab  = exports.lab = Lab.script(),

      { expect }                             = Code,
      { suite, test, beforeEach, afterEach } = lab,

      {
        TimezoneGateway:      FakeDefaultTimezoneGateway,
        TimezoneApiInterface: FakeDefaultTimezoneApiInterface,
      }                                      = require("src/gateways/Timezone"),

      {
        TimezoneGatewayInterface: FakeDefaultTimezoneGatewayInterface,
      }                                      = require("src/usecases/AddressWeatherHistory");

suite(`Gateway :: Timezone`, () => {
  let fakeValidTimezoneParams;
  let fakeValidTimezoneAttrs;
  let fakeTimezoneApi;
  let fakeConstructorParams;

  beforeEach(async () => {
    fakeValidTimezoneParams = {
      latitude:  -44,
      longitude: 44,
    };

    fakeValidTimezoneAttrs = {
      timezone: "America/New_York",
    };

    fakeTimezoneApi = {
      getTimezone: async function fakeGetTimezone ({ latitude, longitude }) {
        return fakeValidTimezoneAttrs;
      },
    };

    fakeConstructorParams = {
      timezoneApi: fakeTimezoneApi,
    };
  });

  afterEach(async () => {
    fakeValidTimezoneParams = {};
    fakeValidTimezoneAttrs  = {};
    fakeTimezoneApi         = {};
    fakeConstructorParams   = {};
  });

  suite(`interface`, () => {
    suite(`timezoneApi`, () => {
      test(`should have a defined interface to be implemented`, async () => {
        // Assertions
        expect(FakeDefaultTimezoneApiInterface).
          and.not.to.be.undefined();
      });

      test(`should have the "getTimezone()" method defined`, async () => {
        // Conditions
        const fakeTimezoneApiInterface = new FakeDefaultTimezoneApiInterface();

        // Assertions
        expect(fakeTimezoneApiInterface).
          and.not.to.be.undefined().
          and.to.be.an.instanceof(FakeDefaultTimezoneApiInterface);
        expect(fakeTimezoneApiInterface.getTimezone).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });
    });
  });

  suite(`class`, () => {
    test(`should be defined when instantiated`, async () => {
      // Conditions
      const fakeTimezoneGateway = new FakeDefaultTimezoneGateway(fakeConstructorParams);

      // Assertions
      expect(fakeTimezoneGateway).
        and.not.to.be.undefined().
        and.to.be.instanceof(FakeDefaultTimezoneGateway);
    });

    test(`interface being implemented should be defined`, async () => {
      // Conditions
      const fakeTimezoneGatewayInterface = new FakeDefaultTimezoneGatewayInterface();

      // Assertions
      expect(fakeTimezoneGatewayInterface).
        and.not.to.be.undefined();
    });
  });

  suite(`method`, () => {
    suite(`fromCoordinates`, () => {
      test(`should be defined`, async () => {
        // Conditions
        const fakeTimezoneGateway = new FakeDefaultTimezoneGateway(fakeConstructorParams);

        // Assertions
        expect(fakeTimezoneGateway).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultTimezoneGateway);
        expect(fakeTimezoneGateway.fromCoordinates).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });

      test(`should return timezone attribute if parameter is valid`, async () => {
        // Conditions
        const fakeTimezoneGateway = new FakeDefaultTimezoneGateway(fakeConstructorParams);
        const fakeResponse        = await fakeTimezoneGateway.fromCoordinates(fakeValidTimezoneParams);

        // Assertions
        expect(fakeTimezoneGateway).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultTimezoneGateway);
        expect(fakeResponse).
          and.not.to.be.undefined().
          and.to.be.an.object().
          and.not.to.be.empty().
          and.to.contain([
            "timezone",
          ],
        );
      });
    });
  });
});
