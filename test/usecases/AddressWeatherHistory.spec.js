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
        AddressWeatherHistoryInteractor: FakeDefaultAddressWeatherHistoryInteractor,
      }                                      = require("src/usecases/AddressWeatherHistory");

suite(`Usecase :: AddressWeatherHistory`, () => {
  const
    _composeHistoryEntity = Symbol.for("_composeHistoryEntity"),
    _isErrorFree          = Symbol.for("_isErrorFree");

  let fakeValidAddressAttrs;
  let fakeValidCoordinatesAttrs;
  let fakeGeocoderGateway;
  let fakeTimezoneGateway;
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

    fakeConstructorParams = {
      geocoderGateway: fakeGeocoderGateway,
      timezoneGateway: fakeTimezoneGateway,
    };
  });

  afterEach(async () => {
    fakeValidAddressAttrs     = {};
    fakeValidCoordinatesAttrs = {};
    fakeGeocoderGateway       = {};
    fakeTimezoneGateway       = {};
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
        const fakeResponse                        = await fakeAddressWeatherHistoryInteractor.getCoordinates(fakeValidAddressAttrs);

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

      test(`should return "coordinates" when input addressData is valid`, async () => {
        // Conditions
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
          and.to.be.an.object().
          and.to.contain([
            "longitude",
            "latitude",
          ],
        );
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
        const fakeResponse                        = fakeAddressWeatherHistoryInteractor.validateAddress(fakeValidAddressAttrs);

        // Assertions
        expect(fakeAddressWeatherHistoryInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
        expect(fakeResponse).
          and.to.be.a.boolean().
          and.not.to.be.false();
      });
    });

    suite(`getPrivate`, () => {
      test(`should return undefined when getting from never defined private var`, async () => {
        // Conditions
        const fakeAddressWeatherHistoryInteractor = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);
        const fakeResponse                        = FakeDefaultAddressWeatherHistoryInteractor.getPrivate("fakeVarName", this);

        // Assertions
        expect(fakeAddressWeatherHistoryInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
        expect(fakeResponse).
          and.to.be.undefined();
      });

      test(`should return correct value when getting from a previously defined private var`, async () => {
        // Conditions
        FakeDefaultAddressWeatherHistoryInteractor.setPrivate("fakeVarName", "fakeValue", this);
        const fakeAddressWeatherHistoryInteractor = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);
        const fakeResponse                        = FakeDefaultAddressWeatherHistoryInteractor.getPrivate("fakeVarName", this);

        // Assertions
        expect(fakeAddressWeatherHistoryInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
        expect(fakeResponse).
          and.not.to.be.undefined().
          and.to.equal("fakeValue");
      });
    });

    suite(`setPrivate`, () => {
      test(`should return correct value when getting from a previously defined private var`, async () => {
        // Conditions
        FakeDefaultAddressWeatherHistoryInteractor.setPrivate("fakeVarName", "fakeValue", this);
        const fakeAddressWeatherHistoryInteractor = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);
        const fakeResponse                        = FakeDefaultAddressWeatherHistoryInteractor.getPrivate("fakeVarName", this);

        // Assertions
        expect(fakeAddressWeatherHistoryInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultAddressWeatherHistoryInteractor);
        expect(fakeResponse).
          and.not.to.be.undefined().
          and.to.equal("fakeValue");
      });
    });
  });

  suite(`private member`, () => {
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

      test(`should compose when there were no previous errors`, async () => {
        // Conditions
        const fakeAddressWeatherHistoryInteractor             = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructorParams);
        fakeAddressWeatherHistoryInteractor.addressEntity     = new FakeAddressEntity(fakeValidAddressAttrs);
        fakeAddressWeatherHistoryInteractor.coordinatesEntity = new FakeCoordinatesEntity(fakeValidCoordinatesAttrs);
        fakeAddressWeatherHistoryInteractor.historyEntity     = "fake before value 3";
        const fakeResponse                                    = await fakeAddressWeatherHistoryInteractor[_composeHistoryEntity]();

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
