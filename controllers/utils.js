var express = require('express');
var router = express.Router();

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) { 
      return next(); 
    }
    res.redirect('/account/login');
  }
}