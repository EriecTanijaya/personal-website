module.exports = (req, res) => {
  const title = "WeekyDay Blog | Login";
  res.render("login", { errors: req.flash("loginErrors"), title });
};
