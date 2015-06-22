/// <reference path="../../../server/_all.d.ts" />

import redis = require('redis');
import async = require('async');

import db = require('../../../server/db');
var client = redis.createClient();
var should: Internal = require('should');

describe('DB orm tests', () => {
	
	describe('DB base functions', () => {
		beforeEach((done) => {
			client.flushdb((err) => {
				if (err) {
					console.log(`Error: flushdb ${err.message}`);
				}
				
				done();
			});
		});
		
		after((done) => {
			client.flushdb((err) => {
				if (err) {
					console.log(`Error: flushdb ${err.message}`);
				}
				
				done();
			});
		});
		
		var collectionName = 'users';
		var user_id = 1;
		var memberId = `${collectionName}:${user_id}`;
		var user = {user_id};
		var val = JSON.stringify(user);
		
		it('db.get should return data valid from redis', (done) => {
			
			async.series([
				(cb) => {
					client.set(memberId, val, cb);
				},
				(cb) => {
					client.sadd(collectionName, memberId, cb);
				},
				(cb) => {
					db.get(collectionName, user_id, cb);
				}
			], 
			(err, results) => {
				if (err) {
					console.log(`Error: db.get ${err.message}`);
				}
				
				should(err).not.be.ok;
				results[0].should.be.equal('OK');
				results[1].should.be.equal(1);
				results[2].should.be.equal(val);
				done();
			});
			
		});
		
		it('db.set should insert data to redis', (done) => {
			
			async.series([
				(cb) => {
					db.set(collectionName, user_id, user, cb);
				},
				(cb) => {
					client.get(memberId, cb);
				},
				(cb) => {
					client.sismember(collectionName, memberId, cb);
				}
 			], 
			(err, results) => {
				if (err) {
					console.log(`Error: db.set ${err.message}`);
				}
				 
				should(err).not.be.ok;
				results[0].should.be.equal(user);
				results[1].should.be.equal(val);
				results[2].should.be.equal(1);
				done();
			});
			
		});
		
		it('db.remove should remove data from redis', (done) => {
			
			async.series([
				(cb) => {
					client.set(memberId, val, cb);
				},
				(cb) => {
					client.sadd(collectionName, memberId, cb);
				},
				(cb) => {
					db.remove(collectionName, user_id, cb);
				},
				(cb) => {
					client.get(memberId, cb);
				},
				(cb) => {
					client.sismember(collectionName, memberId, cb);
				}
			], 
			(err, results) => {
				if (err) {
					console.log(`Error: db.set ${err.message}`);
				}
				 
				should(err).not.be.ok;
				results[0].should.be.equal('OK');
				results[1].should.be.equal(1);
				should(results[2]).not.be.ok;
				should(results[3]).not.be.ok;
				results[4].should.be.equal(0);
				done();
			});
			
		});
		
		it('db.listAll should remove all data from redis', (done) => {
			
			var user1_id = '1';
			var member1Id = `${collectionName}:${user1_id}`;
			var user1 = {user_id: user1_id};
			var val1 = JSON.stringify(user1);
			
			var user2_id = '2';
			var member2Id = `${collectionName}:${user2_id}`;
			var user2 = {user_id: user2_id};
			var val2 = JSON.stringify(user2);
			
			var user3_id = '3';
			var member3Id = `${collectionName}:${user3_id}`;
			var user3 = {user_id: user3_id};
			var val3 = JSON.stringify(user3);
			
			var users = [
				user1,
				user2,
				user3
			];
			
			async.series([
				(cb) => {
					async.parallel([
						(cb) => { client.set(member1Id, val1, cb); },
						(cb) => { client.set(member2Id, val2, cb); },
						(cb) => { client.set(member3Id, val3, cb); },
						(cb) => { client.sadd(collectionName, member1Id, cb); },
						(cb) => { client.sadd(collectionName, member2Id, cb); },
						(cb) => { client.sadd(collectionName, member3Id, cb); }
					], (err) => {
						cb(err, 'OK');	
					});
				},
				(cb) => {
					db.listAll(collectionName, cb);
				}
			], 
			(err, results) => {
				if (err) {
					console.log(`Error: db.set ${err.message}`);
				}
				
				should(err).not.be.ok;
				results[0].should.be.equal('OK');
				results[1].should.containEql(user1);
				results[1].should.containEql(user2);
				results[1].should.containEql(user3);
				
				done();
			});
			
		});
		
	});
	
});