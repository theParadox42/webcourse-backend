var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there");
});
app.get("/bye", function(req, res){
    res.send("Goodbye");
});
app.get("/dog", function(req, res){
    res.send("Meow..");
});
app.get("*", function(req, res){
    res.send("You are a star");
});
app.listen(9000, undefined, function(){
    console.log("server has started!!!");
});