var express = require('express');
var router = express.Router();

router.get('/login', function (req, res) {
  res.render('account/login');
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/register', function (req, res) {
  res.render('account/register');
});

module.exports = router;