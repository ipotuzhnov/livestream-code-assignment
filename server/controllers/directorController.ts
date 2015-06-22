/// <reference path="../_all.d.ts" />

import async = require('async');
import request = require('request');
import createHttpError = require('../httpError');

var directorController = (Director: IModel) => {
	
	var listAll = (req, res, next) => {
		Director.listAll((err, result) => {
			if (err) {
				return next(err);
			}
			
			if (result) {
				return res.status(200).send(result);
			}
			
			next(createHttpError(404, 'Not Found'));
		});
	};
	
	var get = (req, res, next) => {
		Director.get(req.params.id, (err, result) => {
			if (err) {
				return next(err);
			}
			
			if (result) {
				return res.status(200).send(result);
			}
			
			next(createHttpError(404, 'Not Found'));
		});
	};
	
	var post = (req, res, next) => {
		 
		if (!req.body.livestream_id) {
			next(createHttpError(400, 'Field livestream_id is not specified'));
		}
		
		var id: number = req.body.livestream_id;
		
		var val = {};
		
		async.waterfall([
			(cb) => {
				if (typeof id !== 'number') {
					return cb(createHttpError(400, 'Type of field livestream_id should be number'));
				}
				
				Director.get(id, cb);
			},
			(result, cb) => {
				if (result) {
					cb(createHttpError(400, `Director with livestream_id ${id} already exists`));
				} else {
					var url = `https://api.new.livestream.com/accounts/${id}`;
					request(url, {}, cb);
				}
			},
			(response, body, cb) => {
				var parsedBody, result = <IDirector>{};
				
				if (response.statusCode !== 200) {
					return cb(createHttpError(400, 'Response status code returned from livestream api is not 200'));
				}
				
				if (typeof body !== 'string') {
					return cb(createHttpError(400, 'Type of response body returned from livastream api is not a string'));
				}
				
				try {
					parsedBody = JSON.parse(body); 
				} catch (err) {
					return cb(createHttpError(400, err.message));
				}
				
				if (typeof parsedBody.id !== 'number') {
					return cb(createHttpError(400, 'Type of field id returned from livastream api is not a number'));
				}
				
				result.livestream_id = parsedBody.id;
				
				if (typeof parsedBody.full_name !== 'string') {
					return cb(createHttpError(400, 'Type of field full_name returned from livastream api is not a string'));
				}
				
				result.full_name = parsedBody.full_name;
				
				if (typeof parsedBody.dob !== 'string') {
					return cb(createHttpError(400, 'Type of field dob returned from livastream api is not a string'));
				}
				
				result.dob = parsedBody.dob;
				
				Director.set(id, result, cb);
			}
		], (err, result) => {
			if (err) {
				return next(err);
			}
			
			res.status(201).send(result);
		});
		
	};
	
	return <IDirectorController>{
		listAll,
		get,
		post
	};
	
};

export = directorController;
