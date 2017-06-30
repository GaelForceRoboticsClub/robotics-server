var express = require('express');
var app = express();

app.get('*',  function(req, res){
	res.sendFile("/root/robotics-site" + req.path);
});

app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res){
	res.render("index.html");
});

app.listen(80);



