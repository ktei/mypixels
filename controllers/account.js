var express = require('express');
var router = express.Router();

router.get('/login', function(req, res) {
  res.render('account/login');
});

module.exports = router;