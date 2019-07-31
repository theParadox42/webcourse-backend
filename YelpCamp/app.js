
// DEPENDENTS
var _				= require("dotenv").config(),
	express 		= require("express"),
	app 			= express(),
	bodyParser		= require("body-parser"),
	mongoose		= require("mongoose"),
	http 			= require("http"),
	flash			= require("connect-flash"),
	methodOverride	= require("method-override"),
	passport		= require("passport"),
	localStrategy	= require("passport-local"),
	expressSession	= require("express-session"),
	Campground    	= require("./models/campground"),
	Comment 		= require("./models/comment"),
	User 			= require("./models/user"),
	indexRoutes		= require("./routes/index.js"),
	userRoutes		= require("./routes/user.js"),
	campingRoutes	= require("./routes/campgrounds.js"),
	commentRoutes	= require("./routes/comments.js"),
	seedDB			= require("./seeds");

// SETUP

// Mongoose
mongoose.connect(require("./models/connection"), { useNewUrlParser: true });
// File stuff
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));
// User Auth & passport config
app.use(expressSession({
	secret: process.env.PASSPORT_SECRET || "123",
	resave: false,
	saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Misc stuff
app.use(flash());
app.use(function(req, res, next){
	res.locals.user = req.user;
	res.locals.errorFlashMessage = req.flash("error");
	res.locals.successFlashMessage = req.flash("success");
	next();
})

// Routes
app.use(userRoutes);
app.use("/campgrounds", campingRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(indexRoutes);


// ====================
// RUN APP
// ====================
var port = process.env.PORT || 9000;
app.listen(port, process.env.IP, function(){
	console.log(`Yelp Camp server has started on port ${port}!`);
});

// This was using too many dyno hours.
/*
// Keep heroku app awake
if(process.env.HEROKU == "yes"){
	setInterval(function(){
		http.get("http://paradox-yelp-camp.herokuapp.com")
	}, 280000);
}
*/
