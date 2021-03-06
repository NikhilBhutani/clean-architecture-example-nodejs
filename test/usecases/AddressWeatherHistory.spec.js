const Code = require("code"),
      Lab  = require("lab"),

      lab  = exports.lab = Lab.script(),

      { expect }                             = Code,
      { suite, test, beforeEach, afterEach } = lab,

      FakeAddressEntity                      = require("src/entities/Address"),
      FakeCoordinatesEntity                  = require("src/entities/Coordinates"),
      FakeHistoryEntity                      = require("src/entities/History"),
      {
        AddressGeocoderInterface:        FakeDefaultAddressGeocoderInterface,
        TimezoneGatewayInterface:        FakeDefaultTimezoneGatewayInterface,
        WeatherGatewayInterface:         FakeDefaultWeatherGatewayInterface,
        AddressWeatherHistoryInteractor: FakeDefaultAddressWeatherHistoryInteractor,
      }                                      = require("src/usecases/AddressWeatherHistory");

suite(`Usecase :: AddressWeatherHistory`, () => {
  const
    _composeHistoryEntity = Symbol.for("_composeHistoryEntity"),
    _assembleHistoricInfo = Symbol.for("_assembleHistoricInfo"),
    _isErrorFree          = Symbol.for("_isErrorFree");

  let fakeValidAddressAttrs;
  let fakeValidCoordinatesAttrs;
  let fakeValidWeatherAttrs;
  let fakeValidHistoryAttrs;
  let fakeGeocoderGateway;
  let fakeTimezoneGateway;
  let fakeTimeZoneData;
  let fakeHistoricWeatherData;
  let fakeWeatherGateway;
  let fakeConstructorParams;

  beforeEach(async () => {
    fakeValidAddressAttrs = {
      streetNumber: 42,
      streetName:   "Any Fake Street Name",
      city:         "Any Fake City Name",
      state:        "Any Fake State",
      zipCode:      42424,
    };

    fakeValidCoordinatesAttrs = {
      longitude: 42,
      latitude:  42,
    };

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

    fakeTimeZoneData = {
      timezone: "America/Los_Angeles",
    };

    fakeHistoricWeatherData = {
      dateTime:         new Date(),
      daytimeHighTemp:  44.01,
      overnightLowTemp: -44.01,
    };

    fakeGeocoderGateway = {
      fromAddress: async function fakeFromAddress (singleLineAddress) {
        return fakeValidCoordinatesAttrs;
      },
    };

    fakeTimezoneGateway = {
      fromCoordinates: async function fakeFromCoordinates () {
        return { timezone: "America/New_York" };
      },
    };

    fakeWeatherGateway = {
      getHistoricInfo: async function fakeGetHistoricInfo ({ latitude, longitude, dateTime }) {
        return fakeHistoricWeatherData;
      },
    };

    fakeConstructorParams = {
      geocoderGateway: fakeGeocoderGateway,
      timezoneGateway: fakeTimezoneGateway,
      weatherGateway:  fakeWeatherGateway,
    };
  });

  afterEach(async () => {
    fakeValidAddressAttrs     = {};
    fakeValidCoordinatesAttrs = {};
    fakeValidWeatherAttrs     = {};
    fakeValidHistoryAttrs     = {};
    fakeGeocoderGateway       = {};
    fakeTimezoneGateway       = {};
    fakeTimeZoneData          = {};
    fakeHistoricWeatherData   = {};
    fakeWeatherGateway        = {};
    fakeConstructorParams     = {};
  });

  suite(`interface`, () => {
    suite(`AddressGeocoderInterface`, () => {
      test(`should have a defined interface to be implemented`, async () => {
        // Assertions
        expect(FakeDefaultAddressGeocoderInterface).
          and.not.to.be.undefined();
      });

      test(`should have the "fromAddress()" method defined`, async () => {
        // Conditions
        const fakeAddressGeocoderInterface = new FakeDefaultAddressGeocoderInterface();

        // Assertions
        expect(fakeAddressGeocoderInterface.fromAddress).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });
    });

    suite(`TimezoneGatewayInterface`, () => {
      test(`should have a defined interface to be implemented`, async () => {
        // Assertions
        expect(FakeDefaultTimezoneGatewayInterface).
          and.not.to.be.undefined();
      });

      test(`should have the "fromCoordinates()" method defined`, async () => {
        // Conditions
        const fakeTimezoneGatewayInterface = new FakeDefaultTimezoneGatewayInterface();

        // Assertions
        expect(fakeTimezoneGatewayInterface.fromCoordinates).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });
    });

    suite(`WeatherGatewayInterface`, () => {
      test(`should have a defined interface to be implemented`, async () => {
        // Assertions
        expect(FakeDefaultWeatherGatewayInterface).
          and.not.to.be.undefined();
      });

      test(`should have the "getHistoricInfo()" method defined`, async () => {
        // Conditions
        const fakeWeatherGatewayInterface = new FakeDefaultWeatherGatewayInterface();

        // Assertions
        expect(fakeWeatherGatewayInterface.getHistoricInfo).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });
    });
  });

  suite(`class`, () => {
    test(`should be defined when instantiated with all injected dependencies`, async () => {
      // Conditions
      const fakeAddressWeatherHistoryInteractor = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);

      // Assertions
      expect(fakeAddressWeatherHistoryInteractor).
        and.not.to.be.undefined().
        and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
    });
  });

  suite(`public member`, () => {
    suite(`composePreviousDaily()`, () => {
      test(`should be defined`, async () => {
        // Conditions
        const fakeAddressWeatherHistoryInteractor = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);

        // Assertions
        expect(fakeAddressWeatherHistoryInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
        expect(fakeAddressWeatherHistoryInteractor.composePreviousDaily).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });

      test(`should always return a valid object when using valid parameters`, async () => {
        // Conditions
        const fakeAddressWeatherHistoryInteractor = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);
        fakeAddressWeatherHistoryInteractor.on(fakeAddressWeatherHistoryInteractor.outputs.DAILY_SUCCESS, fakeResponse => {

          // Assertions
          expect(fakeAddressWeatherHistoryInteractor).
            and.not.to.be.undefined().
            and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
          expect(fakeAddressWeatherHistoryInteractor.composePreviousDaily).
            and.not.to.be.undefined().
            and.to.be.a.function();
          expect(fakeResponse).
            and.to.contain([
              "observationPoints",
              "isErrorFree",
            ],
          );
        });

        // Execution
        const ignoredResponse = await fakeAddressWeatherHistoryInteractor.composePreviousDaily(fakeValidAddressAttrs);
      });

      test(`should return empty data when there are errors`, async () => {
        // Conditions
        const fakeAddressWeatherHistoryInteractor             = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);
        fakeAddressWeatherHistoryInteractor[_isErrorFree]     = false;
        fakeAddressWeatherHistoryInteractor.coordinatesEntity = new FakeCoordinatesEntity(fakeValidCoordinatesAttrs);
        fakeAddressWeatherHistoryInteractor.historyEntity     = new FakeHistoryEntity(fakeValidHistoryAttrs);
        fakeAddressWeatherHistoryInteractor.on(fakeAddressWeatherHistoryInteractor.outputs.DAILY_SUCCESS, fakeResponse => {

          // Assertions
          expect(fakeAddressWeatherHistoryInteractor).
            and.not.to.be.undefined().
            and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
          expect(fakeAddressWeatherHistoryInteractor.composePreviousDaily).
            and.not.to.be.undefined().
            and.to.be.a.function();
          expect(fakeResponse).
            and.to.contain("observationPoints");
          expect(fakeResponse.observationPoints).
            and.to.be.an.array();
          expect(fakeResponse.isErrorFree).
            and.to.be.a.boolean().
            and.to.be.false();
        });

        // Execution
        const ignoredResponse = await fakeAddressWeatherHistoryInteractor.composePreviousDaily(fakeValidAddressAttrs);
      });

      test(`should return valid data when there are NO errors`, async () => {
        // Conditions
        const fakeAddressWeatherHistoryInteractor = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);
        fakeAddressWeatherHistoryInteractor.on(fakeAddressWeatherHistoryInteractor.outputs.DAILY_SUCCESS, fakeResponse => {

          // Assertions
          expect(fakeAddressWeatherHistoryInteractor).
            and.not.to.be.undefined().
            and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
          expect(fakeAddressWeatherHistoryInteractor.composePreviousDaily).
            and.not.to.be.undefined().
            and.to.be.a.function();
          expect(fakeResponse.observationPoints).
            and.to.be.an.array().
            and.to.have.length(7);
          expect(fakeResponse.isErrorFree).
            and.to.be.a.boolean().
            and.to.be.true();
        });

        // Execution
        const ignoredResponse = await fakeAddressWeatherHistoryInteractor.composePreviousDaily(fakeValidAddressAttrs);
      });
    });

    suite(`getCoordinates()`, () => {
      test(`should be defined`, async () => {
        // Conditions
        const fakeAddressWeatherHistoryInteractor = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);

        // Assertions
        expect(fakeAddressWeatherHistoryInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
        expect(fakeAddressWeatherHistoryInteractor.getCoordinates).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });

      test(`should NOT return "false" when input addressData is valid`, async () => {
        // Conditions
        const fakeAddressWeatherHistoryInteractor = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);
        fakeAddressWeatherHistoryInteractor.on(fakeAddressWeatherHistoryInteractor.outputs.COORDINATES_SUCCESS, fakeResponse => {

          // Assertions
          expect(fakeAddressWeatherHistoryInteractor).
            and.not.to.be.undefined().
            and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
          expect(fakeAddressWeatherHistoryInteractor.getCoordinates).
            and.not.to.be.undefined().
            and.to.be.a.function();
          expect(fakeResponse).
            and.not.to.be.a.boolean().
            and.not.to.be.false();
        });

        // Execution
        const ignoredResponse = await fakeAddressWeatherHistoryInteractor.getCoordinates(fakeValidAddressAttrs);
      });

      test(`should return "coordinates" when input addressData is valid`, async () => {
        // Conditions
        const fakeAddressWeatherHistoryInteractor = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);
        fakeAddressWeatherHistoryInteractor.on(fakeAddressWeatherHistoryInteractor.outputs.COORDINATES_SUCCESS, fakeResponse => {

          // Assertions
          expect(fakeAddressWeatherHistoryInteractor).
            and.not.to.be.undefined().
            and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
          expect(fakeAddressWeatherHistoryInteractor.getCoordinates).
            and.not.to.be.undefined().
            and.to.be.a.function();
          expect(fakeResponse).
            and.to.be.an.object().
            and.to.contain([
              "longitude",
              "latitude",
            ],
          );
        });

        // Execution
        const ignoredResponse = await fakeAddressWeatherHistoryInteractor.getCoordinates(fakeValidAddressAttrs);
      });

      test(`should NOT return "coordinates" when coordinates are "invalid"`, async () => {
        // Conditions
        fakeValidCoordinatesAttrs                 = {};
        const fakeAddressWeatherHistoryInteractor = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);
        const fakeResponse                        = await fakeAddressWeatherHistoryInteractor.getCoordinates(fakeValidAddressAttrs);

        // Assertions
        expect(fakeAddressWeatherHistoryInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
        expect(fakeAddressWeatherHistoryInteractor.getCoordinates).
          and.not.to.be.undefined().
          and.to.be.a.function();
        expect(fakeResponse).
          and.to.be.a.boolean().
          and.to.be.false();
      });
    });

    suite(`validateAddress()`, () => {
      test(`should not be undefined when class is correctly instantiated`, async () => {
        // Conditions
        const fakeAddressWeatherHistoryInteractor = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);

        // Assertions
        expect(fakeAddressWeatherHistoryInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
        expect(fakeAddressWeatherHistoryInteractor.validateAddress).
          and.to.be.a.function();
      });

      test(`should return false when addressData argument is empty`, () => {
        // Conditions
        const fakeAddressWeatherHistoryInteractor = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);
        const fakeResponse                        = fakeAddressWeatherHistoryInteractor.validateAddress({});

        // Assertions
        expect(fakeAddressWeatherHistoryInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
        expect(fakeResponse).
          and.to.be.a.boolean().
          and.to.be.false();
      });

      test(`should assign a valid addressEntity to a member property when addressData argument is valid`, () => {
        // Conditions
        const fakeAddressWeatherHistoryInteractor = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);
        fakeAddressWeatherHistoryInteractor.on(fakeAddressWeatherHistoryInteractor.outputs.VALIDATION_SUCCESS, fakeResponse => {

          // Assertions
          expect(fakeAddressWeatherHistoryInteractor).
            and.not.to.be.undefined().
            and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
          expect(fakeResponse).
            and.to.be.a.boolean().
            and.to.be.true();
          expect(fakeAddressWeatherHistoryInteractor.addressEntity).
            and.to.be.an.instanceof(FakeAddressEntity);
        });

        // Execution
        const ignoredResponse = fakeAddressWeatherHistoryInteractor.validateAddress(fakeValidAddressAttrs);
      });
    });
  });

  suite(`private member`, () => {
    suite(`_assembleHistoricInfo`, () => {
      test(`should be defined`, () => {
        // Conditions
        const fakeAddressWeatherHistoryInteractor = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);

        // Assertions
        expect(fakeAddressWeatherHistoryInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
        expect(fakeAddressWeatherHistoryInteractor[_assembleHistoricInfo]).
          and.not.to.be.undefined();
      });

      test(`should NOT assemble when there were previous errors`, async () => {
        // Conditions
        const fakeAddressWeatherHistoryInteractor             = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);
        fakeAddressWeatherHistoryInteractor.addressEntity     = new FakeAddressEntity(fakeValidAddressAttrs);
        fakeAddressWeatherHistoryInteractor.coordinatesEntity = new FakeCoordinatesEntity(fakeValidCoordinatesAttrs);
        fakeAddressWeatherHistoryInteractor.historyEntity     = new FakeHistoryEntity(fakeValidHistoryAttrs);
        fakeAddressWeatherHistoryInteractor[_isErrorFree]     = false;
        const fakeResponse                                    = await fakeAddressWeatherHistoryInteractor[_assembleHistoricInfo]();

        // Assertions
        expect(fakeAddressWeatherHistoryInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
        expect(fakeAddressWeatherHistoryInteractor[_assembleHistoricInfo]).
          and.not.to.be.undefined().
          and.to.be.a.function();
        expect(fakeAddressWeatherHistoryInteractor.historyEntity.observationPoints).
          and.to.be.an.array().
          and.to.have.length(1);
        expect(fakeResponse).
          and.to.be.a.boolean().
          and.to.be.false();
      });

      test(`should assemble new data points`, async () => {
        // Conditions
        const fakeAddressWeatherHistoryInteractor             = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);
        fakeAddressWeatherHistoryInteractor.addressEntity     = new FakeAddressEntity(fakeValidAddressAttrs);
        fakeAddressWeatherHistoryInteractor.coordinatesEntity = new FakeCoordinatesEntity(fakeValidCoordinatesAttrs);
        fakeAddressWeatherHistoryInteractor.historyEntity     = new FakeHistoryEntity(fakeValidHistoryAttrs);
        fakeAddressWeatherHistoryInteractor.on(fakeAddressWeatherHistoryInteractor.outputs.ASSEMBLE_SUCCESS, fakeResponse => {

          // Assertions
          expect(fakeAddressWeatherHistoryInteractor).
            and.not.to.be.undefined().
            and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
          expect(fakeAddressWeatherHistoryInteractor[_assembleHistoricInfo]).
            and.not.to.be.undefined().
            and.to.be.a.function();
          expect(fakeAddressWeatherHistoryInteractor.historyEntity.observationPoints).
            and.to.be.an.array().
            and.to.have.length(8);
          expect(fakeResponse).
            and.to.be.a.boolean().
            and.to.be.true();
        });

        // Execution
        const ignoredResponse = await fakeAddressWeatherHistoryInteractor[_assembleHistoricInfo]();
      });
    });

    suite(`_composeHistoryEntity`, () => {
      test(`should be defined`, () => {
        // Conditions
        const fakeAddressWeatherHistoryInteractor = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);

        // Assertions
        expect(fakeAddressWeatherHistoryInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
        expect(fakeAddressWeatherHistoryInteractor[_composeHistoryEntity]).
          and.not.to.be.undefined();
      });

      test(`should NOT compose when there were previous errors`, async () => {
        // Conditions
        const fakeAddressWeatherHistoryInteractor             = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);
        fakeAddressWeatherHistoryInteractor.coordinatesEntity = new FakeCoordinatesEntity(fakeValidCoordinatesAttrs);
        fakeAddressWeatherHistoryInteractor.historyEntity     = "fake before value 3";
        fakeAddressWeatherHistoryInteractor[_isErrorFree]     = false;
        const fakeResponse                                    = await fakeAddressWeatherHistoryInteractor[_composeHistoryEntity]();

        // Assertions
        expect(fakeAddressWeatherHistoryInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
        expect(fakeAddressWeatherHistoryInteractor[_composeHistoryEntity]).
          and.not.to.be.undefined().
          and.to.be.a.function();
        expect(fakeAddressWeatherHistoryInteractor.historyEntity).
          and.not.to.be.instanceof(FakeHistoryEntity).
          and.to.equal("fake before value 3");
        expect(fakeResponse).
          and.to.be.a.boolean().
          and.to.be.false();
      });

      test(`should NOT compose when the history entity is invalid`, async () => {
        // Conditions
        delete fakeValidCoordinatesAttrs.latitude;
        const fakeAddressWeatherHistoryInteractor             = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);
        fakeAddressWeatherHistoryInteractor.addressEntity     = new FakeAddressEntity(fakeValidAddressAttrs);
        fakeAddressWeatherHistoryInteractor.coordinatesEntity = new FakeCoordinatesEntity(fakeValidCoordinatesAttrs);
        fakeAddressWeatherHistoryInteractor.historyEntity     = "fake before value 3";
        fakeAddressWeatherHistoryInteractor.on(fakeAddressWeatherHistoryInteractor.outputs.COMPOSE_SUCCESS, fakeResponse => {

          // Assertions
          expect(fakeAddressWeatherHistoryInteractor).
            and.not.to.be.undefined().
            and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
          expect(fakeAddressWeatherHistoryInteractor[_composeHistoryEntity]).
            and.not.to.be.undefined().
            and.to.be.a.function();
          expect(fakeAddressWeatherHistoryInteractor.historyEntity).
            and.not.to.be.instanceof(FakeHistoryEntity).
            and.to.equal("fake before value 3");
          expect(fakeResponse).
            and.to.be.an.array();
        });

        // Execution
        const ignoredResponse = await fakeAddressWeatherHistoryInteractor[_composeHistoryEntity]();
      });

      test(`should compose when there were no previous errors`, async () => {
        // Conditions
        const fakeAddressWeatherHistoryInteractor             = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);
        fakeAddressWeatherHistoryInteractor.addressEntity     = new FakeAddressEntity(fakeValidAddressAttrs);
        fakeAddressWeatherHistoryInteractor.coordinatesEntity = new FakeCoordinatesEntity(fakeValidCoordinatesAttrs);
        fakeAddressWeatherHistoryInteractor.historyEntity     = "fake before value 3";
        fakeAddressWeatherHistoryInteractor.on(fakeAddressWeatherHistoryInteractor.outputs.COMPOSE_SUCCESS, fakeResponse => {

          // Assertions
          expect(fakeAddressWeatherHistoryInteractor).
            and.not.to.be.undefined().
            and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
          expect(fakeAddressWeatherHistoryInteractor[_composeHistoryEntity]).
            and.not.to.be.undefined().
            and.to.be.a.function();
          expect(fakeAddressWeatherHistoryInteractor.historyEntity).
            and.to.be.instanceof(FakeHistoryEntity).
            and.not.to.equal("fake before value 3");
          expect(fakeResponse).
            and.to.be.a.boolean().
            and.to.be.true();
        });

        // Execution
        const ignoredResponse = await fakeAddressWeatherHistoryInteractor[_composeHistoryEntity]();
      });
    });

    suite(`_isErrorFree`, () => {
      test(`should return the correct initial value of an instance`, async () => {
        // Conditions
        const fakeAddressWeatherHistoryInteractor = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);
        const fakeResponse                        = fakeAddressWeatherHistoryInteractor[Symbol.for("_isErrorFree")];

        // Assertions
        expect(fakeAddressWeatherHistoryInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
        expect(fakeResponse).
          and.to.be.boolean().
          and.to.be.true();
      });

      test(`should retain the correct value when assigning a new value`, async () => {
        // Conditions
        const fakeAddressWeatherHistoryInteractor         = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);
        fakeAddressWeatherHistoryInteractor[_isErrorFree] = false;
        const fakeResponse                                = fakeAddressWeatherHistoryInteractor[Symbol.for("_isErrorFree")];

        // Assertions
        expect(fakeAddressWeatherHistoryInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
        expect(fakeResponse).
          and.to.be.boolean().
          and.to.be.false();
      });
    });
  });
});
