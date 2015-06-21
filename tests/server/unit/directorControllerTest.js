var should = require('should');
describe('Director Controller Tests', function () {
    describe('GET', function () {
        it('should return valid Directors collection', function (done) {
            var Director = {
                listAll: function (callback) {
                    callback(null, directors);
                },
                get: function (id, cb) {
                    cb(null, null);
                },
                set: function (id, val, cb) {
                    cb(null, null);
                }
            };
            var directors = require('../data.json');
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
            directorController.listAll(null, res, null);
        });
    });
});
