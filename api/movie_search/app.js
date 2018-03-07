// run these commands in the command line:
//     npm init
//     npm install --save express ejs request


//  app.use = use all the files in the public directory
//app.use(express.static("public"));
// tell the server that all the files will be ejs files
//app.set("view engine", "ejs");

var express = require("express");
var app=express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("search");
});

app.get("/results", function(req,res){
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + query;
    request(url, function (error, response, body) {

        if (!error && response.statusCode === 200) {

         var data = JSON.parse(body);
         res.render("results",{data: data});
//           res.send(parsedData["Search"][0]["Title"]);
      }
    
    });
});
//tell Express to listen for requests (start server)
//  port in cloud9 = process.env.PORT = 3000

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("movie app has started"); 
});