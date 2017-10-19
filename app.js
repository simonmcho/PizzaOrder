var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');//setup mongoose

//set up routes
//var order = require('./routes/order');
var ordersList = require('./routes/ordersList');

//setup MongoDB location for storage
var mongoUrl = 'mongodb://localhost/simonc'//name of location as instructed

mongoose.connect(mongoUrl, (err) => {
  if(err){
    console.log("Error connecting to MongoDB, please check mongoUrl or your mongoDB setup.");
    process.exit(1);
  }
});

//this allows clean up for closing connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log("Closing the mongodb connection.");
    process.exit(1);
  })
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');//look into using jade or other templates for further learning


//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', ordersList);//////////////////////////////////////////////////////////check line 43 on example...nothing for index 



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
