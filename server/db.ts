/// <reference path="./_all.d.ts" />

import redis = require('redis');
import async = require('async');

var directors: IDirector[] = require('../tests/server/data');

var client = redis.createClient();

client.on('error', (err) => {
	console.log(err);
});

var db = {
	
	models: {},
	
	model: (modelName: string) => {
		db.models[modelName] = {};
			
		db.models[modelName].listAll = (cb: (err, res) => void) => {
			db.listAll(modelName, cb);
		};
		
		db.models[modelName].get = (id: string, cb: (err, res) => void) => {
			db.get(modelName, id, cb);
		};
		
		db.models[modelName].set = (id: string, val, cb: (err, res) => void) => {
			db.set(modelName, id, val, cb);
		};
		
		db.models[modelName].remove = (id: string, cb: (err, res) => void) => {
			db.remove(modelName, id, cb);
		};
	
		return <IModel>db.models[modelName]; 
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
		var memberId = `${collectionName}:${id}`;
		
		client.get(memberId, cb);
	},
	
	set: (collectionName: string, id: string, val, cb: (err, res) => void) => {
		var memberId = `${collectionName}:${id}`;
		
		var newVal: string
				
		try {
			newVal = JSON.stringify(val);
		} catch (err) {
			return cb(err, null);
		}
		
		async.parallel([
			(callback) => {
				client.set(memberId, newVal, callback);
			},
			(callback) => {
				client.sadd(collectionName, memberId, callback);
			}
		],
		(err) => {
			if (err) {
				return cb(err, null);
			}
			
			cb(null, val);
		});
	},
	
	remove: (collectionName: string, id: string, cb: (err, res) => void) => {
		var memberId = `${collectionName}:${id}`;
		
		async.parallel([
			(callback) => {
				client.srem(collectionName, memberId, callback);
			},
			(callback) => {
				client.del(memberId, callback);
			}
		],
		(err) => {
			return cb(err, null);
		});
		
		cb(null, null);
	}
	
};

var asiter: AsyncIterator<IDirector> = (item: IDirector, cb: (err) => void) => {
	var val = JSON.stringify(item);
	
	db.set('directors', item.livestream_id, item, (err, res) => {
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
