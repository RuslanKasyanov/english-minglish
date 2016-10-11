var error = require('./error');
var mongoose = require('mongoose');
var db = require('./mongoose');

module.exports = function (modelName) {

    // list of entities
    var list = function* (next) {
        if ('GET' != this.method) {
            return yield next;
        }
        this.body = yield db.model(modelName).find({});
    };

    // get one entities
    var get = function* (next) {
        if ('GET' != this.method) {
            return yield next;
        }
        //todo check id
        var id = this.params.id;
        try {
            var entity = yield db.model(modelName).findById(id);
            if (!entity || entity.length === 0) {
                this.throw(modelName + ' with id = ' + id + ' was not found');
            }
            this.body = entity;
        } catch (e){
            error.redirect(this, e.message, e.error);
        }
    };

    // create entities
    var create = function* (next) {
        if ('POST' != this.method) {
            return yield next;
        }
        try {
            var entity = this.request.body;
            var created = yield db.model(modelName).create(entity);
            if (!created) {
                this.throw('The ' + modelName + ' couldn\'t be added.');
            }
            this.body = 'Done!';
        } catch (e){
            error.redirect(this, e.message, e.error);
        }
    };

    // update entities
    var update = function* (next) {
        if('PUT' != this.method){
            return yield next;
        }
        var data = this.request.body;
        var id = this.params.id;
        try {
            var entity = yield db.model(modelName).findById(id);

            if (entity.length === 0) {
                this.throw(modelName + ' with id = ' + id + ' was not found');
            }
            var updated = db.model(modelName).update({_id: id}, {$set: data});

            if (!updated) {
                this.throw('Unable to update.');
            }
            this.body = 'Done';
        } catch (e){
            error.redirect(this, e.message, e.error);
        }
    };

    // remove entities
    var remove = function* (next) {
        if('DELETE' != this.method){
            return yield next;
        }

        var id = this.params.id;
        try {
            var entity = yield db.model(modelName).findById(id);

            if (entity.length === 0) {
                this.throw(modelName + ' with id = ' + id + ' was not found');
            }
            var removed = db.model(modelName).remove({_id: id});

            if (!removed) {
                this.throw('Unable to delete.');
            }
            this.body = 'Done!';
        } catch (e){
            error.redirect(this, e.message, e.error);
        }
    };

    return {
        list: list,
        get: get,
        create: create,
        update: update,
        remove: remove
    }
};