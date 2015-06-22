/// <reference path="../../../server/_all.d.ts" />

var should: Internal = require('should');

var directors: IDirector[] = require('../data.json');
var directorControllers = require('../../../server/controllers/directorController');

describe('Director Controller Tests', () => {
	
	describe('GET /directors', () => {
		
		it('should return valid Directors collection', (done) => {
			
			var Director: IDirectorModel = {
				listAll: (cb: (err, results) => void) => {
					cb(null, directors);
				}
			};
			
			var res = {
				result: [],
				status: (status) => {
					res.status = status;
					return res;
				},
				send: (result) => {
					res.result = result;
					res.status.should.be.equal(200);
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
			
			var Director: IDirectorModel = {
				get: (id: string, cb: (err, res) => void) => {
					cb(null, directors[0]);
				}
			};
			
			var req = {
				params: {
					id
				}
			};
			
			var res = {
				result: [],
				status: (status) => {
					res.status = status;
					return res;
				},
				send: (result) => {
					res.result = result;
					res.status.should.be.equal(200);
					res.result.should.be.equal(directors[0]);
					done();
				}
			};
			
			var directorController = directorControllers(Director);
			directorController.get(req, res, null);
			
		});
		
	});
	
});