var express = require('express');
var flash = require('express-flash');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var http = require('http');
var mongoose = require('mongoose');
var routes = require('./routes');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

var app = express();

// port setup
app.set('port', process.env.PORT || 3000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// database connection string setup
app.set('db_conn_str', 'mongodb://ktei:km5jpVEi@ds039880.mongolab.com:39880/mypixels');
if (app.get('env') === 'development') {
  app.set('db_conn_str', 'mongodb://localhost:27017/mypixels');
}

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'km5jpVEi', saveUninitialized: true, resave: true}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/fonts', express.static(path.join(__dirname, 'bower_components/uikit/dist/fonts')));

// This needs to go fire before routes setup
app.use(function (req, res, next) {
  req.db = db;
  next();
});

app.use(function (req, res, next) {
  res.jsonSuccess = function (data) {
    return res.json({success: true, data: data});
  };
  res.jsonFail = function (error) {
    return res.json({success: false, error: error});
  };
  next();
});

app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.routes = {
    'login': '/account/login',
    'logout': '/account/logout',
    'register': '/account/register'
  };
  if (req.user) {
    res.locals.user = req.user;
  } else {
    res.locals.user = null;
  }
  next();
});

// Setup routes
routes.setup(app);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

mongoose.connect(app.get('db_conn_str'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // Start the application after the database connection is ready
  http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
  });
});

module.exports = app;
