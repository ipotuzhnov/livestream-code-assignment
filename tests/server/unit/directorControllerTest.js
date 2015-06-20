var should = require('should');
describe('Director Controller Tests', function () {
    describe('GET', function () {
        it('should return Directors collection', function () {
            var Director = function () {
            };
            var dir1 = {
                livestream_id: "6488818",
                full_name: "Martin Scorsese",
                dob: "1942-11-17T00:00:00.000Z",
                favorite_camera: "iPhone 6 plus",
                favorite_movies: [
                    "Taxi Driver",
                    "The King of Comedy",
                    "The Departed"
                ]
            };
            var dir2 = {
                livestream_id: "6488824",
                full_name: "James Cameron",
                dob: "1954-08-16T00:00:00.000Z",
                favorite_camera: "Samsung Galaxy S6",
                favorite_movies: [
                    "Titanic",
                    "Avatar",
                    "Terminator"
                ]
            };
            var dir3 = {
                livestream_id: "6488834",
                full_name: "Steven Speilberg",
                dob: "2012-06-26T06:07:15.000Z",
                favorite_camera: "Sony F65",
                favorite_movies: [
                    "Catch Me If You Can",
                    "The Terminal"
                ]
            };
            Director.listAll = function () {
                return [
                    dir1,
                    dir2,
                    dir3
                ];
            };
            var directorController = require('../../../server/controllers/directorController')(Director);
            var result = directorController.get();
            result.length.should.be.equal(3);
            result.should.containEql(dir1);
            result.should.containEql(dir2);
            result.should.containEql(dir3);
        });
    });
});
