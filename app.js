var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config.js'); // config containing database url
const passport = require("passport");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
var authenticate = require("./authenticate");

// database connection
async function run() {
  await mongoose.connect(config.server);
  // checking connection state
  if (mongoose.connection.readyState == 1)
    console.log("Database connection established!");
}
run();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sessionsRouter = require('./routes/sessions');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(session({
  name: "session-id",
  secret: config.secret,
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

app.use(passport.initialize());
app.use(passport.session());

function auth(req, res, next) {
  console.log(req.user);
  if (!req.user) {
    const err = new Error("You are not authenticated!");
    err.status = 403;
    next(err);
  } else {
    next();
  }
}
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(auth);
app.use('/sessions', sessionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // generating the error response
  const errStatus = err.status || 500;
  res.status(errStatus);
  res.json({
    success: false,
    status: errStatus || 500,
    message: err.message
  });
});

module.exports = app;
