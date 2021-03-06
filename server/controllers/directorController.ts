/// <reference path="../_all.d.ts" />

import async = require('async');
import request = require('request');
import createHttpError = require('../httpError');

var directorController = (Director: IModel) => {
	
	var controller = <IDirectorController>{};
	
	controller.listAll = (req, res, next) => {
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
	
	controller.get = (req, res, next) => {
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
	
	controller.post = (req, res, next) => {
		var id: number = req.body.livestream_id;
		var full_name = req.body.full_name;
		var dob = req.body.dob;
		var favorite_camera = req.body.favorite_camera;
		var favorite_movies = req.body.favorite_movies;
		
		if (id === undefined) {
			return next(createHttpError(400, 'Field livestream_id is not specified'));
		}
		
		if (favorite_camera !== undefined && favorite_camera !== null && typeof favorite_camera !== 'string') {
			return next(createHttpError(400, 'Type of field favorite_camera should be string'));
		}
		
		if (favorite_movies !== undefined && favorite_movies !== null && Array.isArray(favorite_movies) === false) {
			return next(createHttpError(400, 'Type of field favorite_movies should be array'));
		}
		
		async.waterfall([
			(cb) => {
				if (typeof id !== 'number') {
					return cb(createHttpError(400, 'Type of field livestream_id should be number'));
				}
				
				Director.get(id, cb);
			},
			(result, cb) => {
				if (result) {
					return cb(createHttpError(400, `Director with livestream_id ${id} already exists`));
				}
				
				var url = `https://api.new.livestream.com/accounts/${id}`;
				request(url, {}, cb);
			},
			(response, body, cb) => {
				var parsedBody, result = <IDirector>{};
				
				if (response.statusCode !== 200) {
					return cb(createHttpError(400, 'Response status code returned from livestream api is not 200'));
				}
				
				if (typeof body !== 'string') {
					return cb(createHttpError(400, 'Type of response body returned from livastream api is not string'));
				}
				
				try {
					parsedBody = JSON.parse(body); 
				} catch (err) {
					return cb(createHttpError(400, err.message));
				}
				
				if (typeof parsedBody.id !== 'number') {
					return cb(createHttpError(400, 'Type of field id returned from livastream api is not number'));
				}
				
				result.livestream_id = parsedBody.id;
				
				if (full_name !== undefined && full_name !== parsedBody.full_name) {
					return cb(createHttpError(400, 'Field full_name does not match livestream api value'));
				}
				
				if (dob !== undefined && dob !== parsedBody.dob) {
					return cb(createHttpError(400, 'Field dob does not match livestream api value'));
				}
				
				result.full_name = parsedBody.full_name;
				
				result.dob = parsedBody.dob;
				
				if (favorite_camera) {
					result.favorite_camera = favorite_camera;
				}
				
				if (favorite_movies) {
					result.favorite_movies = favorite_movies;
				}
				
				Director.set(id, result, cb);
			}
		], (err, result) => {
			if (err) {
				return next(err);
			}
			
			res.status(201).send(result);
		});
		
	};
	
	controller.put = (req, res, next) => {
		
		var id: number = req.params.id;
		var body: IDirector = req.body;
		
		async.waterfall([
			(cb) => {
				if (!body) {
					return cb(createHttpError(400, 'Request body is empty'));
				}
				
				Director.get(id, cb);
			},
			(result: IDirector, cb) => {
				if (!result) {
					return cb(createHttpError(404, 'Not Found'));
				}
				
				if (body.livestream_id !== undefined && body.livestream_id !== result.livestream_id) {
					return cb(createHttpError(400, 'Field livestream_id does not match database value'));
				}
				
				if (body.full_name !== undefined && body.full_name !== result.full_name) {
					return cb(createHttpError(400, 'Field full_name does not match database value'));
				}
				
				if (body.dob !== undefined && body.dob !== result.dob) {
					return cb(createHttpError(400, 'Field dob does not match database value'));
				}
				
				if (body.favorite_camera !== undefined && typeof body.favorite_camera !== 'string') {
					return cb(createHttpError(400, 'Type of field favorite_camera should be string'));
				} else {
					result.favorite_camera = body.favorite_camera;
				}
				
				if (body.favorite_movies !== undefined && Array.isArray(body.favorite_movies) === false) {
					return cb(createHttpError(400, 'Type of field favorite_movies should be array'));
				} else {
					result.favorite_movies = body.favorite_movies;
				}
				
				Director.set(id, result, cb)
			}
		], (err, result) => {
			if (err) {
				return next(err);
			}
			
			res.status(200).send(result);
		});
	};
	
	controller.delete = (req, res, next) => {
		Director.remove(req.params.id, (err, result) => {
			if (err) {
				return next(err);
			}
			
			res.status(204).end();
		});
	};
	
	return controller;
	
};

export = directorController;
