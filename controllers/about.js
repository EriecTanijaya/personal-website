module.exports = (req, res) => {
  const title = "WeekyDay Blog | About";
  res.render("about", { title: title, auth: req.session.userId });
};
