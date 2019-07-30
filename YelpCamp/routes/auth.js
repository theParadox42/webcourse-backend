
var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    User        = require("../models/user"),
    passport    = require("passport");

// AUTH ROUTES
// SHOW a user (you)
router.get("/profile/:username", function(req, res){
    User.findOne({ username: req.params.username }).populate("campgrounds").exec(function(err, foundUser){
        if(err){
            req.flash("error", "Error finding user");
            res.redirect("/campgrounds");
        } else if(foundUser){
            Campground.find({}, function(err, foundCampgrounds){
                if(err){
                    req.flash("error", "Error finding campgrounds!");
                    res.render("users/profile", { profile: foundUser, profileCampgrounds: [] });
                } else {
                    var userCampgrounds = foundCampgrounds.filter(function(c){
                        return c.author.id.equals(foundUser._id);
                    })
                    res.render("users/profile", { profile: foundUser, profileCampgrounds: userCampgrounds })
                }
            });
        } else {
            req.flash("error", "No user found!");
            res.redirect("/campgrounds");
        }
    })
})
// ADD a user
router.get("/register", function(req, res){
	res.render("users/register");
})
// CREATE a user
router.post("/register", function(req, res){
    if(req.body.admincode == process.env.ADMINCODE) {
        var newUser = new User({ username: req.body.username })
        User.register(newUser, req.body.password, function(err, user){
            if(err){
                req.flash("error", err.message);
                return res.redirect("/register");
            }
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to YelpCamp " + req.user.username)
                res.redirect("/campgrounds");
            });
        });
    } else if(req.body.admincode) {
        req.flash("error", "No admin code!");
        res.redirect("/register");
    } else {
        req.flash("error", "Wrong admin code!");
        res.redirect("/register");
    }
})
// LOGIN a user
router.get("/login", function(req, res){
	res.render("users/login");
})
// HANDLE a user login
router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}));
// LOGOUT a user
router.get("/logout", function(req, res){
	req.logout();
    req.flash("success", "Logged you out!");
	res.redirect("/campgrounds");
})

module.exports = router;
