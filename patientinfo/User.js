var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
 UserName: String,
 Password: String
});
mongoose.model('users', UserSchema);

module.exports = mongoose.model('users');