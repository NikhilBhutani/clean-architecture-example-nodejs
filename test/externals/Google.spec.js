const Code = require("code"),
      Lab  = require("lab"),

      lab  = exports.lab = Lab.script(),

      { expect }                             = Code,
      { suite, test, beforeEach, afterEach } = lab,

      {
        GeocoderApi: FakeGeocoderApi,
        TimezoneApi: FakeTimezoneApi,
      }                                      = require("src/externals/Google"),

      {
        GeocoderApiInterface: FakeDefaultGeocoderApiInterface,
      }                                      = require("src/gateways/Geocoder"),

      {
        TimezoneApiInterface: FakeDefaultTimezoneApiInterface,
      }                                      = require("src/gateways/Timezone");

suite(`External :: Google`, () => {
  const
    _composeGeocodeApiParams  = Symbol.for("_composeGeocodeApiParams"),
    _composeTimezoneApiParams = Symbol.for("_composeTimezoneApiParams"),
    _toCoordinates            = Symbol.for("_toCoordinates"),
    _toTimezone               = Symbol.for("_toTimezone"),

    originalToCoordinates     = FakeGeocoderApi[_toCoordinates],
    originalToTimezone        = FakeTimezoneApi[_toTimezone];

  let fakeConfigAttrs;
  let fakeCoordinatesAttrs;
  let fakeGeocodeParams;
  let fakeToCoordinatesParams;
  let fakeTimezoneParams;
  let fakeToTimezoneParams;
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

    fakeCoordinatesAttrs = {
      longitude: 42,
      latitude:  42,
    };

    fakeGeocodeParams = {
      tokenKey: "fakeGeocodeTokenKey",
      address:  "fakeAddressParams",
    };

    fakeTimezoneParams = Object.assign(
      fakeCoordinatesAttrs, {
        tokenKey: "fakeTimezoneTokenKey",
      },
    );

    fakeToCoordinatesParams = {
      data: {
        results: [{
          geometry: {
            location: {
              lat: "fakeLat",
              lng: "fakeLng",
            },
          },
        }],
      },
    };

    fakeToTimezoneParams = {
      data: {
        timeZoneId: "fakeTimezoneId",
      },
    };

    fakeConstructorParams = {
      config: fakeConfigAttrs,
    };
  });

  afterEach(async () => {
    fakeConfigAttrs                 = {};
    fakeCoordinatesAttrs            = {};
    fakeGeocodeParams               = {};
    fakeTimezoneParams              = {};
    fakeToCoordinatesParams         = {};
    fakeToTimezoneParams            = {};
    fakeConstructorParams           = {};
    FakeGeocoderApi[_toCoordinates] = originalToCoordinates;
    FakeTimezoneApi[_toTimezone]    = originalToTimezone;
  });

  suite(`interface`, () => {
    suite(`GeocoderApiInterface`, () => {
      test(`should be defined`, async () => {
        // Assertions
        expect(FakeDefaultGeocoderApiInterface).
          and.not.to.be.undefined();
      });

      test(`should have the "getCoordinates()" public method`, async () => {
        // Conditions
        const fakeDefaultGeocoderApiInterface = new FakeDefaultGeocoderApiInterface();

        // Assertions
        expect(fakeDefaultGeocoderApiInterface).
          and.not.to.be.undefined().
          and.to.be.an.instanceof(FakeDefaultGeocoderApiInterface);
        expect(fakeDefaultGeocoderApiInterface.getCoordinates).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });
    });

    suite(`TimezoneApiInterface`, () => {
      test(`should be defined`, async () => {
        // Assertions
        expect(FakeDefaultTimezoneApiInterface).
          and.not.to.be.undefined();
      });

      test(`should have the "getTimezone()" public method`, async () => {
        // Conditions
        const fakeDefaultTimezoneApiInterface = new FakeDefaultTimezoneApiInterface();

        // Assertions
        expect(fakeDefaultTimezoneApiInterface).
          and.not.to.be.undefined().
          and.to.be.an.instanceof(FakeDefaultTimezoneApiInterface);
        expect(fakeDefaultTimezoneApiInterface.getTimezone).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });
    });
  });

  suite(`class`, () => {
    suite(`GeocoderApi`, () => {
      test(`should be defined`, async () => {
        // Conditions
        const fakeDefaultGeocoderApiInterface = new FakeGeocoderApi(fakeConstructorParams);

        // Assertions
        expect(fakeDefaultGeocoderApiInterface).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeGeocoderApi);
      });

      suite(`public method`, () => {
        suite(`getCoordinates()`, () => {
          test(`should be defined`, async () => {
            // Conditions
            const fakeDefaultGeocoderApi = new FakeGeocoderApi(fakeConstructorParams);
            const fakeResponse           = await fakeDefaultGeocoderApi.getCoordinates("fakeAddressParam");

            // Assertions
            expect(fakeDefaultGeocoderApi).
              and.not.to.be.undefined().
              and.to.be.instanceof(FakeGeocoderApi);
            expect(fakeResponse).
              and.not.to.be.undefined();
          });

          test.skip(`should return a valid object with an undefined value`, async () => {
            // Conditions
            const fakeDefaultGeocoderApi = new FakeGeocoderApi(fakeConstructorParams);
            const fakeResponse           = await fakeDefaultGeocoderApi.getCoordinates("1191 Magnolia Ave, Corona, CA");

            // Assertions
            expect(fakeDefaultGeocoderApi).
              and.not.to.be.undefined().
              and.to.be.instanceof(FakeGeocoderApi);
            expect(fakeResponse).
              and.to.be.an.object().
              and.contain([
                "response",
              ],
            );
          });

          test.skip(`should return a valid object with an undefined value`, async () => {
            // Conditions
            FakeGeocoderApi[_toCoordinates] = async function ({ response }) {
              return {
                fakeKey: "fakeVal",
              };
            };
            const fakeDefaultGeocoderApi    = new FakeGeocoderApi(fakeConstructorParams);
            const fakeResponse              = await fakeDefaultGeocoderApi.getCoordinates("1191 Magnolia Ave, Corona, CA");

            // Assertions
            expect(fakeDefaultGeocoderApi).
              and.not.to.be.undefined().
              and.to.be.instanceof(FakeGeocoderApi);
            expect(fakeResponse).
              and.to.be.an.object().
              and.contain([
                "fakeKey",
              ],
            );
          });

          test.skip(`should reject the promise with an error message when the client request encounters an error`, async () => {
            // Conditions
            FakeGeocoderApi[_toCoordinates] = function (foo) {
              throw "fakeError";
            };
            const fakeDefaultGeocoderApi    = new FakeGeocoderApi(fakeConstructorParams);
            const fakeResponse              = await fakeDefaultGeocoderApi.getCoordinates("1191 Magnolia Ave, Corona, CA");

            // Assertions
            expect(fakeDefaultGeocoderApi).
              and.not.to.be.undefined().
              and.to.be.instanceof(FakeGeocoderApi);
            expect(fakeResponse).
              and.to.be.an.object().
              and.to.equal("fakeError");
          });
        });
      });

      suite(`static private method "_composeGeocodeApiParams()"`, () => {
        test(`should be defined`, async () => {
          // Conditions
          const fakeDefaultGeocoderApi = new FakeGeocoderApi(fakeConstructorParams);
          const fakeResponse           = FakeGeocoderApi[_composeGeocodeApiParams](fakeGeocodeParams);

          // Assertions
          expect(fakeDefaultGeocoderApi).
            and.not.to.be.undefined().
            and.to.be.instanceof(FakeGeocoderApi);
          expect(fakeResponse).
            and.to.not.be.undefined().
            and.to.be.an.object().
            and.to.contain([
              "key",
              "address",
            ],
          );
          expect(fakeResponse.key).
            and.not.to.be.undefined().
            and.to.be.a.string().
            and.to.equal("fakeGeocodeTokenKey");
          expect(fakeResponse.address).
            and.not.to.be.undefined().
            and.to.be.a.string().
            and.to.equal("fakeAddressParams");
        });
      });

      suite(`static private method "_toCoordinates()"`, () => {
        test(`should be defined`, async () => {
          // Conditions
          const fakeDefaultGeocoderApi = new FakeGeocoderApi(fakeConstructorParams);
          const fakeResponse           = FakeGeocoderApi[_toCoordinates](fakeToCoordinatesParams);

          // Assertions
          expect(fakeDefaultGeocoderApi).
            and.not.to.be.undefined().
            and.to.be.instanceof(FakeGeocoderApi);
          expect(fakeResponse).
            and.to.not.be.undefined().
            and.to.be.an.object().
            and.to.contain([
              "latitude",
              "longitude",
            ],
          );
          expect(fakeResponse.latitude).
            and.not.to.be.undefined().
            and.to.be.a.string().
            and.to.equal("fakeLat");
          expect(fakeResponse.longitude).
            and.not.to.be.undefined().
            and.to.be.a.string().
            and.to.equal("fakeLng");
        });
      });
    });

    suite(`TimezoneApi`, () => {
      test(`should be defined`, async () => {
        // Conditions
        const fakeDefaultTimezoneApiInterface = new FakeTimezoneApi(fakeConstructorParams);

        // Assertions
        expect(fakeDefaultTimezoneApiInterface).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeTimezoneApi);
      });

      suite(`public method`, () => {
        suite(`getTimezone()`, () => {
          test(`should be defined`, async () => {
            // Conditions
            const fakeDefaultTimezoneApi = new FakeTimezoneApi(fakeConstructorParams);
            const fakeResponse           = await fakeDefaultTimezoneApi.getTimezone(fakeCoordinatesAttrs);

            // Assertions
            expect(fakeDefaultTimezoneApi).
              and.not.to.be.undefined().
              and.to.be.instanceof(FakeTimezoneApi);
            expect(fakeResponse).
              and.not.to.be.undefined();
          });

          test(`should return a valid object with an undefined value`, async () => {
            // Conditions
            const fakeDefaultTimezoneApi = new FakeTimezoneApi(fakeConstructorParams);
            const fakeResponse           = await fakeDefaultTimezoneApi.getTimezone(fakeCoordinatesAttrs);

            // Assertions
            expect(fakeDefaultTimezoneApi).
              and.not.to.be.undefined().
              and.to.be.instanceof(FakeTimezoneApi);
            expect(fakeResponse).
              and.to.be.an.object().
              and.contain([
                "timezone",
              ],
            );
          });

          test(`should return a valid object with an undefined value`, async () => {
            // Conditions
            FakeTimezoneApi[_toTimezone] = async function ({ timeZoneId }) {
              return {
                fakeKey: "fakeVal",
              };
            };
            const fakeDefaultTimezoneApi = new FakeTimezoneApi(fakeConstructorParams);
            const fakeResponse           = await fakeDefaultTimezoneApi.getTimezone(fakeCoordinatesAttrs);

            // Assertions
            expect(fakeDefaultTimezoneApi).
              and.not.to.be.undefined().
              and.to.be.instanceof(FakeTimezoneApi);
            expect(fakeResponse).
              and.to.be.an.object().
              and.contain([
                "fakeKey",
              ],
            );
          });

          test(`should reject the promise with an error message when the client request encounters an error`, async () => {
            // Conditions
            FakeTimezoneApi[_toTimezone] = function (foo) {
              throw "fakeError";
            };
            const fakeDefaultTimezoneApi = new FakeTimezoneApi(fakeConstructorParams);
            const fakeResponse           = await fakeDefaultTimezoneApi.getTimezone(fakeCoordinatesAttrs);

            // Assertions
            expect(fakeDefaultTimezoneApi).
              and.not.to.be.undefined().
              and.to.be.instanceof(FakeTimezoneApi);
            expect(fakeResponse).
              and.to.be.a.string().
              and.to.equal("fakeError");
          });
        });
      });

      suite(`static private method "_composeTimezoneApiParams()"`, () => {
        test(`should be defined`, async () => {
          // Conditions
          const fakeDefaultTimezoneApi = new FakeTimezoneApi(fakeConstructorParams);
          const fakeResponse           = FakeTimezoneApi[_composeTimezoneApiParams](fakeTimezoneParams);

          // Assertions
          expect(fakeDefaultTimezoneApi).
            and.not.to.be.undefined().
            and.to.be.instanceof(FakeTimezoneApi);
          expect(fakeResponse).
            and.to.not.be.undefined().
            and.to.be.an.object().
            and.to.contain([
              "key",
              "location",
            ],
          );
          expect(fakeResponse.key).
            and.not.to.be.undefined().
            and.to.be.a.string().
            and.to.equal("fakeTimezoneTokenKey");
          expect(fakeResponse.location).
            and.not.to.be.undefined().
            and.to.be.a.string().
            and.to.equal("42,42");
        });
      });

      suite(`static private method "_toTimezone()"`, () => {
        test(`should be defined`, async () => {
          // Conditions
          const fakeDefaultTimezoneApi = new FakeTimezoneApi(fakeConstructorParams);
          const fakeResponse           = FakeTimezoneApi[_toTimezone](fakeToTimezoneParams);

          // Assertions
          expect(fakeDefaultTimezoneApi).
            and.not.to.be.undefined().
            and.to.be.instanceof(FakeTimezoneApi);
          expect(fakeResponse).
            and.to.not.be.undefined().
            and.to.be.an.object().
            and.to.contain([
              "timezone",
            ],
          );
          expect(fakeResponse.timezone).
            and.not.to.be.undefined().
            and.to.be.a.string().
            and.to.equal("fakeTimezoneId");
        });
      });
    });
  });
});
