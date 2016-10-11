var config = require('./config');
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var async = require('async');

mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongoose:uri'));

var db = mongoose.connect;
var models = {};

//todo handel error db!

/**
 * init all models into array
 *
 * @param modelsDirectory
 */
module.exports.init = function (modelsDirectory) {
    var schemaList = fs.readdirSync(modelsDirectory);
    async.eachSeries(schemaList, function (item, cb) {
        var modelName = path.basename(item, '.js');
        models[modelName] = require(path.join(modelsDirectory, modelName))(mongoose);
        cb();
    });
};

/**
 * get models by name
 *
 * @param modelName
 * @returns {*}
 */
module.exports.model = function(modelName){
    var name = modelName.toLowerCase();
    if (typeof models[name] == "undefined") {
        throw "Model '" + name + "' is not exist";
    }
    return models[name];
};