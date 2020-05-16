const logger = require("../../infra/logger");
const userRepository = require("../repository/user");
const sanitizeService = require("../services/sanitize");

const getAll = async (req, res) => {
  const hrstart = process.hrtime();

  try {
    const response = await userRepository.getAllWithCache();
    const hrend = process.hrtime(hrstart);

    logger.info("new getAll request", {elapsedTime: hrend[1] / 1000000});
    res.send(response);
  } catch (e) {
    logger.error("database error occurred", {error: `${e}`,});
    res.status(500).send({ error: 'Could not get all users' });
  }
};

const getById = async (req, res) => {
  const hrstart = process.hrtime();
  let id = req.params.id;

  if (sanitizeService.checkIfEmpty(id)) {
    res.status(403).send("Please send id");
    return;
  }

  try {
    const response = await userRepository.getByIdWithCache(id);
    const hrend = process.hrtime(hrstart);

    logger.info("new find event by name request", {
      id: id,
      elapsedTime: hrend[1] / 1000000,
    });
    res.send(response);
  } catch (e) {
    logger.error("database error occurred", {
      error: `${e}`,
      id: id,
    });
    res.status(500).send({ error: 'Could not get user' });
  }
};

const create = async (req, res) => {
  const hrstart = process.hrtime();
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (sanitizeService.checkIfEmpty(name) || sanitizeService.checkIfEmpty(email) || sanitizeService.checkIfEmpty(password)) {
    const hrend = process.hrtime(hrstart);
    logger.info("Some attributes missing - Creating User", {
      name: name,
      email: email,
      password: password,
      elapsedTime: hrend[1] / 1000000,
    });
    res.status(403).send("Please send name, email and password on body");
    return;
  }

  try {
    const response = await userRepository.create(name, email, password);
    const hrend = process.hrtime(hrstart);

    logger.info("User created", {
      name: name,
      email: email,
      password: password,
      elapsedTime: hrend[1] / 1000000,
    });
    res.send(response);
  } catch (e) {
    logger.error("Error trying create user", {
      error: `${e}`,
      name: name,
      email: email,
      password: password,
    });
    res.status(500).send('Could not create user');
  }
};

const update = async (req, res) => {
  const hrstart = process.hrtime();
  const id = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (sanitizeService.checkIfEmpty(id) || sanitizeService.checkIfEmpty(name) || sanitizeService.checkIfEmpty(email) || sanitizeService.checkIfEmpty(password)) {
    res.status(403).send("Please send id on params and name, email and password on body");
    return;
  }

  try {
    const response = await userRepository.update(id, name, email, password);
    const hrend = process.hrtime(hrstart);

    logger.info("new find event by name request", {
      id: id,
      name: name,
      email: email,
      password: password,
      elapsedTime: hrend[1] / 1000000,
    });
    res.status(200).send({message: "User updated"});
  } catch (e) {
    logger.error("database error occurred", {
      error: `${e}`,
      id: id,
      name: name,
      email: email,
      password: password,
    });
    res.status(500).send(`Could not update the user with id ${id}`);
  }
};

const remove = async (req, res) => {
  const hrstart = process.hrtime();
  const id = req.params.id;

  if (sanitizeService.checkIfEmpty(id)) {
    res.status(403).send("Please send id on params");
    return;
  }

  try {
    const response = await userRepository.remove(id);
    const hrend = process.hrtime(hrstart);

    logger.info("User removed", {
      id: id,
      elapsedTime: hrend[1] / 1000000,
    });
    res.status(200).send({message: `User with id ${id} was removed succesfully`});
  } catch (e) {
    logger.error("database error occurred", {
      error: `${e}`,
      id: id,
    });
    res.status(500).send({ error: `${e}` });
  }
};

module.exports = {
  getAll: getAll,
  getById: getById,
  create: create,
  update: update,
  remove: remove,
};
