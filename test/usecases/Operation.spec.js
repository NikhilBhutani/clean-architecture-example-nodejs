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

  suite(`static public method`, () => {
    suite(`getPrivate`, () => {
      test(`should return undefined when getting from never defined private var`, async () => {
        // Conditions
        const fakeOperation = new FakeOperation();
        const fakeResponse  = FakeOperation.getPrivate("fakeVarName", this);

        // Assertions
        expect(fakeOperation).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeOperation);
        expect(fakeResponse).
          and.to.be.undefined();
      });

      test(`should return correct value when getting from a previously defined private var`, async () => {
        // Conditions
        FakeOperation.setPrivate("fakeVarName", "fakeValue", this);
        const fakeOperation = new FakeOperation();
        const fakeResponse  = FakeOperation.getPrivate("fakeVarName", this);

        // Assertions
        expect(fakeOperation).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeOperation);
        expect(fakeResponse).
          and.not.to.be.undefined().
          and.to.equal("fakeValue");
      });
    });

    suite(`setPrivate`, () => {
      test(`should return correct value when getting from a previously defined private var`, async () => {
        // Conditions
        FakeOperation.setPrivate("fakeVarName", "fakeValue", this);
        const fakeOperation = new FakeOperation();
        const fakeResponse  = FakeOperation.getPrivate("fakeVarName", this);

        // Assertions
        expect(fakeOperation).
          and.not.to.be.undefined().
          and.to.be.instanceof(FakeOperation);
        expect(fakeResponse).
          and.not.to.be.undefined().
          and.to.equal("fakeValue");
      });
    });
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
      }).to.throw(Error, `Invalid output "INVALID" to operation CustomOperation.`);

    });
  });
});
