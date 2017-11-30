/**
 * @module ./index
 */

const
  container = require("./src/container"),

  app       = container.resolve("app");

app.
  start().
  catch(error => {
    console.log(error);
    process.exit();
  });
