// run these commands in the command line:
//     npm init
//     npm install --save express ejs 
// npm install mongoose --save

var express = require("express"), 
    app=express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// schema set up
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
    
var Campground = mongoose.model( "Campground", campgroundSchema);

//Campground.create({
//    name: "Grand Hill", 
//    image:"http://www.lake-grapevine.com/wp-content/uploads/2010/11/Vineyards-Cabins.jpg",
//    description: "This is a beautiful campground with granite, no water, no bathrooms."
//},
//    function(err,campground){
//       if (err){
//            console.log(err);
//        }
//        else {
//            console.log("Newly created Campground: ");
//            console.log(campground);
//        }
//    });

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
                res.render("index", {campgrounds: allCampgrounds});
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
    res.render("new.ejs");
});

//Show - shows more info about campground
app.get("/campgrounds/:id", function (req,res){
        // find the campground with provided ID
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err){
                console.log (err);
            } else {
        // render show template with that campground
            res.render("show", {campground: foundCampground});
            }
        });  
});

//tell Express to listen for requests (start server)
//  port in cloud9 = process.env.PORT = 3000

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Yelp Camp Server has started"); 
});