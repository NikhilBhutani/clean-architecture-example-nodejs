const Code = require("code"),
      Lab  = require("lab"),

      lab  = exports.lab = Lab.script(),

      { expect }                             = Code,
      { suite, test, beforeEach, afterEach } = lab,

      {
        GeocoderGateway:      FakeDefaultGeocoderGateway,
        GeocoderApiInterface: FakeDefaultGeocoderApiInterface,
      }                                      = require("src/gateways/Geocoder"),

      {
        AddressGeocoderInterface: FakeDefaultGeocoderGatewayInterface,
      }                                      = require("src/usecases/AddressWeatherHistory");

suite(`Gateway :: Geocoder`, () => {
  let fakeValidCoordinatesAttrs;
  let fakeGeocoderApi;
  let fakeConstructorParams;

  beforeEach(async () => {
    fakeValidCoordinatesAttrs = {
      longitude: 42,
      latitude:  42,
    };

    fakeGeocoderApi = {
      getCoordinates: async function fakeFromAddress (singleLineAddress) {
        return fakeValidCoordinatesAttrs;
      },
    };

    fakeConstructorParams = {
      geocoderApi: fakeGeocoderApi,
    };
  });

  afterEach(async () => {
    fakeValidCoordinatesAttrs = {};
    fakeGeocoderApi           = {};
    fakeConstructorParams     = {};
  });

  suite(`interface`, () => {
    suite(`geocoderApi`, () => {
      test(`should have a defined interface to be implemented`, async () => {
        // Assertions
        expect(FakeDefaultGeocoderApiInterface).
          and.not.to.be.undefined();
      });

      test(`should have the "getCoordinates()" method defined`, async () => {
        // Conditions
        const fakeGeocoderApiInterface = new FakeDefaultGeocoderApiInterface();

        // Assertions
        expect(fakeGeocoderApiInterface.getCoordinates).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });
    });
  });

  suite(`class`, () => {
    test(`should be defined when instantiated`, async () => {
      // Conditions
      const fakeGeocoderGateway = new FakeDefaultGeocoderGateway(fakeConstructorParams);

      // Assertions
      expect(fakeGeocoderGateway).
        and.not.to.be.undefined().
        and.to.be.instanceof(FakeDefaultGeocoderGateway);
    });

    test(`interface being implemented should be defined`, async () => {
      // Conditions
      const fakeGeocoderGatewayInterface = new FakeDefaultGeocoderGatewayInterface();

      // Assertions
      expect(fakeGeocoderGatewayInterface).
        and.not.to.be.undefined();
    });
  });

  suite(`method`, () => {
    suite(`fromAddress`, () => {
      test(`should be defined`, async () => {
        // Conditions
        const fakeGeocoderGateway = new FakeDefaultGeocoderGateway(fakeConstructorParams);

        // Assertions
        expect(fakeGeocoderGateway).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultGeocoderGateway);
        expect(fakeGeocoderGateway.fromAddress).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });

      test(`should return empty object if parameter is undefined`, async () => {
        // Conditions
        const fakeGeocoderGateway = new FakeDefaultGeocoderGateway(fakeConstructorParams);
        const fakeResponse        = await fakeGeocoderGateway.fromAddress();

        // Assertions
        expect(fakeGeocoderGateway).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultGeocoderGateway);
        expect(fakeResponse).
          and.not.to.be.undefined().
          and.to.be.an.object().
          and.not.to.be.empty().
          and.to.contain([
            "longitude",
            "latitude",
          ],
        );
      });

      test(`should return empty object if parameter is null`, async () => {
        // Conditions
        const fakeGeocoderGateway = new FakeDefaultGeocoderGateway(fakeConstructorParams);
        const fakeResponse        = await fakeGeocoderGateway.fromAddress(null);

        // Assertions
        expect(fakeGeocoderGateway).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultGeocoderGateway);
        expect(fakeResponse).
          and.not.to.be.undefined().
          and.to.be.an.object().
          and.not.to.be.empty().
          and.to.contain([
            "longitude",
            "latitude",
          ],
        );
      });

      test(`should return empty object if parameter is empty string`, async () => {
        // Conditions
        const fakeGeocoderGateway = new FakeDefaultGeocoderGateway(fakeConstructorParams);
        const fakeResponse        = await fakeGeocoderGateway.fromAddress("");

        // Assertions
        expect(fakeGeocoderGateway).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultGeocoderGateway);
        expect(fakeResponse).
          and.not.to.be.undefined().
          and.to.be.an.object().
          and.not.to.be.empty().
          and.to.contain([
            "longitude",
            "latitude",
          ],
        );
      });

      test(`should return coordinates attributes if parameter is a valid string`, async () => {
        // Conditions
        const fakeGeocoderGateway = new FakeDefaultGeocoderGateway(fakeConstructorParams);
        const fakeResponse        = await fakeGeocoderGateway.fromAddress("fake single line address");

        // Assertions
        expect(fakeGeocoderGateway).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultGeocoderGateway);
        expect(fakeResponse).
          and.not.to.be.undefined().
          and.to.be.an.object().
          and.not.to.be.empty().
          and.to.contain([
            "longitude",
            "latitude",
          ],
        );
      });
    });
  });
});
