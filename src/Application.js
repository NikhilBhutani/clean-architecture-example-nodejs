/**
 * @module ./src/Application
 */

class Application {
  constructor ({ server }) {
    this.server = server;
  }

  /**
   * An application's logical startup sequence.
   *
   * @returns {Promise.<void>}
   */
  async start () {
    await this.server.start();
  }
}

module.exports = Application;
