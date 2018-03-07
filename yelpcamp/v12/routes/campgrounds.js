var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// Index - show all campgrounds
router.get("/", function(req,res){
    //get all campgrounds
    Campground.find({}, function(err,allCampgrounds){
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// campground route: Create - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req,res){
    // get data from form and add to campground array
    //redirect back to campgrounds page
    //npm install body-parser --save
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   console.log(req.user);
   var auth = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name: name, image: image, description: desc, author: auth};

 // create new campground and save to database
 Campground.create(newCampground, function(err, newlyCreated){
     if (err){
         console.log(err);
     } else {
         console.log(newlyCreated);
        // redirect to campground page
        res.redirect("/campgrounds"); 
     }
 });
});

// campground New route - get form to create new campground
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//campground id route - shows more info about campground
router.get("/:id", function (req,res){
        // find the campground with provided ID
            Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
            if (err){
                console.log (err);
            } else {
        // render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
            }
        });  
});
// edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err){
            res.redirect("back");
        }  else {
            res.render("campgrounds/edit", {campground: foundCampground});   
        }
    });
});

// update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    // find and update
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampgrounds){
        if (err){
            res.redirect("/campgrounds");
            } else {
                res.redirect("/campgrounds/" + req.params.id);
            }
    });
});

// destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;