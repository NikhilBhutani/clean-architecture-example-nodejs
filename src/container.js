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

// Compose the dependency cradle
container.
  register({
    // System
    configGateway: asClass(ConfigGateway, { lifetime: Lifetime.SINGLETON }),
    environment:   asClass(Environment, { lifetime: Lifetime.SINGLETON }),
    server:        asClass(Server, { lifetime: Lifetime.SINGLETON }),
    app:           asClass(Application, { lifetime: Lifetime.SINGLETON }),
    router:        asFunction(router, { lifetime: Lifetime.SINGLETON }),

    // Middlewares
    containerMiddleware: asValue(scopePerRequest(container)),

    // Operations
    addressWeatherHistory: asClass(AddressWeatherHistoryInteractor),

    // Presenters
    dailyWeatherPresenter: asClass(DailyWeatherPresenter),

    // External APIs
    weatherApi:  asClass(WeatherApi),
    geocoderApi: asClass(GeocoderApi),
    timezoneApi: asClass(TimezoneApi),

    // Gateways
    geocoderGateway: asClass(GeocoderGateway),
    timezoneGateway: asClass(TimezoneGateway),
    weatherGateway:  asClass(WeatherGateway),
  });

// Compose dependencies post cradle
container.
  register({
    config: asValue(container.cradle.configGateway.compiled),
  });

module.exports = container;
