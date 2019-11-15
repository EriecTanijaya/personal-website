module.exports = (req, res, next) => {
  let id = req.params.id;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    // it's an ObjectID
    next();
  } else {
    // nope
    res.status(500);
    const title = "WeekyDay Blog | what?!";
    res.render("error", { title });
  }
};
