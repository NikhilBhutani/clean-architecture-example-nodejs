const Code = require("code"),
      Lab  = require("lab"),

      lab  = exports.lab = Lab.script(),

      { expect }                             = Code,
      { suite, test, beforeEach, afterEach } = lab,

      fakeLongLat                            = require("src/entities/LongLat");

suite(`Entity :: LongLat`, () => {
  suite(`class`, () => {
    test(`should be defined when instantiated with an empty Object`, async () => {
      // Conditions
      const fakeLongLatEntity = new fakeLongLat({});

      // Assertions
      expect(fakeLongLatEntity).
        and.not.to.be.undefined().
        and.to.be.instanceof(fakeLongLat);
    });
  });
});
