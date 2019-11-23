module.exports = (req, res, next) => {
  req.body.username = req.session.username;
  
  if (!req.body.username || !req.body.content) {
    return res.redirect("/posts/" + req.params.id);
  }

  next();
};
