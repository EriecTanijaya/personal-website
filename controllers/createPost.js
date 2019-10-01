module.exports = (req, res) => {
  if (req.session.userId){
    const title = 'WeekyDay Blog | Create Post';
    return res.render('create', {title});
  }
  
  res.redirect('/auth/login');
};