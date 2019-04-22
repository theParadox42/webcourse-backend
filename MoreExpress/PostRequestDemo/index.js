var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

// app.set("view engine", "ejs");
app.get("/", function(req, res){
    res.render("home.ejs");
});

var friends = ["Tony", "Me", "Mr. Polar Bear", "Yourself", "Sally"];

app.get("/friends", function(req, res){
    res.render("friends.ejs", {friends: friends});
});

app.post("/addfriend", function(req, res){
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.listen(9000, undefined, function(){
    console.log("Server started");
});