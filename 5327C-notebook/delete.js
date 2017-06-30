var fs = require('fs-extra');
var timestamp = process.argv[2];

var MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	ObjectID = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/5327C';

MongoClient.connect(url, function(err, db){
	var collection = db.collection('entries');
	collection.deleteOne({'timestamp': timestamp}, function(err, result){ db.close(); });
});

fs.remove('/home/billy/data/files/' + timestamp, function(err){});