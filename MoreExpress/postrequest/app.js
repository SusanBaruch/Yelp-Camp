var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

var friends = ["Tony", "Amanda", "Charles", "Lily"];

app.get("/", function(req, res){
    res.render("home");
});

app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});
});

app.post("/addfriend", function(req,res){
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    // for router to give us the req.body, you need to do: npm install body-parser --save
    res.redirect("/friends");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
});