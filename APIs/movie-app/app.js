var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.redirect("/results");
});
app.get("/results", function(req, res){
	request("http://omdbapi.com/?s=california&apikey=thewdb", function(error, response, body){
		if(!error && response.statusCode == 200){
			var results = JSON.parse(body);
			res.send(results.Search[0].Title);
		}
	});
});

app.listen(9000, undefined, function(){
	console.log("Movie Maker started Server");
});