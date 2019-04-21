var express = require("express")
var app = express()

app.use(express.static("public"));
app.set("view engine", "ejs")

// Paths
app.get("/", function(req, res){
    res.render("home")
})
app.get("/fallinlove/:name", function(req, res){
    var name = req.params.name;
    res.render("love", {name: name});
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started")
})