var mongoose = require("mongoose");
// connect to a database and if it doesn't exist, 
mongoose.connect("mongodb://localhost/cat_app");

// database template
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String});
    
var Cat = mongoose.model("Cat", catSchema);

// add data to DB
//var george = new Cat ({
//    name: "Mrs. Noriss",
//    age: 7,
//    temperament: "Evil" });
    
//george.save(function(err,cat){
//    if (err){
//        console.log("You made an error");
//    }
//    else {
//        console.log("You just saved to the database: ");
//        console.log(cat);
//    }
// });

// create and save
Cat.create({
    name: "Snow White",
    age: 10,
    temperament: "Nice" 
    }, function (err, cat){
        if (err){
            console.log("You made an error");
         }
        else {
        console.log("You just saved to the database: ");
        console.log(cat);
        }
 });

//retrieve data from DB
Cat.find({},  function (err, cats){
    if (err){
        console.log("Error! ");
        console.log(err);
    } else {
        console.log("All the cats: ");
        console.log(cats);
    }
    
});