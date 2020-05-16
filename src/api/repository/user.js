const db = require("../models");
const cacheService = require("../services/cacheService");
const md5 = require('md5');

const getAllWithCache = () => {
  return cacheService.genericCache(_getAll, 60);
}

const getByIdWithCache = (id) => {
  return cacheService.genericCache(_getById, 60, id);
}

const _getAll = async () => {
  try{
    const response = await db.Users.findAll();
    return response;
  }catch(error){
    throw Error(error);
  }
};

const _getById = async (id) => {
  try {
    const response = await db.Users.findAll({
      where: {
        id: id
      }
    });
    return response;
  }catch(error){
    throw Error(error);
  }
};

const create = async (name, email, password) => {
  var errors = [];
  if (!password) {
    errors.push("No password specified");
  }
  if (!email) {
    errors.push("No email specified");
  }
  if (errors.length) {
    throw Error(errors);
  }
  var data = {
    name: name,
    email: email,
    password: md5(password),
  };

  try{
    const response = await db.Users.create(data);
    return response;
  }catch(error){
    throw Error('Could not create user');
  }
};

const update = async (id, name, email, password) => {
  var data = {
    name: name,
    email: email,
    password: password ? md5(password) : undefined,
  };

  try {
    const response = await db.Users.update(data, {
      where: {
        id: id,
      },
    });
    return response;
  }catch (error) {
    throw Error('Could not update user');
  }
};

const remove = async (id) => {
  try{
    const response = db.Users.destroy({where: {id: id}})
    return response;
  }catch(error){
    throw Error('Could not delete user');
  }
};

module.exports = {
  getAllWithCache: getAllWithCache,
  getByIdWithCache: getByIdWithCache,
  create: create,
  update: update,
  remove: remove,
};
