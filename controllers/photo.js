var express = require('express');
var router = express.Router();
var passport = require('passport');
var utils = require('./utils');

router.get('/upload', utils.ensureAuthenticated, function(req, res) {
  res.render('photo/upload');  
});

module.exports = router;