/**
 * @module ./src/container
 */

const
  { scopePerRequest }                 = require("awilix-express"),
  {
    createContainer,
    Lifetime,
    asClass,
    asFunction,
    asValue,
  }                                   = require("awilix"),
  container                           = createContainer(),

  { AddressWeatherHistoryInteractor } = require("./usecases/AddressWeatherHistory"),

  DailyWeatherPresenter               = require("./http/presenters/DailyWeather"),

  { ConfigGateway }                   = require("./gateways/Config"),
  { GeocoderGateway }                 = require("./gateways/Geocoder"),
  { TimezoneGateway }                 = require("./gateways/Timezone"),
  { WeatherGateway }                  = require("./gateways/Weather"),

  Application                         = require("./Application"),
  Server                              = require("./http/Server"),
  router                              = require("./http/router"),

  Environment                         = require("./externals/Environment"),
  { WeatherApi }                      = require("./externals/DarkSky"),
  {
    GeocoderApi,
    TimezoneApi,
  }                                   = require("./externals/Google");

container.
  // System
  register({
    configGateway: asClass(ConfigGateway, { lifetime: Lifetime.SINGLETON }),
    environment:   asClass(Environment, { lifetime: Lifetime.SINGLETON }),
    server:        asClass(Server, { lifetime: Lifetime.SINGLETON }),
    app:           asClass(Application, { lifetime: Lifetime.SINGLETON }),
  }).
  register({
    router: asFunction(router, { lifetime: Lifetime.SINGLETON }),
  }).
  register({
    config: asValue({ config: container.resolve("configGateway").compiled }),
  }).

  // Middlewares
  register({
    containerMiddleware: asValue(scopePerRequest(container)),
  }).

  // Operations
  register({
    addressWeatherHistory: asClass(AddressWeatherHistoryInteractor),
  }).

  // Presenters
  register({
    dailyWeatherPresenter: asClass(DailyWeatherPresenter),
  }).

  // External APIs
  register({
    weatherApi:  asClass(WeatherApi),
    geocoderApi: asClass(GeocoderApi),
    timezoneApi: asClass(TimezoneApi),
  }).

  // Gateways
  register({
    geocoderGateway: asClass(GeocoderGateway),
    timezoneGateway: asClass(TimezoneGateway),
    weatherGateway:  asClass(WeatherGateway),
  });

module.exports = container;
