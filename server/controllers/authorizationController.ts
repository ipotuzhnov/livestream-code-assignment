/// <reference path="../_all.d.ts" />

import crypto = require('crypto');
import async = require('async');
import createHttpError = require('../httpError');

var authorizationController = (Director: IModel) => {
	var authorize = (req, res, next) => {
		Director.get(req.params.id, (err, result) => {
			if (err) {
				return next(err);
			}
			
			if (!result) {
				return next(createHttpError(404, 'Not Found'));
			}
			
			var md5 = crypto.createHash('md5').update(result.full_name)​.digest('hex');
			
			if (req.get('Authorization') === `Bearer ${md5}`) {
				return next();
			}
			
			return next(createHttpError(401, 'Unauthorized'));
		});
	};
	
	return {
		authorize
	};
};

export = authorizationController;
