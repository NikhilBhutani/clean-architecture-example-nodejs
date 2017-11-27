const Code = require("code"),
      Lab  = require("lab"),

      lab  = exports.lab = Lab.script(),

      { expect }                             = Code,
      { suite, test, beforeEach, afterEach } = lab,

      FakeAddressEntity                      = require("src/entities/Address"),
      FakeCoordinatesEntity                  = require("src/entities/Coordinates"),
      {
        AddressGeocoderInterface:        FakeDefaultAddressGeocoderInterface,
        AddressWeatherHistoryInteractor: FakeDefaultAddressWeatherHistoryInteractor,
      }                                      = require("src/usecases/AddressWeatherHistory");

suite(`Usecase :: AddressWeatherHistory`, () => {
  const _isErrorFree = Symbol.for("_isErrorFree");

  const fakeValidAddressAttrs = {
    streetNumber: 42,
    streetName:   "Any Fake Street Name",
    city:         "Any Fake City Name",
    state:        "Any Fake State",
    zipCode:      42424,
  };

  const fakeValidCoordinatesAttrs = {
    longitude: 42,
    latitude:  42,
  };

  const fakeConstructorParams = {
    geocoderGateway: {
      fromAddress: async function fakeFromAddress (singleLineAddress) {
        return fakeValidCoordinatesAttrs;
      },
    },
  };

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
        const fakeConstructor                     = {
          geocoderGateway: {
            fromAddress: async function fakeFromAddress (singleLineAddress) {
              return {};
            },
          },
        };
        const fakeAddressWeatherHistoryInteractor = new FakeDefaultAddressWeatherHistoryInteractor(fakeConstructor);
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
    suite(`isErrorFree`, () => {
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
