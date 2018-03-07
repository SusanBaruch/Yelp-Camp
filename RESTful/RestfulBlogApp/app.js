var bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  expressSanitizer = require("express-sanitizer"),
  mongoose = require("mongoose"),
  express = require("express"),
  app = express();

  
  mongoose.connect("mongodb://localhost/restful_blog_app");
  app.set("view engine", "ejs");
  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({extended: true}));
  // npm install express-sanitizer --save
  app.use(expressSanitizer());
// npm install method-override --save
  app.use(methodOverride("_method"));
  
  //mongoose model config
  var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
  });
  var Blog = mongoose.model("Blog", blogSchema);
  
//  Blog.create({
//    title: "Test blog",
//    image: "https://unsplash.com/collections/728/dogs?photo=UUcQywVQhMI",
//    body: "Test blog body"
//  });
  
  // RESTful routes
  
  app.get("/", function(req,res){
    res.redirect("/blogs");
  });
  
  // index routes
  app.get("/blogs", function(req,res){
      Blog.find({}, function(err,blogs){
        if(err){
          console.log("Error!");
        } else {
          res.render("index", {blogs: blogs});
        }
      });
  });
  
  // new route
    app.get("/blogs/new", function(req,res){
      res.render("new");
    });
  
  // create route
  app.post("/blogs", function(req,res){
    // create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
      if (err) {
        res.render("new");
      } else 
          //then redirect 
      res.redirect("/blogs");
    });
  });

  //show route
  app.get("/blogs/:id", function(req,res){
//  res.send("show page!!!!!");
      Blog.findById(req.params.id, function(err,foundBlog){
     if (err){
        res.redirect("/blogs");
      } else {
        res.render("shows", {blog: foundBlog});
      }
    });
  });
  
  // edit route
  app.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id, function(err,foundBlog){
      if (err){
        res.redirect("/blogs");
      } else {
        res.render("edit", {blog: foundBlog});
      }
    });
  });
  
  // update route
  app.put("/blogs/:id", function(req,res){
        req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
      if (err){
        res.redirect("/blogs");
      } else {
        res.redirect("/blogs/" + req.params.id);
      }
   });
  });
  
  // delete route
  app.delete("/blogs/:id", function(req,res){
    //destroy blog
    //redirect
    Blog.findByIdAndRemove(req.params.id, function(err){
      if (err) {
        res.redirect("/blogs/");
      } else {
        res.redirect("/blogs");
      }
    });
  });
  
  app.listen(process.env.PORT, process.env.IP, function(){
      console.log("server is running");
  });
