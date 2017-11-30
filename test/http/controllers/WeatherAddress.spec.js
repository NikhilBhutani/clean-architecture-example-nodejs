const Code = require("code"),
      Lab  = require("lab"),

      lab  = exports.lab = Lab.script(),

      { expect }                             = Code,
      { suite, test, beforeEach, afterEach } = lab,

      {
        AddressInputInterface:    FakeAddressInputInterface,
        WeatherAddressController: FakeWeatherAddressController,
      }                                      = require("src/http/controllers/WeatherAddress");

suite(`Controller :: WeatherAddress`, () => {
  suite(`AddressInputInterface`, () => {
    test(`should have a defined interface to be implemented`, async () => {
      // Assertions
      expect(FakeAddressInputInterface).
        and.not.to.be.undefined();
    });

    suite(`composePreviousDaily`, () => {
      test(`should have the "composePreviousDaily()" method defined`, async () => {
        // Conditions
        const fakeAddressInputInterface = new FakeAddressInputInterface();

        // Assertions
        expect(fakeAddressInputInterface.composePreviousDaily).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });
    });

    suite(`getCoordinates`, () => {
      test(`should have the "composePreviousDaily()" method defined`, async () => {
        // Conditions
        const fakeAddressInputInterface = new FakeAddressInputInterface();

        // Assertions
        expect(fakeAddressInputInterface.getCoordinates).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });
    });

    suite(`validateAddress`, () => {
      test(`should have the "composePreviousDaily()" method defined`, async () => {
        // Conditions
        const fakeAddressInputInterface = new FakeAddressInputInterface();

        // Assertions
        expect(fakeAddressInputInterface.validateAddress).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });
    });
  });

  suite(`WeatherAddressController`, () => {
    test(`should be defined`, async () => {
      // Assertions
      expect(FakeWeatherAddressController).
        and.not.to.be.undefined().
        and.to.contain([
          "showPastWeek",
          "showCoordinates",
          "validate",
        ],
      );
    });
  });
});
