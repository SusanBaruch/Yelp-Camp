
//  Create a package.json using ‘npm init’ and add express as a dependency:

// 'npm init' = create the package.json
// 'npm install express --save' = will add express to the package.json
//  my directory and file is: bootcampproj/IntroToExpress/ex_app/app.js
// $ Node app.js

// 3. In your main app.js file, add 3 different routes:

var express = require("express");
var app = express();

// visiting “/” should print “his there, welcome to my assignment!”
app.get("/", function (req,res){
    res.send("Hi there, welcome to my assignment!");
});
//======================================
// visiting “/speak/pig” should print “The pig says ‘oink’”
// visiting “/speak/cow” should print “The cow says ‘moo’”
// visiting “/speak/dog” should print “the dog says ‘woof woof!’”
app.get("/speak/:animal", function(req,res){
    var animalName = req.params.animal.toLowerCase();
    var sounds = {
        pig: "oink",
        cow: "moo",
        dog: "woof woof",
        cat: "meow"
        };
    var sound = sounds[animalName];

   res.send("The " + animalName + " says '" + sound +"'"); 
});
//================================
// visiting “/repeat/hello/3” should print “hello hello hello”
// visiting “/repeat/hello/5” should print “hello hello hello hello hello”
// Visiting “/repeat/blah/2” should print “blah blah”

app.get("/repeat/:word/:times", function(req,res){
    var expression = req.params.word;
    var numb = Number(req.params.times);
    var string = "";
    for (var i=0; i< numb; i++){
        string += expression + " "; 
    }
    res.send(string); 
});
//=======================================
// if a user visits any other route, print:
// “sorry, page not found..What are you doing with your life?”
app.get("*", function(req,res){
   res.send("Sorry, page not found..What are you doing with your life?"); 
});

//tell Express to listen for requests (start server)
//  port in cloud9 = process.env.PORT = 3000
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("server has started"); 
});


