module.exports = (req, res) => {
  if (req.session.userId) {
    const auth = req.session.userId;
    const title = "WeekyDay Blog | Create Post";
    return res.render("create", { title, auth });
  }

  res.redirect("/auth/login");
};
