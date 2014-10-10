var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/login', function (req, res) {
  res.render('account/login');
});

router.post('/login', function (req, res) {
  passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/account/login',
    failureFlash: true ,
    failureFlash: 'Invalid username or password.'
  })(req, res);
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/register', function (req, res) {
  res.render('account/register');
});

module.exports = router;