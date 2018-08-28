var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//INDEX ROUTE
router.get("/", function(req,res){
       //Get all campground from Mongo
       Campground.find({},function(err, allCampgrounds){
           if(err){
               console.log(err);
           }
        res.render("campgrounds/index",{campgrounds :allCampgrounds, currentUser: req.user});
       });
        //res.render("campgrounds",{campgrounds : campgrounds});
});

//CREATE ROUTE
router.post("/",isLoggedIn, function(req, res){
    
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name , image: image, description: description, author: author};
    Campground.create(newCampground,function(err, camp){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    });
    //campgrounds.push(newCampground);
    
});


//NEW ROUTE
router.get("/new",isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

//SHOW ROUTE
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err){
            console.log(err);
        }
        else{
            
            res.render("campgrounds/show", {campground: foundCamp});
        }
    });
    
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports= router;

