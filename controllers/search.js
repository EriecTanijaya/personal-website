module.exports = (req, res) => {
  const title = "WeekyDay Blog | Search";
  res.render("search", { title: title, auth: req.session.userId });
};
