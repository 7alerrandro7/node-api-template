const express = require("express");
const app = express();
const settings = require("./settings/settings");
const bodyParser = require("body-parser");
const logger = require("./infra/logger");
const auth = require("./config/auth.config");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Authentication
if (settings.auth) {
  auth(app);
}

// define all routes
require("./api/routes/user")(settings.server.context, app);

app.get("/", (req, res, next) => {
  res.json({"message":"Welcome to node-api"})
});

app.listen(settings.server.port || 3030, () => {
  logger.info("server is running with success", { port: settings.server.port });
});
