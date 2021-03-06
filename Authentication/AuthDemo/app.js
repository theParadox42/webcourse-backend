var _                       = require('dotenv').config(),
    express                 = require('express'),
    app                     = express(),
    expressSession          = require('express-session'),
    mongoose                = require('mongoose'),
    bodyParser              = require('body-parser'),
    User                    = require('./models/user'),
    passport                = require('passport'),
    localStrategy           = require('passport-local'),
    passportLocalMongoose   = require('passport-local-mongoose');

// mongoose
mongoose.connect('mongodb+srv://'+process.env.USERNAME+':' +process.env.WEBDEVBOOTCAMPPASS+'@data-sodyq.mongodb.net/authdemo?retryWrites=true&w=majority', { useNewUrlParser: true });

// Express Setup
app.use(expressSession({
    secret: process.env.SESSIONSECRET || "secret",
    resave: false,
    saveUninitialized: false
}))
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// -=-=-=-=-=-=-=-
// Routes
// -=-=-=-=-=-=-=-
// Home
app.get("/", function(req, res){
    res.render("home");
})

// SIGNING UP
// Register page
app.get("/register", function(req, res){
    res.render("register")
})
// Handle user signup
app.post("/register", function(req, res){
    User.register(new User({ username: req.body.username }), req.body.password, function(err, user){
        if(err){
            console.log("Error making user");
            console.log(user);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        })
    })
})
// LOGGING IN
app.get("/login", function(req, res){
    res.render("login");
})
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){

});
// LOGGING OUT
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
})

// Secret page
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}
app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret")
})

// Start app
app.listen(process.env.PORT || 8080, function(){
    console.log("Server started");
})
