const User = require("../database/models/User");

module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    console.log("user created", user);
    if (error) {
      var registrationErrors = [];

      if (error.code === 11000) {
        if (error.errmsg.includes('username')){
          registrationErrors.push("Username has already been taken");
        } else if (error.errmsg.includes('email')){
          registrationErrors.push("Email has already been registered");
          const title = "WeekyDay Blog | Register";
          return res.render("register", { registered: true, errors: registrationErrors, title });
        } else {
          registrationErrors.push("Unknown error");
        }
      } else {
        registrationErrors = Object.keys(error.errors).map(
          key => error.errors[key].message
        );
      }

      req.flash("registrationErrors", registrationErrors);
      return res.redirect("/auth/register");
    }
    res.redirect("/auth/login");
  });
};
