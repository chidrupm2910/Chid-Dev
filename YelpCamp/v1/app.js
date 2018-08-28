var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
   // MongoClient= require("mongodb").MongoClient;
    mongoose=require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    //Schema Setup
    Campground = require("./models/campground.js"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    methodOverride = require("method-override"),
    seedDB = require("./seeds.js");
    
//seedDB();
    
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campground"),
    indexRoutes = require("./routes/index");
    
mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true },function(err){
    if(err)
    console.log(err);
    else
    console.log("Mongo Connected");
});
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

//passport configuration
app.use(require("express-session")({
    secret: " Anything we want",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
    });
    
    
app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelp Camp has started");
}); 

/*Campground.create(
        {name : "Yosemite", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f4c97fa0ecb1b0_340.jpg"},
        function(err,campground){
            if(err)
            console.log(err);
            
            else
            console.log("Newly Created Campground");
        });*/
    

/*var campgrounds = [
        {name : "Fossil Creek", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f4c97fa0ecb1b0_340.jpg"},
        {name : "Lake Tahoe", image: "https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104496f4c97fa0ecb1b0_340.jpg"},
        {name : "Yosemite", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f4c97fa0ecb1b0_340.jpg"},
        {name : "Fossil Creek", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f4c97fa0ecb1b0_340.jpg"},
        {name : "Lake Tahoe", image: "https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104496f4c97fa0ecb1b0_340.jpg"},
        {name : "Yosemite", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f4c97fa0ecb1b0_340.jpg"},
        {name : "Fossil Creek", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f4c97fa0ecb1b0_340.jpg"},
        {name : "Lake Tahoe", image: "https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104496f4c97fa0ecb1b0_340.jpg"},
        {name : "Yosemite", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f4c97fa0ecb1b0_340.jpg"}
        ];
*/

