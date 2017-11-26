const Code = require("code"),
      Lab  = require("lab"),

      lab  = exports.lab = Lab.script(),

      { expect }                             = Code,
      { suite, test, beforeEach, afterEach } = lab,

      {
        WeatherGateway:      FakeDefaultWeatherGateway,
        WeatherApiInterface: FakeDefaultWeatherApiInterface,
      }                                      = require("src/gateways/Weather"),

      {
        WeatherGatewayInterface: FakeDefaultWeatherGatewayInterface,
      }                                      = require("src/usecases/AddressWeatherHistory");

suite(`Gateway :: Weather`, () => {
  let fakeValidWeatherParams;
  let fakeValidWeatherAttrs;
  let fakeWeatherApi;
  let fakeConstructorParams;

  beforeEach(async () => {
    fakeValidWeatherParams = {
      latitude:  -44,
      longitude: 44,
      dateTime:  new Date(),
    };

    fakeValidWeatherAttrs = {
      dateTime:         42,
      daytimeHighTemp:  44,
      overnightLowTemp: -44,
    };

    fakeWeatherApi = {
      getWeather: async function fakeGetWeather ({ latitude, longitude, dateTime }) {
        return fakeValidWeatherAttrs;
      },
    };

    fakeConstructorParams = {
      weatherApi: fakeWeatherApi,
    };
  });

  afterEach(async () => {
    fakeValidWeatherParams = {};
    fakeValidWeatherAttrs  = {};
    fakeWeatherApi         = {};
    fakeConstructorParams  = {};
  });

  suite(`interface`, () => {
    suite(`weatherApi`, () => {
      test(`should have a defined interface to be implemented`, async () => {
        // Assertions
        expect(FakeDefaultWeatherApiInterface).
          and.not.to.be.undefined();
      });

      test(`should have the "getWeather()" method defined`, async () => {
        // Conditions
        const fakeWeatherApiInterface = new FakeDefaultWeatherApiInterface();

        // Assertions
        expect(fakeWeatherApiInterface).
          and.not.to.be.undefined().
          and.to.be.an.instanceof(FakeDefaultWeatherApiInterface);
        expect(fakeWeatherApiInterface.getWeather).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });
    });
  });

  suite(`class`, () => {
    test(`should be defined when instantiated with all injected dependencies`, async () => {
      // Conditions
      const fakeWeatherGateway = new FakeDefaultWeatherGateway(fakeConstructorParams);

      // Assertions
      expect(fakeWeatherGateway).
        and.not.to.be.undefined().
        and.to.be.instanceof(FakeDefaultWeatherGateway).
        and.to.include([
          "getInfo",
        ],
      );
      expect(fakeWeatherGateway.getInfo).
        and.to.be.a.function();
    });

    test(`interface being implemented should be defined`, async () => {
      // Conditions
      const fakeWeatherGatewayInterface = new FakeDefaultWeatherGatewayInterface();

      // Assertions
      expect(fakeWeatherGatewayInterface).
        and.not.to.be.undefined();
    });
  });

  suite(`method`, () => {
    suite(`getHistoricInfo`, () => {
      test(`should be defined`, async () => {
        // Conditions
        const fakeWeatherGateway = new FakeDefaultWeatherGateway(fakeConstructorParams);

        // Assertions
        expect(fakeWeatherGateway).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultWeatherGateway);
        expect(fakeWeatherGateway.getHistoricInfo).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });

      test(`should return coordinates attributes if parameter is valid`, async () => {
        // Conditions
        const fakeWeatherGateway = new FakeDefaultWeatherGateway(fakeConstructorParams);
        const fakeResponse       = await fakeWeatherGateway.getHistoricInfo(fakeValidWeatherParams);

        // Assertions
        expect(fakeWeatherGateway).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultWeatherGateway);
        expect(fakeResponse).
          and.not.to.be.undefined().
          and.to.be.an.object().
          and.not.to.be.empty().
          and.to.contain([
            "dateTime",
            "daytimeHighTemp",
            "overnightLowTemp",
          ],
        );
      });
    });
  });
});
