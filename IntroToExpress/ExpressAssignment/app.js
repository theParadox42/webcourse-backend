var express = require("express");
var app = express();

var soundsObj = {
    "pig": "oink oink",
    "cow": "Mooo",
    "sheep": "Bhaaaha",
    "human": 'var node = require("node"); console.log(node.coolness); //Returns super cool',
    "bird": "Tweet tweet"
};
app.get("/", function(req, res){
    res.send("Welcome to my assignment");
});

app.get("/speak/:animal", function(req, res){
    var key = req.params.animal;
    var sound = soundsObj[key];
    res.send("The "+key+" says "+sound);
});

app.get("/repeat/:word/:times", function(req, res) {
    var returnString = "";
    var word = req.params.word;
    var times = req.params.times;
    for(var i = 0; i < parseInt(times, 10); i ++){
        returnString += word+" ";
    }
    res.send(returnString);
});
app.get("*", function(req, res){
    res.send("No page found :(");
});

app.listen(9000, undefined, function(){
    console.log("Server has started!");
});
