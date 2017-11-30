/**
 * @module ./src/http/controllers/WeatherAddress
 */

const
  { Router } = require("express"),
  { inject } = require("awilix-express");

/**
 * @interface
 */
class AddressInputInterface {
  async composePreviousDaily ({ streetNumber, streetName, city, state, zipCode }) {
  }

  async getCoordinates ({ streetNumber, streetName, city, state, zipCode }) {
  }

  validateAddress ({ streetNumber, streetName, city, state, zipCode }) {
  }
}

const WeatherAddressController = {
  get router () {
    const router = Router();

    router.use(inject("dailyWeatherPresenter"));
    // router.use(inject("coordinatesPresenter"));
    // router.use(inject("validityPresenter"));

    router.post("/week/past", inject("addressWeatherHistory"), this.showPastWeek);
    router.post("/coordinates", inject("addressWeatherHistory"), this.showCoordinates);
    router.post("/validate", inject("addressWeatherHistory"), this.validate);

    return router;
  },

  showPastWeek (req, res, next) {
    const
      {
        streetNumber,
        streetName,
        city,
        state,
        zipCode,
      } = req.body,
      {
        addressWeatherHistory,
        dailyWeatherPresenter,
      } = req,
      {
        DAILY_SUCCESS,
        VALIDATION_ERROR,
        ERROR,
      } = addressWeatherHistory.outputs;

    addressWeatherHistory.on(DAILY_SUCCESS, weatherHistory => {
      res.json(
        dailyWeatherPresenter.toOutputPort(weatherHistory),
      );
    }).on(VALIDATION_ERROR, errors => {
      res.json(errors);
    }).on(ERROR, next);

    addressWeatherHistory.composePreviousDaily({ streetNumber, streetName, city, state, zipCode });
  },

  showCoordinates (req, res, next) {
    const
      {
        streetNumber,
        streetName,
        city,
        state,
        zipCode,
      } = req.body,
      {
        addressWeatherHistory,
        coordinatesPresenter,
      } = req,
      {
        COORDINATES_SUCCESS,
        VALIDATION_ERROR,
        ERROR,
      } = addressWeatherHistory.outputs;

    addressWeatherHistory.on(COORDINATES_SUCCESS, coordinates => {
      res.json(
        coordinates.map(
          // TODO: Create a presenter for coordinates
          coordinatesPresenter.toOutputPort,
        ),
      );
    }).on(VALIDATION_ERROR, errors => {
      res.json(errors);
    }).on(ERROR, next);

    addressWeatherHistory.getCoordinates({ streetNumber, streetName, city, state, zipCode });
  },

  validate (req, res, next) {
    const
      {
        streetNumber,
        streetName,
        city,
        state,
        zipCode,
      } = req.body,
      {
        addressWeatherHistory,
        validityPresenter,
      } = req,
      {
        SUCCESS,
        VALIDATION_ERROR,
        ERROR,
      } = addressWeatherHistory.outputs;

    addressWeatherHistory.on(SUCCESS, isValid => {
      res.json(
        isValid.map(
          validityPresenter.toOutputPort,
        ),
      );
    }).on(VALIDATION_ERROR, errors => {
      res.json(errors);
    }).on(ERROR, next);

    addressWeatherHistory.validateAddress({ streetNumber, streetName, city, state, zipCode });
  },
};

module.exports = {
  AddressInputInterface,
  WeatherAddressController,
};
