/**
 * Define os endpoint`s de api position
 * @module route-position
 * @param app
 * @param context
 */
module.exports = (context, app) => {
  const controller = require("../controllers/user");

  app.route(`${context}/api/users`).get(controller.getAll);
  app.route(`${context}/api/user/:id`).get(controller.getById);
  app.route(`${context}/api/user/`).post(controller.create);
  app.route(`${context}/api/user/:id`).patch(controller.update);
  app.route(`${context}/api/user/:id`).delete(controller.remove);

};
