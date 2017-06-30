var fs = require('fs');
var path = require('path');
var sha1 = require('sha1');
var moment = require('moment');
var express = require('express');
var app = express();
var socket = require('socket.io');
var ss = require('socket.io-stream');
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	ObjectID = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/5327C';
app.get('/', function(req,res){
	res.sendFile(__dirname + '/public/index.html');
});
app.get('/public/*', function(req,res){
	res.sendFile(__dirname + req.path);
});
app.get('/files/*', function(req,res){
	res.sendFile(path.resolve(__dirname + '/../data' + req.path));
});
app.get('*', function(req,res){
	res.sendFile(__dirname + '/public/error.html');
});

var server = app.listen(8000);
var io = socket.listen(server);

io.sockets.on('connection', function(client){
	ss(client).on('submit', function(p, d, f){
		if(sha1(p) == 'a55b84786d3c3e009ec175520a087b92aa246807'){
			var photoindex = 0;
			var codeindex = 0;
			var t = moment().valueOf();
			fs.mkdir('/home/billy/data/files/' + t.toString(), function(err){
				var files = {
					'coverphoto': null,
					'photo': [],
					'code': [],
					'buildphoto': null
				};
				for(var i = 0; i < f.length; i++){
					var path = "/home/billy/data/files/" + t.toString() + '/';
					var ext = f[i].filename.substring(f[i].filename.lastIndexOf('.'), f[i].filename.length);
					if(f[i].type == "photo"){
						path += "photo" + photoindex.toString() + ext;
						files.photo.push(f[i].filename);
						photoindex++;
					}
					else if(f[i].type == "code"){
						path += "code" + codeindex.toString() + ext;
						files.code.push(f[i].filename);
						codeindex++;
					}
					else{
						path += f[i].type + ext;
					}
					if(f[i].type == "coverphoto"){
						files.coverphoto = f[i].filename;
					}
					if(f[i].type == "buildphoto"){
						files.buildphoto = f[i].filename;
					}
					f[i].stream.pipe(fs.createWriteStream(path));
				}
				MongoClient.connect(url, function(err, db){	
					var collection = db.collection('entries');
					collection.insertOne({
						'info': d,
						'timestamp': t.toString(),
						'files': files
					}, function(err, docs){
						client.emit('status', 200);
					});
				});
			});
		}
		else{
			client.emit('status', 401);
		}
	});
	ss(client).on('loadEntries', function(){
		MongoClient.connect(url, function(err, db){	
			var collection = db.collection('entries');
			collection.find().toArray(function(err, docs) {
				ss(client).emit('entriesDocs', docs);
		    });
		});
	});
});