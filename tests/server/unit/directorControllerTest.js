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
                result: null,
                statusCode: null,
                status: function (statusCode) {
                    res.statusCode = statusCode;
                    return res;
                },
                send: function (result) {
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
                result: null,
                statusCode: null,
                status: function (statusCode) {
                    res.statusCode = statusCode;
                    return res;
                },
                send: function (result) {
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
    describe('POST /directors', function () {
        it('should add new entry to Directors collection', function (done) {
            var director = directors[0];
            var Director = {
                get: function (id, cb) {
                    cb(null, null);
                },
                set: function (id, val, cb) {
                    cb(null, val);
                },
                post: function (id, val, cb) {
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
                status: function (statusCode) {
                    res.statusCode = statusCode;
                    return res;
                },
                send: function (result) {
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
