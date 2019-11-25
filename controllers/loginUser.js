const bcrypt = require("bcryptjs");
const User = require("../database/models/User");

module.exports = (req, res) => {
  const { email, password } = req.body;
  const loginErrors = [];
  // try to find the user
  User.findOne(
    {
      email
    },
    (error, user) => {
      if (user) {
        // sudah ketemu emailnya
        // compare passwords. same or not
        bcrypt.compare(password, user.password, (error, same) => {
          if (same) {
            //password di db sama dengan password user input
            // store user session.
            req.session.userId = user._id;
            req.session.username = user.username;
            req.session.save(function(err) {
              // session saved
              res.redirect("/");
            });
          } else {
            //salah password
            console.log("user didb", user);
            console.log("password entered", password);
            loginErrors.push("Sum ting wong in your password");
            req.flash("loginErrors", loginErrors);
            res.redirect("/auth/login");
          }
        });
      } else {
        //salah email
        loginErrors.push("Sum ting wong in your email");
        const title = "WeekyDay Blog | Login";
        return res.render("login", { needRegister: true, errors: loginErrors, title });
      }
    }
  );
};
