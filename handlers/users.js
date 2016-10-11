// var mongoose = require('../libs/mongoose'); todo
var modelName = 'users';

// load CRUD methods
var handlers = require('../libs/crudHandlers')(modelName);

module.exports = handlers;