/**
 * @module ./src/http/router
 */

const
  { Router } = require("express"),
  bodyParser = require("body-parser"),

  controller = require("./createControllerRoutes");

module.exports = ({ containerMiddleware }) => {
  const
    router    = Router(),
    apiRouter = Router();

  // Middleware inits
  apiRouter.
    use(bodyParser.json()).
    use(containerMiddleware);

  // List of routes if more than one
  apiRouter.use("/weather/address", controller("WeatherAddress"));

  // Setup an API endpoint
  router.use("/api", apiRouter);

  return router;
};
