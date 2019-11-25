const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
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

///https://mongoosejs.com/docs/middleware.html
// Mongoose will call this middleware function, because this script adds
// the middleware to the schema before compiling the model.
UserSchema.pre("save", function(next) {
  const user = this;
  console.log("this is pre('save')");
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      console.log("hash nya", hash);
      console.log("user password", user.password);
      next();
    });
  });
  
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
