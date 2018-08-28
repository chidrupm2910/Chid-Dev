var middlewareObj = {};
var Campground= require("../models/campground");
var Comment= require("../models/comment");
middlewareObj.checkCampgroundOwnership = function checkCampgroundOwnership(req, res,next){
        if(req.isAuthenticated()){
        
   
    Campground.findById(req.params.id,function(err, foundCamp){
        if(err){
            res.redirect("back");
        }
        else{
            if(foundCamp.author.id.equals(req.user._id)){
            next();
            }
            else{
                res.redirect("back"); 
            }
        }
    });
 }
 else {
     res.redirect("back");
 }
}

middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res,next){
        if(req.isAuthenticated()){
        
   
          Comment.findById(req.params.comment_id,function(err, foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            if(foundComment.author.id.equals(req.user._id)){
            next();
            }
            else{
                res.redirect("back"); 
            }
        }
    });
 }
 else {
     res.redirect("back");
 }
}

middlewareObj.isLoggedIn = function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;