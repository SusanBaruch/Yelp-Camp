// run these commands in the command line:
//     npm init
//     npm install express --save
//     npm install ejs --save
//     node app.js


var express=require("express");
var app=express();
//  app.use = use all the files in the public directory
app.use(express.static("public"));
// tell the server that all the files will be ejs files
app.set("view engine", "ejs");


app.get("/", function(req,res){
// home.ejs must be in the views directory; html code
    res.render("home");
//    instead of : res.send()
});

app.get("/doglove/:thing", function(req,res){
    var thing = req.params.thing;
    res.render("love",{thingVar: thing});
});

app.get("/posts", function(req,res){
    var posts = [
        {title: "Post 1", author: "Suzy"},
        {title: "My adorable bunny", author: "Charlie"},
        {title: "Can you believe this dog?", author: "George"}
        ]
        res.render("posts", {posts: posts});
});

//tell Express to listen for requests (start server)
//  port in cloud9 = process.env.PORT = 3000

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("server has started"); 
});