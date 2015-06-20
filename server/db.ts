/// <reference path="_all.ts" />

import redis = require('redis');
import async = require('async');

var client = redis.createClient();

client.on('error', (err) => {
	console.log(err);
});

var db = {
	models: {},
	
	model: (modelName, modelClass) => {
		if (modelClass) {
			db.models[modelName] = modelClass;
			
			modelClass.listAll = (cb: (err, res) => void) => {
				db.listAll(modelName, cb);
			};
			
			modelClass.get = (livestreamid_id: string, cb: (err, res) => void) => {
				db.get(modelName, livestreamid_id, cb);
			};
			
			modelClass.set = (livestreamid_id: string, val: string, cb: (err, res) => void) => {
				db.set(modelName, livestreamid_id, val, cb);
			};	
		}
		
		return db.models[modelName]; 
	},
	
	listAll: (collectionName: string, cb: (err, res) => void) => {
		console.log(`Redis.listAll ${collectionName}`);
		
		return client.smembers(collectionName, (err, res: string []) => {
			var iterator: AsyncResultIterator<string, any> = (item: string, callback: (err, val) => void) => {
				client.get(item, (err, val) => {
					if (err) { 
						return callback(err, null);
					}
					
					var result: string;
					try {
						result = JSON.parse(val);
					} catch (err) {
						return callback(err, null);
					}
					
					callback(null, result);
				});
			};
			
			var callback: AsyncResultArrayCallback<any> = (err, results: any[]) => {
				cb(err, results);
			};
			
			async.map(
				res,
				iterator,
				callback
			);
			
		});
	},
	
	get: (collectionName: string, id: string, cb: (err, res) => void) => {
		var colId = `${collectionName}:${id}`;
		
		client.get(colId, cb);
	},
	
	set: (collectionName: string, id: string, val: string, cb: (err, res) => void) => {
		var colId = `${collectionName}:${id}`;
		
		async.parallel([
			(callback) => {
				client.set(colId, val, callback);
			},
			(callback) => {
				client.sadd(collectionName, colId, callback);
			}
		],
		(err) => {
			if (err) {
				return cb(err, val);
			}
		});
	}
	
};

var dir1: IDirector = {
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

var dir2: IDirector = {
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

var dir3: IDirector = {
	livestream_id: "6488834",
  full_name: "Steven Speilberg",
  dob: "2012-06-26T06:07:15.000Z",
  favorite_camera: "Sony F65",
  favorite_movies: [
    "Catch Me If You Can",
    "The Terminal"
  ]
};

var directors = [
	dir1,
	dir2,
	dir3
];

var asiter: AsyncIterator<IDirector> = (item: IDirector, cb: (err) => void) => {
	var val = JSON.stringify(item);
	
	db.set('directors', item.livestream_id, val, (err, res) => {
		if (err) {
			return cb(err);
		}
		
		cb(null);
	});
};

var errcb: ErrorCallback = (err) => {
	if (err) {
		console.log('REDIS ERROR');
		console.log(err);
	}
};

async.each<IDirector>(
	directors,
	asiter,
	errcb
);

export = db;
