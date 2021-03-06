var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var geocoder = require('geocoder');

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
   var author = {
       id: req.user._id,
       username: req.user.username
   };
    var cost = req.body.cost;
     
 //   geocoder.geocode(req.body.location, function (err, data) {
  //      var lat = data.results[0].geometry.location.lat;
  //      var lng = data.results[0].geometry.location.lng;
 //       var location = data.results[0].formatted_address;

        var newCampground = {name: name, image: image, description: desc, cost: cost, author: author, location: location, lat: lat, lng: lng};     
 //  var newCampground = {name: name, price: price, image: image, description: desc, author: auth};

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
//});

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
            req.flash("error", "You don't have permission to do that!");
            res.redirect("back");
        }  else {
            res.render("campgrounds/edit", {campground: foundCampground});   
        }
    });
});

// update campground route
router.put("/:id", function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, cost: req.body.cost, location: location, lat: lat, lng: lng};
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
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