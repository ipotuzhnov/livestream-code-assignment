var should = require('should');
describe('Director Controller Tests', function () {
    describe('GET', function () {
        it('should return Directors collection', function (done) {
            var Director = function () {
            };
            var directors = require('../data.json');
            Director.listAll = function (callback) {
                callback(null, directors);
            };
            var res = {
                result: [],
                send: function (result) {
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
