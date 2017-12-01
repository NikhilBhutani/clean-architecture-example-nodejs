A Weather App Using "Clean Architecture"
========================================

Inspiration
-----------
This projected originated as a coding exercise requested by a company I was looking to join. During my job search, 
I discovered others were asking me to complete their coding exercise too. Because I didn't have the bandwidth to
complete a dozen coding exercises within a five day span, I decided to complete just this one and share it with the
others.

> Create a service that can display the past week's weather information, based on a location, and using a free account
 with Dark Sky Api (https://darksky.net/dev).

I chose this one mostly because it was the first one assigned and because it provided the greatest opportunity to
highlight my skills in areas that I felt strongest. This application is not intended to be used as a 'real' weather
service.

This exercise also provided the soap box for me to use in order to demonstrate that Javascript can be used to build
real enterprise products that follow concepts usually found in memory managed and static languages like Go/Golang, Java,
and .NET to name a few.

Highlights
----------   
- [X] Clean Architecture using Layers [_by uncle Bob_](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)
- [X] 12 Factor App [_more info_](https://12factor.net/)
- [X] Domain Driven Design [_DDD info_](https://en.wikipedia.org/wiki/Domain-driven_design)
- [X] Structs in Node.js [_more info_](https://en.wikipedia.org/wiki/Go_(programming_language)#Types)
- [X] Inversion of Control [_IoC_](https://en.wikipedia.org/wiki/Inversion_of_control)
- [X] Dependency Injection [_more info_](https://en.wikipedia.org/wiki/Dependency_injection) 
- [X] Separation of Concerns [_more info_](https://en.wikipedia.org/wiki/Single_responsibility_principle)
- [X] Test Driven Development [_TDD info_](https://en.wikipedia.org/wiki/Test-driven_development)
- [X] Interface Classes in Node.js [_more info_](https://en.wikipedia.org/wiki/Go_(programming_language)#Interface_system)
- [X] Private Members in Node.js [_more info_](https://en.wikipedia.org/wiki/Private_class_data_pattern#Sample_code)
- [X] Multi-stage Builds in Docker [_more info_](https://docs.docker.com/engine/userguide/eng-image/multistage-build/#use-multi-stage-builds)
- [X] Docker Compose
- [X] DocBlock [_more info_](http://usejsdoc.org/)
- [X] General use of ES6/7 in Node.js

________________________________________________________________________________________________________________________

Configuration Steps
-------------------

### Create `.env` File

#### Build Args
This project demonstrates how to use build args in Docker correctly without abusing them. Therefore, one must first
create a `.env` file and place it in the root of these code sources. Here is a list of each environment variables that
must be defined in the `.env` file along with some default values.

>```
>GOSU_GPG_KEY=B42F6819007F00F88E364FD4036A9C25BF357DD4
>GOSU_VERSION=1.10
>NODEJS_FULL_VERSION=8.9.1
>NPM_VERSION=5.5.1
>NPM_CONFIG_LOGLEVEL=error
>```

#### Docker Compose
I found that `docker-compose` behaves better with a couple of defaults when using this project. Be sure to add these
values to your `.env` file.

>```
>COMPOSE_HTTP_TIMEOUT=86400
>COMPOSE_FILE=docker-compose.local.yml
>```

#### Custom Deployment Name
When using `docker-compose` to deploy a container locally, use this variable to customize how the container names are
composed. Replace `<yourname>` with your actual name.

>```
>NAMED_DEPLOYMENT=<yourname>
>```

### Create a `local.env` File

#### Application Configs
This project uses environment variables to configure the behavior of the application. It follows the [_12 Factor App_](https://12factor.net/config)
recommendation to store configs in the environment. Here are the variables that are currently being used.

>```
>APP_WEATHER_DARK_SKY_TOKEN_KEY=<yourtoken>
>APP_WEATHER_DARK_SKY_WEATHER_API_URL=https://api.darksky.net/forecast/
>APP_WEATHER_GOOGLE_TOKEN_KEY=<yourtoken>
>APP_WEATHER_GOOGLE_GEOCODE_API_URL=https://maps.googleapis.com/maps/api/geocode/json
>APP_WEATHER_GOOGLE_TIMEZONE_API_URL=https://maps.googleapis.com/maps/api/timezone/json
>APP_WEATHER_EXPRESS_WEB_SERVER_PORT=3000
>```

### Create a `prod.env` File
This file needs to at least exist otherwise `docker-compose` will complain. It can be empty, but if you intend to use
this project's `docker-compose.prod.yml` file for production deployments, real values described in the `local.env`
file above will need to exist.  

### Verify Configs
Before moving on, it's a good idea to check sanity. Here's how to do that.

>```
>docker-compose config
>```

________________________________________________________________________________________________________________________

Tests
=====
Unit tests have been included with this project. Currently coverage is over 95%. Integration tests will need to be
added in the future to test the API endpoints.

### Running the tests

>```
>npm test
>```

________________________________________________________________________________________________________________________

Folder Structure Snapshot
=========================

>```
>├───src
>│   ├───entities
>│   │       Address.js
>│   │       Coordinates.js
>│   │       History.js
>│   │       Weather.js
>│   ├───externals
>│   │       DarkSky.js
>│   │       Environment.js
>│   │       Google.js
>│   ├───gateways
>│   │       Config.js
>│   │       Geocoder.js
>│   │       Timezone.js
>│   │       Weather.js
>│   ├───http
>│   │   │   Server.js
>│   │   │   createControllerRoutes.js
>│   │   │   router.js
>│   │   ├───controllers
>│   │   │       WeatherAddress.js
>│   │   └───presenters
>│   │           DailyWeather.js
>│   ├───usecases
>│   │      AddressWeatherHistory.js
>│   │       Operation.js
>│   │   Application.js
>│   │   container.js
>├───test
>│   ├───entities
>│   │       Address.spec.js
>│   │       Coordinates.spec.js
>│   │       History.spec.js
>│   │       Weather.spec.js
>│   ├───externals
>│   │       DarkSky.spec.js
>│   │       Google.spec.js
>│   ├───gateways
>│   │       Geocoder.spec.js
>│   │       Timezone.spec.js
>│   │       Weather.spec.js
>│   ├───http
>│   │   ├───controllers
>│   │   │       WeatherAddress.spec.js
>│   │   └───presenters
>│   │           DailyWeather.spec.js
>│   └───usecases
>│           AddressWeatherHistory.spec.js
>│           Operation.spec.js
>├───scripts
>│       entrypoint.sh
>│   .gitignore
>│   .dockerignore
>│   Dockerfile
>│   README.md
>│   docker-compose.base.yml
>│   docker-compose.local.yml
>│   docker-compose.prod.yml
>│   index.js
>│   package.json
>│   .env
>│   prod.env
>│   local.env
>```

TODO
====
- [ ] Add a Software Architecture Diagram [_Structurizr_](https://structurizr.com/)
- [ ] Add some HTML to demonstrate frontend competency
