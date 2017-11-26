const Code = require("code"),
      Lab  = require("lab"),

      lab  = exports.lab = Lab.script(),

      { expect }                             = Code,
      { suite, test, beforeEach, afterEach } = lab,

      FakeOperation                          = require("src/usecases/Operation");

suite(`Usecase :: Operation`, () => {
  let CustomOperation;

  beforeEach(() => {
    CustomOperation = class CustomOperation extends FakeOperation {
    };

    CustomOperation.setOutputs(["SUCCESS"]);
  });

  suite(`"on"`, () => {
    test("should NOT throw when using a valid output handler", async () => {
      // Conditions
      const operation = new CustomOperation();

      // Assertions
      expect(() => {
        operation.on(operation.outputs.SUCCESS, () => {
        });
      }).to.not.throw;
    });

    test("should throw when adding an invalid output handler", async () => {
      // Conditions
      const operation = new CustomOperation();

      // Assertions
      expect(() => {
        operation.on("INVALID", () => {
        });
      }).to.throw(Error, /Invalid output "INVALID" to operation CustomOperation/);

    });
  });
});
