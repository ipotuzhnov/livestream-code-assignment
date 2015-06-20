/// <reference path="../../../typings/tsd.d.ts" />

var should = require('should');

describe('Director Controller Tests', () => {
	describe('GET', () => {
		it('should return Directors collection', () => {
			var Director = () => {
				listAll: () => {
					return [
						{
							"livestream_id": "6488818",
						  "full_name": "Steven Speilberg",
						  "dob": "2012-06-26T06:07:15.000Z",
						  "favorite_camera": "Sony F65",
						  "favorite_movies": [
						    "Catch Me If You Can",
						    "The Terminal"
						  ],
						},
						{
							"livestream_id": "6488824",
						  "full_name": "James Cameron",
						  "dob": "1954-08-16T00:00:00.000Z",
						  "favorite_camera": "Sony F65",
						  "favorite_movies": [
						    "Catch Me If You Can",
						    "The Terminal"
						  ],
						},
						{
							"livestream_id": "6488818",
						  "full_name": "Steven Speilberg",
						  "dob": "2012-06-26T06:07:15.000Z",
						  "favorite_camera": "Sony F65",
						  "favorite_movies": [
						    "Catch Me If You Can",
						    "The Terminal"
						  ],
						},
					]
				}
			};
			
			var directorController = require('../../../server/controllers/directorController')(Director);
			var result = directorController.get();
			console.dir(result);
			
			result.length.should.be.equal(3);
		});
	});
});