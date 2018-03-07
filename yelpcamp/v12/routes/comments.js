
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

var express = require("express");
var router = express.Router({mergeParams: true});

// Comments new routes
router.get("/new", middleware.isLoggedIn, function(req,res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
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
                req.flash("success", "Successfully created a campground comment.");
     // redirect to show page
                res.redirect("/campgrounds/" + campground._id);
                }
            });
         }
    });
});

// comments edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment}); 
        }
    });
});

// comments update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

// comments delete route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err){
            res.redirect("back");
        } else {
            req.flash("success", "You have successfully deleted the comment");
            res.redirect("/campgrounds/"+ req.params.id);
        }
        
    });
});

module.exports = router;