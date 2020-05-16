const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const _ = require("lodash");
const settings = require("../../settings/settings");

const db = {};
const sequelize = new Sequelize(
  settings.database.databaseName,
  settings.database.user,
  settings.database.password,
  {
    host: settings.database.host,
    dialect: settings.database.dialect,
    storage: settings.database.storage,
    dialectOptions: {
      options: {
        requestTimeout: settings.database.requestTimeout,
        encrypt: settings.database.encrypt,
      },
      pool: {
        max: settings.database.poolMaxConnection,
        min: settings.database.poolMinConnection,
        idle: settings.database.poolIdle,
      },
    },
    logging: false,
  }
);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

if(settings.database.sync){
  sequelize.sync({force: settings.database.force});
}

sequelize.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
