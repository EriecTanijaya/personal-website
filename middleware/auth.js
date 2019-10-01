const User = require('../database/models/User');

module.exports = (req, res, next) => {
  console.log(req.session);
  User.findById(req.session.userId, (error, user) => {
    if (error || !user){
      return res.redirect('/');
    }
    
    next();
  })
}