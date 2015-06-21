/// <reference path="../../../server/_all.d.ts" />

var should: Internal = require('should');

describe('Director Controller Tests', () => {
	describe('GET', () => {
		it('should return Directors collection', (done) => {
			var Director: IDirectorModel = () => {};
			
			var directors: IDirector[] = require('../data.json');
			
			Director.listAll = (callback: (err, results: IDirector[]) => void) => {
				callback(null, directors);
			};
			
			var res = {
				result: <IDirector[]>[],
				send: (result) => {
					res.result = result;
					res.result.length.should.be.equal(3);
					res.result.should.containEql(directors[0]);
					res.result.should.containEql(directors[1]);
					res.result.should.containEql(directors[2]);
					done();
				}
			};
			
			var directorController = require('../../../server/controllers/directorController')(Director);
			directorController.get(null, res, null);
		});
	});
});