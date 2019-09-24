const User = require('../database/models/User');

module.exports = (req, res, next) => {
  User.findById(req.session.userId, (error, user) => {
    if (error || !user){
      console.log(req.session.userId);
      return res.redirect('/');
    }
    
    next();
  })
}