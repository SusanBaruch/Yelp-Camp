// run these commands in the command line:
//     npm init
//     npm install --save express ejs 
// npm install mongoose --save

var express = require("express"), 
    app=express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");
    
    


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();

app.get("/", function(req,res){
    res.render("landing");
});

// Index - show all campgrounds
app.get("/campgrounds", function(req,res){
    //get all campgrounds
    Campground.find({}, function(err,allCampgrounds){
        if (err){
            console.log(err);
        }
        else {
                res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });

});

// Create - add new campground to DB
app.post("/campgrounds", function(req,res){
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

// New - get form to create new campground
app.get("/campgrounds/new", function(req,res){
    res.render("campgrounds/new");
});

//Show - shows more info about campground
app.get("/campgrounds/:id", function (req,res){
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

// -----------
// Comments routes
//-----------
app.get("/campgrounds/:id/comments/new", function(req,res){
    // find campground id
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
        } else {
        res.render("comments/new", {campground: campground});
         }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
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
    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
    // redirect to show page
                     res.redirect("/campgrounds/" + campground._id);
                }
            });

         }
    });
});



//tell Express to listen for requests (start server)
//  port in cloud9 = process.env.PORT = 3000

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Yelp Camp Server has started"); 
});