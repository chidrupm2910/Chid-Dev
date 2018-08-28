var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
   // MongoClient= require("mongodb").MongoClient;
    mongoose=require("mongoose");
    
mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true },function(err){
    if(err)
    console.log(err);
    else
    console.log("Mongo Connected");
});
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image:String,
    description: String 
});

var Campground= mongoose.model("Campground",campgroundSchema);

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

app.get("/", function(req, res){
    res.render("landing");
})

//INDEX ROUTE
app.get("/campgrounds", function(req,res){
       //Get all campground from Mongo
       Campground.find({},function(err, allCampgrounds){
           if(err){
               console.log(err);
           }
        res.render("index",{campgrounds :allCampgrounds});
       })
        //res.render("campgrounds",{campgrounds : campgrounds});
});

//CREATE ROUTE
app.post("/campgrounds", function(req, res){
    
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name , image: image, description: description}
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
app.get("/campgrounds/new",function(req,res){
    res.render("new");
});

//SHOW ROUTE
app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id, function(err, foundCamp){
        if(err){
            console.log(err);
        }
        else{
            res.render("show", {campground: foundCamp})
        }
    });
    
});


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelp Camp has started");
});