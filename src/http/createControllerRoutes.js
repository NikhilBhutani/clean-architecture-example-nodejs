/**
 * @module ./src/http/createControllerRoutes
 */

const path = require("path");

module.exports = function createControllerRoutes (controllerUri) {
  const
    controllerPath = path.resolve("src/http/controllers", controllerUri),
    {
      [`${controllerUri}Controller`]: Controller,
    }              = require(controllerPath);

  return Controller.router;
};
