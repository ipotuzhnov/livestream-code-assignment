/// <reference path="../../../server/_all.d.ts" />

var should: Internal = require('should');

var directors: IDirector[] = require('../data.json');
import directorControllers = require('../../../server/controllers/directorController');

describe('Director Controller Tests', () => {
	
	describe('GET /directors', () => {
		
		it('should return valid Directors collection', (done) => {
			
			var Director: IModel = {
				listAll: (cb: (err, results) => void) => {
					cb(null, directors);
				}
			};
			
			var res = {
				result: null,
				statusCode: null,
				status: (statusCode) => {
					res.statusCode = statusCode;
					return res;
				},
				send: (result) => {
					res.result = result;
					res.statusCode.should.be.equal(200);
					res.result.length.should.be.equal(3);
					res.result.should.containEql(directors[0]);
					res.result.should.containEql(directors[1]);
					res.result.should.containEql(directors[2]);
					done();
				}
			};
			
			var directorController = directorControllers(Director);
			directorController.listAll(null, res, null);
			
		});
		
	});
	
	describe('GET /directors/:id', () => {
		
		it('should return valid Director object', (done) => {
			
			var id = directors[0].livestream_id;
			
			var Director: IModel = {
				get: (id: number, cb: (err, res) => void) => {
					cb(null, directors[0]);
				}
			};
			
			var req = {
				params: {
					id
				}
			};
			
			var res = {
				result: null,
				statusCode: null,
				status: (statusCode) => {
					res.statusCode = statusCode;
					return res;
				},
				send: (result) => {
					res.result = result;
					res.statusCode.should.be.equal(200);
					res.result.should.be.equal(directors[0]);
					done();
				}
			};
			
			var directorController = directorControllers(Director);
			directorController.get(req, res, null);
			
		});
		
	});
	
	describe('POST /directors', () => {
		
		it('should add new entry to Directors collection', (done) => {
			
			var director = directors[0];
			
			var Director: IModel = {
				get: (id: number, cb: (err, result) => void) => {
					cb(null, null);
				},
				set: (id: number, val, cb: (err, result) => void) => {
					cb(null, val);
				},
				post: (id: number, val, cb: (err, result) => void) => {
					cb(null, director);
				}
			};
			
			var req = {
				body: {
					livestream_id: director.livestream_id
				}
			};
			
			var res = {
				result: null,
				statusCode: null,
				status: (statusCode) => {
					res.statusCode = statusCode;
					return res;
				},
				send: (result) => {
					res.result = result;
					res.statusCode.should.be.equal(201);
					res.result.should.have.property('livestream_id', director.livestream_id);
					res.result.should.have.property('full_name', director.full_name);
					res.result.should.have.property('dob', director.dob);
					done();
				}
			};
			
			var directorController = directorControllers(Director);
			directorController.post(req, res, null);
			
		});
		
	});
	
});