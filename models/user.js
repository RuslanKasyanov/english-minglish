var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Schema of user representation.
 * Fields specification:
 * <ul type="1">
 *     <li><b>login</b>: TODO </li>
 *     <li><b>password</b>: TODO </li>
 *     <li><b>firstName</b>: TODO </li>
 *     <li><b>secondName</b>: TODO </li>
 *     <li><b>age</b>: TODO </li>
 *     <li><b>birthday</b>: TODO </li>
 *     <li><b>level</b>: level of knowledge
 *         <ul>
 *             <li>beginner - 0</li>
 *             <li>elementary - 1</li>
 *             <li>pre-intermediate - 2</li>
 *             <li>intermediate - 3</li>
 *             <li>upper-intermediate - 4</li>
 *             <li>advance - 5</li>
 *         </ul>
 *     </li>
 * </ul>
 */
var UserSchema = Schema({
    login: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
    age: {type: Number},
    birthday: {type: Date},
    level: {type: Number}
});

/** Here you can create a static methods to simplify access to data */
/**
 * find user by login
 * @param login
 * @param cb it is callback todo i think it's temporary
 */
UserSchema.statics.findByLogin = function (login, cb) {
    this.find({login: new RegExp(login, 'i')}, cb);
};

/**
 * find user by id
 * @param id
 * @param cb it is callback todo i think it's temporary
 */
UserSchema.statics.findById = function (id, cb) {
    this.find({_id: id}, cb);
};

/**
 * Create mongoose model by schema
 * <pre>
 *     Notice!
 *     If "users" collection is't in the DB,
 *     it will created automatically.
 *     Also name of collection will become "users".
 *     Example:
 *          name of model "User" + "s" => "users"
 *          name of model "Document" + "s" => "documents"
 * </pre>
 */
User = mongoose.model('User', UserSchema);

exports.userModel = User;
