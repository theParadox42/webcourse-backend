// DEPENDENTS
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// SETUP
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// DATA

//Campgrounds
var campgrounds = [
	{
		name: "First Campground",
		img: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"
	},
	{
		name: "Granite Hill",
		img: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"
	},
	{
		name: "Happy River",
		img: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"
	},
];

// ROUTES
app.get("/", function(req, res){
	res.render("landing");
});
app.get("/campgrounds", function(req, res){
	
	res.render("campgrounds", {campgrounds: campgrounds});
});
app.post("/campgrounds", function(req, res){
	var newCampground = req.body;
	
	campgrounds.push(newCampground);
	
	res.redirect("/campgrounds");
	
});
app.get("/campgrounds/new", function(req, res){
	res.render("new");
});


// RUN APP
app.listen(process.env.PORT || 9000, process.env.IP, function(){
	console.log("Yelp Camp server has started!");
});