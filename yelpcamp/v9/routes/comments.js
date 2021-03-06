
var Campground = require("../models/campground");
var Comment = require("../models/comment");

var express = require("express");
var router = express.Router({mergeParams: true});

// Comments new routes
router.get("/new", isLoggedIn, function(req,res){
    // find campground id
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
        } else {
        res.render("comments/new", {campground: campground});
         }
    });
});

// Comments routes
router.post("/", isLoggedIn, function(req, res){
    // lookup campground using id
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
     // create new comments
            Comment.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err);
                } else {
        // add username and id
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
    // save new comment to campground
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
    // redirect to show page
                     res.redirect("/campgrounds/" + campground._id);
                }
            });

         }
    });
});

// middleware
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
    return next();
    }
    res.redirect("/login");
}

module.exports = router;