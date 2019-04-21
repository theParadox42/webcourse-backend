var express = require("express");
var app = express();
var request = require("request");

app.get("/results", function(req, res){
	res.send("it works!");
});

app.listen(9000, undefined, function(){
	console.log("Movie Maker started Server");
});