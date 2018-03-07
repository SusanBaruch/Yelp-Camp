// run these commands in the command line:
//     npm init
//     npm install --save express ejs 
// npm install mongoose --save

var express         = require("express"), 
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");
    
var commentRoutes   = require("./routes/comments"),
    campgroundRoutes= require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
    
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/final_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//  seed the database - used in developing before you create the buttons to add manually
//seedDB();

// used with passport config & flash
app.use(require("express-session")({
    secret: "this is my secret file",
    resave: false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// end pasport config
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/", indexRoutes);

//tell Express to listen for requests (start server)
//  port in cloud9 = process.env.PORT = 3000

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Yelp Camp Server has started"); 
});