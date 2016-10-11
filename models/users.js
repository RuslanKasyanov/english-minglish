var path = require('path');

module.exports = function(mongoose){
    var Schema = new mongoose.Schema({
        login: {type: String, required: true},
        password: {type: String, required: true},
        firstName: {type: String, required: true},
        secondName: {type: String, required: true},
        age: {type: Number},
        birthday: {type: Date},
        level: {type: Number}
    });

    return mongoose.model(path.basename(module.filename, '.js'), Schema);
};