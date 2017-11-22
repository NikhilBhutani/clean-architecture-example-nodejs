const Code = require("code"),
      Lab  = require("lab"),

      lab  = exports.lab = Lab.script(),

      { expect }                             = Code,
      { suite, test, beforeEach, afterEach } = lab,

      fakeAddressEntity                      = require("src/entities/Address"),
      fakeCoordinatesEntity                  = require("src/entities/Coordinates"),
      {
        GeocodingInterface:  fakeDefaultGeocodingInterface,
        GeocodingInteractor: fakeDefaultGeocodingInteractor,
      }                                      = require("src/usecases/Geocoding");


suite(`Usecase :: Geocoding`, () => {
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
    geocoder: {
      fromAddress: async function fakeFromAddress (singleLineAddress) {
        return fakeValidCoordinatesAttrs;
      },
    },
  };

  suite(`interface`, () => {
    suite(`geocoder`, () => {
      test(`should have a defined interface to be implemented`, async () => {
        // Assertions
        expect(fakeDefaultGeocodingInterface).
          and.not.to.be.undefined();
      });

      test(`should have the "fromAddress()" method defined`, async () => {
        // Conditions
        const fakeGeocodingInterface = new fakeDefaultGeocodingInterface();

        // Assertions
        expect(fakeGeocodingInterface.fromAddress).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });
    });
  });

  suite(`class`, () => {
    test(`should be defined when instantiated with all injected dependencies`, async () => {
      // Conditions
      const fakeGeocodingInteractor = new fakeDefaultGeocodingInteractor(fakeConstructorParams);

      // Assertions
      expect(fakeGeocodingInteractor).
        and.not.to.be.undefined().
        and.to.be.instanceof(fakeDefaultGeocodingInteractor);
    });
  });

  suite(`public member`, () => {
    suite(`geoCodeFromAddress()`, () => {
      test(`should be defined as a function when all injected dependencies`, async () => {
        // Conditions
        const fakeGeocodingInteractor = new fakeDefaultGeocodingInteractor(fakeConstructorParams);

        // Assertions
        expect(fakeGeocodingInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeDefaultGeocodingInteractor);
        expect(fakeGeocodingInteractor.geoCodeFromAddress).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });
    });

    suite(`getCoordinates()`, () => {
      test(`should be defined`, async () => {
        // Conditions
        const fakeGeocodingInteractor = new fakeDefaultGeocodingInteractor(fakeConstructorParams);

        // Assertions
        expect(fakeGeocodingInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeDefaultGeocodingInteractor);
        expect(fakeGeocodingInteractor.getCoordinates).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });

      test(`should return "false" when input addressData is invalid`, async () => {
        // Conditions
        const fakeGeocodingInteractor = new fakeDefaultGeocodingInteractor(fakeConstructorParams);
        const fakeResponse            = await fakeGeocodingInteractor.getCoordinates();

        // Assertions
        expect(fakeGeocodingInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeDefaultGeocodingInteractor);
        expect(fakeGeocodingInteractor.getCoordinates).
          and.not.to.be.undefined().
          and.to.be.a.function();
        expect(fakeResponse).
          and.to.be.a.boolean().
          and.to.be.false();
      });

      test(`should NOT return "false" when input addressData is valid`, async () => {
        // Conditions
        const fakeGeocodingInteractor = new fakeDefaultGeocodingInteractor(fakeConstructorParams);
        const fakeResponse            = await fakeGeocodingInteractor.getCoordinates(fakeValidAddressAttrs);

        // Assertions
        expect(fakeGeocodingInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeDefaultGeocodingInteractor);
        expect(fakeGeocodingInteractor.getCoordinates).
          and.not.to.be.undefined().
          and.to.be.a.function();
        expect(fakeResponse).
          and.not.to.be.a.boolean().
          and.not.to.be.false();
      });

      test(`should return "coordinates" when input addressData is valid`, async () => {
        // Conditions
        const fakeGeocodingInteractor = new fakeDefaultGeocodingInteractor(fakeConstructorParams);
        const fakeResponse            = await fakeGeocodingInteractor.getCoordinates(fakeValidAddressAttrs);

        // Assertions
        expect(fakeGeocodingInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeDefaultGeocodingInteractor);
        expect(fakeGeocodingInteractor.getCoordinates).
          and.not.to.be.undefined().
          and.to.be.a.function();
        expect(fakeResponse).
          and.to.be.an.instanceof(fakeCoordinatesEntity);
        expect(fakeResponse.toJSON()).
          and.to.be.an.object().
          and.to.contain([
            "longitude",
            "latitude",
          ],
        );
      });

      test(`should NOT return "coordinates" when coordinates are "invalid"`, async () => {
        // Conditions
        const fakeConstructor         = {
          geocoder: {
            fromAddress: async function fakeFromAddress (singleLineAddress) {
              return {};
            },
          },
        };
        const fakeGeocodingInteractor = new fakeDefaultGeocodingInteractor(fakeConstructor);
        const fakeResponse            = await fakeGeocodingInteractor.getCoordinates(fakeValidAddressAttrs);

        // Assertions
        expect(fakeGeocodingInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeDefaultGeocodingInteractor);
        expect(fakeGeocodingInteractor.getCoordinates).
          and.not.to.be.undefined().
          and.to.be.a.function();
        expect(fakeResponse).
          and.not.to.be.an.instanceof(fakeCoordinatesEntity).
          and.to.be.a.boolean().
          and.to.be.false();
      });
    });
  });

  suite(`static public method`, () => {
    suite(`validateAddress()`, () => {
      test(`should not be undefined when class is correctly instantiated`, async () => {
        // Conditions
        const fakeGeocodingInteractor = new fakeDefaultGeocodingInteractor(fakeConstructorParams);

        // Assertions
        expect(fakeGeocodingInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeDefaultGeocodingInteractor);
        expect(fakeDefaultGeocodingInteractor.validateAddress).
          and.to.be.a.function();
      });

      test(`should return false when addressData argument is undefined`, () => {
        // Conditions
        const fakeGeocodingInteractor = new fakeDefaultGeocodingInteractor(fakeConstructorParams);
        const fakeResponse            = fakeDefaultGeocodingInteractor.validateAddress();

        // Assertions
        expect(fakeGeocodingInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeDefaultGeocodingInteractor);
        expect(fakeResponse).
          and.to.be.a.boolean().
          and.to.be.false();
      });

      test(`should return false when addressData argument is null`, () => {
        // Conditions
        const fakeGeocodingInteractor = new fakeDefaultGeocodingInteractor(fakeConstructorParams);
        const fakeResponse            = fakeDefaultGeocodingInteractor.validateAddress(null);

        // Assertions
        expect(fakeGeocodingInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeDefaultGeocodingInteractor);
        expect(fakeResponse).
          and.to.be.a.boolean().
          and.to.be.false();
      });

      test(`should return false when addressData argument is empty`, () => {
        // Conditions
        const fakeGeocodingInteractor = new fakeDefaultGeocodingInteractor(fakeConstructorParams);
        const fakeResponse            = fakeDefaultGeocodingInteractor.validateAddress({});

        // Assertions
        expect(fakeGeocodingInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeDefaultGeocodingInteractor);
        expect(fakeResponse).
          and.to.be.a.boolean().
          and.to.be.false();
      });

      test(`should return a valid addressEntity when addressData argument is valid`, () => {
        // Conditions
        const fakeGeocodingInteractor = new fakeDefaultGeocodingInteractor(fakeConstructorParams);
        const fakeResponse            = fakeDefaultGeocodingInteractor.validateAddress(fakeValidAddressAttrs);

        // Assertions
        expect(fakeGeocodingInteractor).
          and.not.to.be.undefined().
          and.to.be.instanceof(fakeDefaultGeocodingInteractor);
        expect(fakeResponse).
          and.not.to.be.a.boolean().
          and.not.to.be.false().
          and.to.an.instanceof(fakeAddressEntity);
        expect(fakeResponse.toJSON()).
          and.to.contain([
            "streetNumber",
            "streetName",
            "city",
            "state",
            "zipCode",
          ],
        );
      });
    });
  });
});
