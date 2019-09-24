const crypto = require('crypto');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function(next) {
  const user = this;
  
  crypto.pbkdf2(user.password, 'salt',  100000, 512, 'sha512', function(error, encrypted) {
    user.password = encrypted;
    next();
  })
});

module.exports = mongoose.model('User', UserSchema);