// npm install express 
var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function (req,res){
    res.send("Hi there!");
});
// "/bye" => "Goodbye!"
app.get("/bye", function (req,res){
    res.send("Goodbye!");
});

// "/dogs" => "Meow"
app.get("/dogs", function(req,res){
   res.send("Meow"); 
});

app.get("/r/:subredditName", function(req,res){
    var subRed = req.params.subredditName;
   res.send("Welcome to the " + subRed.toUpperCase() + " SubReddit"); 
});
app.get("/r/:subredditName/comments/:id/:title/", function(req,res){
   res.send("Welcome to the title page"); 

});
// all others
app.get("*", function(req,res){
   res.send("You are a star!!"); 
});

//tell Express to listen for requests (start server)
//  port in cloud9 = process.env.PORT = 3000

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("server has started"); 
});
//end server by <ctrl>C