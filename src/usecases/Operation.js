/**
 * @module ./src/usecases/Operation
 */

const
  EventEmitter = require("events"),
  define       = Object.defineProperty;

class Operation extends EventEmitter {
  /**
   * Defines a valid event name.
   *
   * @param {String} outputs
   */
  static setOutputs (outputs) {
    define(this.prototype, "outputs", {
      value: createOutputs(outputs),
    });
  }

  /**
   * Adds a listener.
   *
   * @param output
   * @param handler
   */
  on (output, handler) {
    if (this.outputs[output]) {
      return this.addListener(output, handler);
    }

    throw new Error(`Invalid output "${output}" to operation ${this.constructor.name}.`);
  }
}

const createOutputs = (outputsArray) => {
  return outputsArray.reduce((obj, output) => {
    obj[output] = output;
    return obj;
  }, Object.create(null));
};

module.exports = Operation;
