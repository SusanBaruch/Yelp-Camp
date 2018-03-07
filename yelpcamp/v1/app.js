// run these commands in the command line:
//     npm init
//     npm install --save express ejs 

var express = require("express");
var app=express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("landing");
});
    var campgrounds = [
        {name: "Salmon Creek", image:"https://europeinbudget.files.wordpress.com/2010/10/the-campgrounds-gaasper.jpg"},
        {name: "Blue Creek", image:"http://21zfbaky162t2fou2u3pmsri4-wpengine.netdna-ssl.com/wp-content/uploads/2013/04/20121023_151802.jpg"},
        {name: "Grand Hill", image:"http://www.lake-grapevine.com/wp-content/uploads/2010/11/Vineyards-Cabins.jpg"},
        {name: "Salmon Creek", image:"https://europeinbudget.files.wordpress.com/2010/10/the-campgrounds-gaasper.jpg"},
        {name: "Blue Creek", image:"http://21zfbaky162t2fou2u3pmsri4-wpengine.netdna-ssl.com/wp-content/uploads/2013/04/20121023_151802.jpg"},
        {name: "Grand Hill", image:"http://www.lake-grapevine.com/wp-content/uploads/2010/11/Vineyards-Cabins.jpg"}
        ];
        
app.get("/campgrounds", function(req,res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req,res){
    // get data from form and add to campground array
    //redirect back to campgrounds page
    //npm install body-parser --save
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image};
   campgrounds.push(newCampground);
   res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});



//tell Express to listen for requests (start server)
//  port in cloud9 = process.env.PORT = 3000

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Yelp Camp Server has started"); 
});