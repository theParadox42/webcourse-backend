// DEPENDENTS
var express 		= require("express"),
	app 			= express(),
	bodyParser		= require("body-parser"),
	mongoose		= require("mongoose");


// SETUP

// Mongoose
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
    useNewUrlParser: true
}).catch(function(e){
    console.log("Error occured connecting to mongodb");
	console.log(e);
});
// EJS
app.set("view engine", "ejs");
// Body parser
app.use(bodyParser.urlencoded({extended: true}));


// MONGO

//Schema
var campgroundSchema = new mongoose.Schema({
	name: String,
	img: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// DATA

Campground.create({
	name: "Granite Hill",
	img: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"
}, function(err, campground){
	if(err){
		console.log("Error occurred creating campground");
		console.log(err);
	} else {
		console.log("Successfully created new campground");
		console.log(campground);
	}
});

//Campgrounds
var campgrounds = [
	{
	name: "First Campground",
	img: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"
}
	,
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