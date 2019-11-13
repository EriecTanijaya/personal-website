const User = require("../database/models/User");

module.exports = (req, res, next) => {
  User.findById(req.session.userId, (error, user) => {
    if (error || !user) {
      //show error
      res.status(403);
      const title = "WeekyDay Blog | No No No";
      return res.render("forbidden", { title });
      // return res.redirect("/");
    }

    next();
  });
};
