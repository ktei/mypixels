var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  email: { type: String, required: 'Email cannot be blank' }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);