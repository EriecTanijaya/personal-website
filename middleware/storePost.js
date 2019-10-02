module.exports = (req, res, next) => {
  
  req.body.username = req.session.username;
  
  if (
    !req.files.image ||
    !req.body.username ||
    !req.body.title ||
    !req.body.description ||
    !req.body.content
  ) {
    return res.redirect("/posts/new");
  }

  next();
};
