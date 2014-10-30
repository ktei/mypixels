var index = require('./controllers/index');
var account = require('./controllers/account');
var photo = require('./controllers/photo');
var accountApi = require('./controllers/api/account');

exports.setup = function(app) {
  app.use('/', index);
  app.use('/account', account);
  app.use('/photo', photo);
  app.use('/api/account', accountApi);
};