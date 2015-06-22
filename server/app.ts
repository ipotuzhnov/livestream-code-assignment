/// <reference path="./_all.d.ts" />

import express = require('express');
import path = require('path');
//import favicon = require('serve-favicon');
//import logger = require('morgan');
//import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');

import createHttpError = require('./httpError');
import db = require('./db');

import Director = require('./models/directorModel');

import routes = require('./routes/index');
//import users = require('./routes/users');
import directorRoutes = require('./routes/directorRoutes');
var directorRouter = directorRoutes(Director);

var app = express();
//var db = redis.createClient();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/directors', directorRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createHttpError(404, 'Not Found'));
});

// error handlers
app.use((err: any, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

export = app;
