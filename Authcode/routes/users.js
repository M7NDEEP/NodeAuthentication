const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/practice1");

const userSchema = new mongoose.Schema({
  username: String,
  secret:String,
  // ... any other fields you need
});

// Add Passport Local Mongoose plugin to your schema
userSchema.plugin(passportLocalMongoose);

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
