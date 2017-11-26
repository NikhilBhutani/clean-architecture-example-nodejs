/**
 * @module ./src/usecases/Operation
 */

const
  EventEmitter = require("events"),
  define       = Object.defineProperty,

  // Private Map of Members
  privateMap   = new Map();

class Operation extends EventEmitter {
  /**
   * A helper that retrieves the value for a privately stored property.
   *
   * @static
   * @param   {String}    privateVar - The name of the private variable
   * @param   {Operation} ctx        - Context
   * @private
   * @returns {*}                    - The value assigned to the private variable.
   */
  static getPrivate (privateVar, ctx) {
    if (privateMap.has(ctx)) {
      return privateMap.get(ctx).get(Symbol.for(`${privateVar}Private`));
    }
  }

  /**
   * A helper that assigns a value to a privately stored property.
   *
   * @static
   * @param   {String}    privateVar - The name of the private variable
   * @param   {*}         value      - The value to assign to the private variable.
   * @param   {Operation} ctx        - Context
   * @private
   */
  static setPrivate (privateVar, value, ctx) {
    if (!privateMap.has(ctx)) {
      privateMap.set(ctx, new Map());
    }
    privateMap.get(ctx).set(Symbol.for(`${privateVar}Private`), value);
  }

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
