var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contentRouter = require('./routes/content');
var mainRouter = require("./routes/mainpage");
var accountRouter = require("./routes/account")
var courses = require('./routes/courses');

var config = require('./config');
var passport = require('passport');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useMongoClient: true,
  /* other options */
});

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });



var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('12345-12345-12345-12345'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name:'session-id',
  secret: '12345-12345-12345-12345',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}))

app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);

function auth (req, res, next) {
  console.log(req.user);

  if (!req.user) {
    var err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');                          
    err.status = 401;
    next(err);
  }
  else {
        next();
  }
}

app.use(auth);

app.use('/main', mainRouter);
app.use('/content', contentRouter);
app.use('/account', accountRouter);
app.use('/courses', courses);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
