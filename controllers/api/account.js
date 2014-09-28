var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../../models/user');

router.post('/login', passport.authenticate('local'), function (req, res) {
  res.json({success: true});
});

router.post('/register', function (req, res) {
  User.register(new User({ username: req.body.username, email: req.body.email }), 
    req.body.password, function(err, user) {
      if (err) {
        return res.jsonFail(err);
      }
      passport.authenticate('local')(req, res, function() {
        return res.jsonSuccess();
      });
    }
  );
});

router.get('/check_username', function (req, res) {
  User.findOne({username: req.query.username}, function (err, user) {
    if (err) {
      res.send(true);
    }
    res.send(!user);
  });
});

router.get('/check_email', function (req, res) {
  User.findOne({email: req.query.email}, function (err, user) {
    if (err) {
      res.send(true);
    }
    res.send(!user);
  });
});

module.exports = router;