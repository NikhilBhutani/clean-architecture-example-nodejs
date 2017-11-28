const Code = require("code"),
      Lab  = require("lab"),

      lab  = exports.lab = Lab.script(),

      { expect }                             = Code,
      { suite, test, beforeEach, afterEach } = lab,

      {
        WeatherApi: FakeWeatherApi,
      }                                      = require("src/externals/DarkSky"),

      {
        WeatherApiInterface: FakeDefaultWeatherApiInterface,
      }                                      = require("src/gateways/Weather");

suite(`External :: DarkSky`, () => {
  const
    _composeWeatherApiParams = Symbol.for("_composeWeatherApiParams"),
    _toWeather               = Symbol.for("_toWeather"),

    originalToCoordinates    = FakeWeatherApi[_toWeather];

  let fakeConfigAttrs;
  let fakeGetWeatherParams;
  let fakeWeatherApiParams;
  let fakeToWeatherParams;
  let fakeConstructorParams;

  beforeEach(async () => {
    fakeConfigAttrs = {
      tokenKeys: {
        google:  "fakeGoogleTokenKey",
        darkSky: "fakeDarkSkyTokenKey",
      },
      apiUrls:   {
        geocode:  "fake://maps.googleapis.com/maps/api/geocode/json",
        timezone: "fake://maps.googleapis.com/maps/api/timezone/json",
        weather:  "fake://api.darksky.net/forecast",
      },
    };

    fakeGetWeatherParams = {
      longitude:   42,
      latitude:    42,
      unixTimeUtc: 42,
    };

    fakeWeatherApiParams = {
      tokenKey:    "fakeWeatherTokenKey",
      longitude:   42,
      latitude:    42,
      unixTimeUtc: 42,
    };

    fakeToWeatherParams = {
      response: {
        data: {
          daily: {
            data: [{
              time:            44,
              temperatureHigh: 44.44,
              temperatureLow:  -44.44,
            }],
          },
        },
      },
    };

    fakeConstructorParams = {
      config: fakeConfigAttrs,
    };
  });

  afterEach(async () => {
    fakeConfigAttrs            = {};
    fakeGetWeatherParams       = {};
    fakeWeatherApiParams       = {};
    fakeToWeatherParams        = {};
    fakeConstructorParams      = {};
    FakeWeatherApi[_toWeather] = originalToCoordinates;
  });

  suite(`interface`, () => {
    suite(`WeatherApiInterface`, () => {
      test(`should be defined`, async () => {
        // Assertions
        expect(FakeDefaultWeatherApiInterface).
          and.not.to.be.undefined();
      });

      test(`should have the "getWeather()" public method`, async () => {
        // Conditions
        const fakeDefaultWeatherApiInterface = new FakeDefaultWeatherApiInterface();

        // Assertions
        expect(fakeDefaultWeatherApiInterface).
          and.not.to.be.undefined().
          and.to.be.an.instanceof(FakeDefaultWeatherApiInterface);
        expect(fakeDefaultWeatherApiInterface.getWeather).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });
    });
  });

  suite(`class`, () => {
    suite(`WeatherApi`, () => {
      test(`should be defined`, async () => {
        // Conditions
        const fakeDefaultWeatherApiInterface = new FakeWeatherApi(fakeConstructorParams);

        // Assertions
        expect(fakeDefaultWeatherApiInterface).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeWeatherApi);
      });

      suite(`public member`, () => {
        suite(`tokenKey`, () => {
          test(`should be defined`, async () => {
            // Conditions
            const fakeDefaultWeatherApiInterface = new FakeWeatherApi(fakeConstructorParams);

            // Assertions
            expect(fakeDefaultWeatherApiInterface).
              and.not.to.be.undefined().
              and.to.be.instanceof(FakeWeatherApi).
              and.to.contain([
                "tokenKey",
              ],
            );
          });

          test(`should be assigned the correct value`, async () => {
            // Conditions
            const fakeDefaultWeatherApiInterface = new FakeWeatherApi(fakeConstructorParams);

            // Assertions
            expect(fakeDefaultWeatherApiInterface).
              and.not.to.be.undefined().
              and.to.be.instanceof(FakeWeatherApi);
            expect(fakeDefaultWeatherApiInterface.tokenKey).
              and.not.to.be.undefined().
              and.to.be.a.string().
              and.to.equal("fakeDarkSkyTokenKey");
          });
        });

        suite(`url`, () => {
          test(`should be defined`, async () => {
            // Conditions
            const fakeDefaultWeatherApiInterface = new FakeWeatherApi(fakeConstructorParams);

            // Assertions
            expect(fakeDefaultWeatherApiInterface).
              and.not.to.be.undefined().
              and.to.be.instanceof(FakeWeatherApi).
              and.to.contain([
                "url",
              ],
            );
          });

          test(`should be assigned the correct value`, async () => {
            // Conditions
            const fakeDefaultWeatherApiInterface = new FakeWeatherApi(fakeConstructorParams);

            // Assertions
            expect(fakeDefaultWeatherApiInterface).
              and.not.to.be.undefined().
              and.to.be.instanceof(FakeWeatherApi);
            expect(fakeDefaultWeatherApiInterface.url).
              and.not.to.be.undefined().
              and.to.be.a.string().
              and.to.equal("fake://api.darksky.net/forecast");
          });
        });
      });

      suite(`public method`, () => {
        suite(`getWeather()`, () => {
          test(`should be defined`, async () => {
            // Conditions
            const fakeDefaultWeatherApi = new FakeWeatherApi(fakeConstructorParams);

            // Assertions
            expect(fakeDefaultWeatherApi).
              and.not.to.be.undefined().
              and.to.be.instanceof(FakeWeatherApi);
            expect(fakeDefaultWeatherApi.getWeather).
              and.not.to.be.undefined();
          });

          test.skip(`should return the error when the promise throws`, async () => {
            // Conditions
            FakeWeatherApi[_toWeather]  = async function ({ response }) {
              return {
                fakeKey: "fakeVal",
              };
            };
            const fakeDefaultWeatherApi = new FakeWeatherApi(fakeConstructorParams);
            delete fakeDefaultWeatherApi.url;
            const fakeResponse = await fakeDefaultWeatherApi.getWeather(fakeGetWeatherParams);

            // Assertions
            expect(fakeDefaultWeatherApi).
              and.not.to.be.undefined().
              and.to.be.instanceof(FakeWeatherApi);
            expect(fakeResponse).
              and.to.be.an.object().
              and.contain([
                "fakeKey",
              ],
            );
          });

          test.skip(`should reject the promise with an error message when the client request encounters an error`, async () => {
            // Conditions
            FakeWeatherApi[_toWeather]  = function ({ response }) {
              throw "fakeError";
            };
            const fakeDefaultWeatherApi = new FakeWeatherApi(fakeConstructorParams);
            const fakeResponse          = await fakeDefaultWeatherApi.getWeather(fakeGetWeatherParams);

            // Assertions
            expect(fakeDefaultWeatherApi).
              and.not.to.be.undefined().
              and.to.be.instanceof(FakeWeatherApi);
            expect(fakeResponse).
              and.to.be.an.string().
              and.to.equal("fakeError");
          });
        });
      });

      suite(`static private method "_composeWeatherApiParams()"`, () => {
        test(`should be defined`, async () => {
          // Conditions
          const fakeDefaultWeatherApi = new FakeWeatherApi(fakeConstructorParams);
          const fakeResponse          = FakeWeatherApi[_composeWeatherApiParams](fakeWeatherApiParams);

          // Assertions
          expect(fakeDefaultWeatherApi).
            and.not.to.be.undefined().
            and.to.be.instanceof(FakeWeatherApi);
          expect(fakeResponse).
            and.to.not.be.undefined().
            and.to.be.a.string().
            and.to.equal("fakeWeatherTokenKey/42,42,42");
        });
      });

      suite(`static private method "_toWeather()"`, () => {
        test(`should be defined`, async () => {
          // Conditions
          const fakeDefaultWeatherApi = new FakeWeatherApi(fakeConstructorParams);
          const fakeResponse          = FakeWeatherApi[_toWeather](fakeToWeatherParams);

          // Assertions
          expect(fakeDefaultWeatherApi).
            and.not.to.be.undefined().
            and.to.be.instanceof(FakeWeatherApi);
          expect(fakeResponse).
            and.to.not.be.undefined().
            and.to.be.an.object().
            and.to.contain([
              "unixTimeUtc",
              "daytimeHighTemp",
              "overnightLowTemp",
            ],
          );
          expect(fakeResponse.unixTimeUtc).
            and.not.to.be.undefined().
            and.to.be.a.number().
            and.to.equal(44);
          expect(fakeResponse.daytimeHighTemp).
            and.not.to.be.undefined().
            and.to.be.a.number().
            and.to.equal(44.44);
          expect(fakeResponse.overnightLowTemp).
            and.not.to.be.undefined().
            and.to.be.a.number().
            and.to.equal(-44.44);
        });
      });
    });
  });
});
