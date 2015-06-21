/// <reference path="../_all.d.ts" />

import express = require('express');

var routes = (Director) => {
  var directorRouter = express.Router();
  
  var directorController = require('../controllers/directorController')(Director);
  
  directorRouter.route('/')
    .get(directorController.listAll);
    
  return directorRouter;
}

export = routes;
