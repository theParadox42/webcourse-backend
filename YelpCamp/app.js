// Process stuff
if(process.env.HEROKU != "yes"){
	require('dotenv').config();
}
// DEPENDENTS
var express 		= require("express"),
	app 			= express(),
	bodyParser		= require("body-parser"),
	mongoose		= require("mongoose"),
	Campground    	= require("./models/campground"),
	seedDB			= require("./seeds");

seedDB();

// SETUP

// Mongoose
var username = process.env.USERNAME;
var password = process.env.WEBDEVBOOTCAMPPASS;
mongoose.connect('mongodb+srv://'+username+':'+password+'@data-sodyq.mongodb.net/yelpcamp?retryWrites=true&w=majority', { useNewUrlParser: true });

// EJS
app.set("view engine", "ejs");
// Body parser
app.use(bodyParser.urlencoded({extended: true}));

// ROUTES
app.get("/", function(req, res){
	res.render("landing");
});
// INDEX view campgrounds
app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
            res.render("campgrounds", {campgrounds: allCampgrounds});
		}
	});
});
// ADD add campground
app.get("/campgrounds/new", function(req, res){
	res.render("new");
});
// CREATE post to DB
app.post("/campgrounds", function(req, res){
	var newCampground = req.body;
	console.log(newCampground)
    Campground.create(newCampground, function(err, newCamp){
		if(err){
			console.log("error making campground");
			console.log(err);
			res.redirect("/campgrounds/new");
		} else {
	        res.redirect("/campgrounds");
		}
	});


});
// SHOW show campground
app.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log("Error getting Campground");
			console.log(err);
		} else {
		    res.render("show", { campground: foundCampground });
		}
	});
});
// COMMENTS ROUTES
// ADD a Campground
app.get("/campgrounds/:id/comments/new", function(req, res){
	res.render("comments/new")
})

// ====================
// RUN APP
// ====================
var port = process.env.PORT || 9000;
app.listen(port, process.env.IP, function(){
	console.log(`Yelp Camp server has started on port ${port}!`);
});
