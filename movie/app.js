const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose')
const redis = require('redis');

var indexRouter = require('./routes/index');
var movies = require('./routes/movies');

var app = express();
app.use(cors());
var client = redis.createClient()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const dbUrl = 'mongodb://localhost:27017/entertainme'
mongoose.connect(dbUrl, (err) => {
  err? console.log('error database Mongodb') : console.log('Connected to Database');
});

client.on('connect', (err) => {
  err? console.log('error to connect Redis') : console.log('Connected to Redis')
})

app.use('/', indexRouter);
app.use('/movies', movies);

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
