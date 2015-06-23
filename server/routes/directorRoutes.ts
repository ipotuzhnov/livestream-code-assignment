/// <reference path="../_all.d.ts" />

import express = require('express');
import directorController = require('../controllers/directorController');
import authorizationController = require('../controllers/authorizationController');

var routes = (Director) => {
  var directorRouter = express.Router();
  
  var directors = directorController(Director);
  var authorize = authorizationController(Director).authorize;
  
  directorRouter.route('/')
    .get(directors.listAll)
    .post(directors.post);
    
  directorRouter.route('/:id')
    .get(directors.get);
    
  directorRouter.use('/:id', authorize);
    
  directorRouter.route('/:id')
    .put(directors.put);
    
  return directorRouter;
}

export = routes;
