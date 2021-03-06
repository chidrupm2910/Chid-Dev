var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware"); // automatically imports index.js

//INDEX ROUTE
router.get("/",function(req,res){
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
router.post("/",middleware.isLoggedIn, function(req, res){
    
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price= req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name ,price: price, image: image, description: description, author: author};
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
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

//SHOW ROUTE
router.get("/:id",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err){
            console.log(err);
        }
        else{
            
            res.render("campgrounds/show", {campground: foundCamp});
        }
    });
    
});

//EDIT route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res){
        
    Campground.findById(req.params.id, function(err, foundCamp){
        if(err){
            res.redirect("/campgrounds");
        }
        
    else {    
    res.render("campgrounds/edit", {campground: foundCamp});
    }
           });
});
//Update Route

router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
    console.log("error 1");
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
        if(err){
            res.redirect("/campgrounds");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


//Destro route

router.delete("/:id",middleware.checkCampgroundOwnership,function(req, res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
            
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});





module.exports= router;

