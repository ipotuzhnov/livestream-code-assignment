var should = require('should');
var directors = require('../data.json');
var directorControllers = require('../../../server/controllers/directorController');
describe('Director Controller Tests', function () {
    describe('GET /directors', function () {
        it('should return valid Directors collection', function (done) {
            var Director = {
                listAll: function (cb) {
                    cb(null, directors);
                }
            };
            var res = {
                result: [],
                status: function (status) {
                    res.status = status;
                    return res;
                },
                send: function (result) {
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
    describe('GET /directors/:id', function () {
        it('should return valid Director object', function (done) {
            var id = directors[0].livestream_id;
            var Director = {
                get: function (id, cb) {
                    cb(null, directors[0]);
                }
            };
            var req = {
                params: {
                    id: id
                }
            };
            var res = {
                result: [],
                status: function (status) {
                    res.status = status;
                    return res;
                },
                send: function (result) {
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
