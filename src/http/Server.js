/**
 * @module ./src/http/Server
 */

const
  express = require("express");

class Server {
  constructor ({ config, router }) {
    this.expressPort = config.apiListenPort;
    this.express     = express();

    this.express.use(router);
  }

  /**
   * Fires up a web server that listens for http requests.
   *
   * @returns {Promise}
   */
  start () {
    return new Promise(resolve => {
      const
        http = this.express.
                    listen(this.expressPort, () => {
                      const
                        { port } = http.address();

                      console.log(`[p ${process.pid}] Listening at port ${port}`);

                      resolve();
                    });
    });
  }
}

module.exports = Server;
