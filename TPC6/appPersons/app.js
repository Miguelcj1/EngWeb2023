var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

// Mongo
const mongoose = require('mongoose')
var mongodb = 'mongodb://127.0.0.1/EngWeb2023'
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoBf conection error.."))
db.on('open', function() {
    console.log("Conexao ao Mongo com sucesso...")
})

var indexRouter = require('./routes/index');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

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
  //res.render('error');
  res.json(err)
});

module.exports = app;
