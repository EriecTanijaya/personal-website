module.exports = (req, res) => {
  const title = "WeekyDay Blog | Register";
  res.render("register", { errors: req.flash("registrationErrors"), title });
};
