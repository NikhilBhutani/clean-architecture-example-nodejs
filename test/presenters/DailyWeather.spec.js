const Code = require("code"),
      Lab  = require("lab"),

      lab  = exports.lab = Lab.script(),

      { expect }                             = Code,
      { suite, test, beforeEach, afterEach } = lab,

      FakeDefaultDailyWeatherPresenter       = require("src/presenters/DailyWeather"),

      {
        WeatherHistoryPresenterInterface: FakeDefaultWeatherHistoryPresenterInterface,
      }                                      = require("src/usecases/AddressWeatherHistory");

suite(`Presenter :: DailyWeather`, () => {
  let fakeValidWeatherAttrs;
  let fakeValidToOutputPortParams;

  beforeEach(async () => {
    fakeValidWeatherAttrs = {
      dateTime:         42,
      daytimeHighTemp:  44,
      overnightLowTemp: -44,
    };

    fakeValidToOutputPortParams = {
      observationPoints: [fakeValidWeatherAttrs],
      isErrorFree:       true,
    };
  });

  afterEach(async () => {
    fakeValidWeatherAttrs       = {};
    fakeValidToOutputPortParams = {};
  });

  suite(`class`, () => {
    test(`should be defined`, async () => {
      // Conditions
      const fakeDefaultDailyWeatherPresenter = new FakeDefaultDailyWeatherPresenter();

      // Assertions
      expect(fakeDefaultDailyWeatherPresenter).
        and.not.to.be.undefined().
        and.to.be.instanceof(FakeDefaultDailyWeatherPresenter);
    });

    test(`interface being implemented should be defined`, async () => {
      // Conditions
      const fakeDefaultWeatherHistoryInterface = new FakeDefaultWeatherHistoryPresenterInterface();

      // Assertions
      expect(fakeDefaultWeatherHistoryInterface).
        and.not.to.be.undefined();
    });
  });

  suite(`method`, () => {
    suite(`toOutputPort`, () => {
      test(`should be defined`, async () => {
        // Conditions
        const fakeDefaultDailyWeatherPresenter = new FakeDefaultDailyWeatherPresenter();

        // Assertions
        expect(fakeDefaultDailyWeatherPresenter).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultDailyWeatherPresenter);
        expect(fakeDefaultDailyWeatherPresenter.toOutputPort).
          and.not.to.be.undefined().
          and.to.be.a.function();
      });

      test(`should return a valid object`, async () => {
        // Conditions
        const fakeDefaultDailyWeatherPresenter = new FakeDefaultDailyWeatherPresenter();
        const fakeResponse                     = fakeDefaultDailyWeatherPresenter.toOutputPort(fakeValidToOutputPortParams);

        // Assertions
        expect(fakeDefaultDailyWeatherPresenter).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeDefaultDailyWeatherPresenter);
        expect(fakeResponse).
          and.to.be.and.object().
          and.includes([
            "data",
            "success",
          ],
        );
        expect(fakeResponse.data).
          and.to.be.an.array().
          and.length(1);
        expect(fakeResponse.success).
          and.to.be.a.boolean().
          and.to.be.true();
      });
    });
  });
});
