var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    { name: "Cloud Grounds",
        image: "http://jameskaiser.com/wp-content/uploads/2014/12/acadia-schoodic-woods-campground.jpg",
        description: "Acacia National Campground is a beautiful, woodsy place."
    },
    { name: "Witch Meadow",
        image: "http://witchmeadowcampground.com/images/home/witchmeadowcampground-parachute-840x464.JPG",
        description: "Lots of air balloons."
    },
    { name: "Ponderosa Meadows",
        image: "https://www.visitnc.com/resimg.php/imgcrop/2/10018/image/800/449/250x166-images-stories-nearponderosa.jpg",
        description: "Bridges in the water."
    }   ]
    
function seedDB(){
    // remove all campgrounds
    Campground.remove({}, function(err){
        if (err){
            console.log(err);
        }
        console.log("you have removed all the campgrounds");
 
     // add campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if (err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                       //add comments
                       Comment.create(
                           {
                           text: "This is a beautiful place to be.",
                           author: "Me"
                           }, function (err, comment){
                                if (err){
                                    console.log(err);
                                } else {
                                    campground.comment.push(comment);
                                    campground.save();
                                    console.log("created new comment");
                                }
                            });
                    }
            });
        });

});
}

module.exports = seedDB;