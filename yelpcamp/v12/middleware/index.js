var Campground = require("../models/campground");
var Comment = require("../models/comment");

// all middleware goes here
var middlewareObj = {}

   // check if user logged in for creating a campground
middlewareObj.checkCampgroundOwnership =  function(req, res, next){
    if (req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err){
                res.redirect("back");
            } else {
                // is the user the author of the campground
              if (foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");                   
                    res.redirect("back");
                }
             }
            });
        } else {
            req.flash("error", "You need to be logged in to do that!");           
            res.redirect("back");
        }
};

    // check if user logged in for creating a comment
middlewareObj.checkCommentOwnership = function (req, res, next){
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err){
                req.flash("error", "Campground not found.");
                res.redirect("back");
            } else {
                // is the user the author of the campground
              if (foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
             }
            });
        } else {
            req.flash("error", "You need to be logged in to do that!");
            res.redirect("back");
        }
};

// middleware
middlewareObj.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()){
    return next();
    }
    req.flash("error", "You need to log in to do that!");
    res.redirect("/login");
};

module.exports = middlewareObj;