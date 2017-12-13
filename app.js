var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('./models/db');
var apiUtils = require('./lib/api-utils');
var ApiError = require('./lib/api-error');

var apiRoutes = require('./routes/api_routes');
var routes = require('./routes/index');
var host =  process.env.CORS|| "http://localhost" +":"+ (process.env.port || "3001");

var app = express();

var db = mongoose.connection;
// view engine setup

app.use(logger(':date[web] :method :url :status :response-time ms - :res[content-length]'))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave: true
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', "true");
  res.header("Access-Control-Allow-Origin", host);
  res.header("Access-Control-Allow-Headers", "X-Custom-Header, X-Requested-With, Content-Type, authorization, Accept");
  res.header("Access-Control-Allow-Methods", "Get,Post,PUT,Patch,Delete");
  next();
});
apiUtils.inject(app);

app.use('/api', apiRoutes);
app.use('/', routes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err)
    res.status(err.status || 500);
    res.status(500).json({
        message: err.message,
        error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.status(500).json({
        message: err.message,
        error: err
    });
});


module.exports = app;
