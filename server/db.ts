/// <reference path="./_all.d.ts" />

import redis = require('redis');
import async = require('async');

var directors: IDirector[] = require('../tests/server/data.json');

var client = redis.createClient();

client.on('error', (err) => {
	console.log(err);
});

var db = {
	
	models: {},
	
	model: (modelName: string) => {
		db.models[modelName] = {};
			
		db.models[modelName].listAll = (cb: (err, result) => void) => {
			db.listAll(modelName, cb);
		};
		
		db.models[modelName].get = (id: number, cb: (err, result) => void) => {
			db.get(modelName, id, cb);
		};
		
		db.models[modelName].set = (id: number, val, cb: (err, result) => void) => {
			db.set(modelName, id, val, cb);
		};
		
		db.models[modelName].remove = (id: number, cb: (err, result) => void) => {
			db.remove(modelName, id, cb);
		};
	
		return <IModel>db.models[modelName]; 
	},
	
	listAll: (collectionName: string, cb: (err, result) => void) => {
		return client.smembers(collectionName, (err, result: string []) => {
			var iterator: AsyncResultIterator<string, any> = (item: string, callback: (err, val) => void) => {
				client.get(item, (err, val) => {
					if (err) { 
						return callback(err, null);
					}
					
					var result;
					try {
						result = JSON.parse(val);
					} catch (err) {
						return callback(err, null);
					}
					
					callback(null, result);
				});
			};
			
			var callback: AsyncResultArrayCallback<any> = (err, result: any[]) => {
				cb(err, result);
			};
			
			async.map(
				result,
				iterator,
				callback
			);
			
		});
	},
	
	get: (collectionName: string, id: number, cb: (err, result) => void) => {
		var memberId = `${collectionName}:${id}`;
		
		client.get(memberId, (err, val) => {
			if (err) {
				return cb(err, null);
			}
			
			var result;
			
			try {
				result = JSON.parse(val);
			} catch (error) {
				return cb(error, null);
			}
			
			cb(null, result);
		});
	},
	
	set: (collectionName: string, id: number, val, cb: (err, result) => void) => {
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
	
	remove: (collectionName: string, id: number, cb: (err, result) => void) => {
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

export = db;
