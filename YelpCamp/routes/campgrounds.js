
var express     = require("express"),
    router      = express.Router({ mergeParams: true }),
    mongoose    = require("mongoose"),
    Campground  = require("../models/campground"),
    User        = require("../models/user"),
    middleware  = require("../middleware");

// CAMPGROUND ROUTES
// INDEX view campgrounds
router.get("/", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
            req.flash("error", "Error getting campgrounds")
            res.redirect("/error")
		} else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
		}
	});
});
// ADD add campground
router.get("/new", middleware.loggedInOnly, function(req, res) {
	res.render("campgrounds/new");
});
// CREATE post to DB
router.post("/", middleware.loggedInOnly, function(req, res) {
	var newCampground = req.body.campground;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    newCampground.author = author;
    User.findById(req.user._id, function(userErr, foundUser){
        Campground.create(newCampground, function(campgroundErr, newCamp){
    		if(campgroundErr){
                req.flash("error", "Error making campground")
    			res.redirect("/campgrounds/new");
    		} else {
                req.flash("success", "Campground: " + newCamp.name + " created!")
                if(!userErr && foundUser){
                    foundUser.campgrounds.push(newCamp._id);
                    foundUser.save();
                } else {
                    req.flash("error", "Error with user");
                }
    	        res.redirect("/campgrounds");
    		}
    	});
    })
});
// Search campgrounds
router.get("/search", function(req, res) {
    if (typeof req.query.q != "string") {
        console.log(req.query.q);
        req.body.q = ""
    }
    Campground.find({ $text: { $search: req.query.q } }, function(err, foundCampgrounds) {
        if (err) {
            console.log(err);
            req.flash("error", "Couldn't perfom search")
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/search", { campgrounds: foundCampgrounds, query: req.query.q })
        }
    })
})
// SHOW campground
router.get("/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
            req.flash("error", "Error finding campground")
            res.redirect("/campgrounds");
		} else {
			if(foundCampground){
			    res.render("campgrounds/show", { campground: foundCampground });
			} else {
                req.flash("error", "Campground not found")
				res.redirect("/campgrounds");
			}
		}
	});
});
// EDIT campground
router.get("/:id/edit", middleware.ownsCampgroundOnly, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("Error finding campground");
            res.redirect("/campgrounds/"+req.params.id);
        } else {
            res.render("campgrounds/edit", { campground: foundCampground });
        }
    });
});
// UPDATE campground
router.put("/:id", middleware.ownsCampgroundOnly, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campground not found");
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            Campground.updateOne({ _id: foundCampground._id }, { $set: req.body.campground }, function(err, updatedCampground){
                if(err || !updatedCampground){
                    req.flash("error", "Error updating campground");
                    res.redirect("/campgrounds/" + req.params.id);
                } else {
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});
// DELETE campground
router.delete("/:id", middleware.ownsCampgroundOnly, function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", err?"Error finding campground to delete":"No campground found for deletion");
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            Campground.deleteOne({ _id: foundCampground._id }, function(err){
                if(err){
                    req.flash("error", "Error deleting campground");
                    res.redirect("/campgrounds/" + req.params.id);
                } else {
                    User.findById(foundCampground.author.id, function(err, foundUser){
                        if(!err && foundUser){
                            var campgroundIndex = foundUser.campgrounds.findIndex(function(c){
                                return c.equals(foundCampground._id);
                            })
                            foundUser.campgrounds.splice(campgroundIndex, 1);
                            foundUser.save();
                        } else {
                            req.flash("error", "No user associated with campground");
                        }
                        if(foundCampground.comments.length > 0){
                            Comment.findById(foundCampground.comments[0], function(err, foundComment){
                                if(err || !foundComment){
                                    req.flash("error", "Error finding comments associated with comment");
                                    res.redirect("/campgrounds");
                                } else {
                                    var campgroundInfo = foundComment.campground;
                                    Comment.deleteMany({ campground: campgroundInfo }, function(err){
                                        if(err){
                                            req.flash("error", "Error deleting associated comments")
                                        }
                                        res.redirect("/campgrounds");
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});


module.exports = router;
