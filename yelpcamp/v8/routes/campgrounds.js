var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

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
router.post("/", isLoggedIn, function(req,res){
    // get data from form and add to campground array
    //redirect back to campgrounds page
    //npm install body-parser --save
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image: image, description: desc};
 // create new campground and save to database
 Campground.create(newCampground, function(err, newlyCreated){
     if (err){
         console.log(err);
     } else {
        // redirect to campground page
        res.redirect("/campgrounds"); 
     }
 });
});

// campground New route - get form to create new campground
router.get("/new", isLoggedIn, function(req,res){
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

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
    return next();
    }
    res.redirect("/login");
}

module.exports = router;