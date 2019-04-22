var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("search");
});
app.get("/results", function(req, res){
	request("http://omdbapi.com/?s=california&apikey=thewdb", function(error, response, body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.render("results", {data: data});
		} else {
			res.send("error fetching data");
		}
	});
});

app.listen(9000, undefined, function(){
	console.log("Movie Maker started Server");
});