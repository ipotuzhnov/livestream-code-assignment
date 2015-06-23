/// <reference path="../../../server/_all.d.ts" />

var should: Internal = require('should');

import crypto = require('crypto');
import authorizationController = require('../../../server/controllers/authorizationController');

describe('Authorization Controller Tests', () => {
	
	it('should check md5', (done) => {
		var id = 12345;
		var director = {
			full_name: 'User Name'
		};
		
		var md5 = crypto.createHash('md5');
		var hash = md5.update(director.full_name)​.digest('hex');
		
		var auth = `Bearer ${hash}`;
		
		var Director: IModel = {
			get: (id: number, cb: (err, res) => void) => {
				cb(null, director);
			}
		};
		
		var req = {
			params: {
				id
			},
			get: () => {
				return auth;
			}
		};
		
		var next = (err) => {
			should(err).not.be.ok;
			done();
		};
		
		var authorize = authorizationController(Director).authorize;
		authorize(req, null, next);
		
	});
	
});