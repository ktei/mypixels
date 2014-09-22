var index = require('./controllers/index');
var account = require('./controllers/account');

exports.setup = function(app) {
  app.use('/', index);
  app.use('/account', account);
}