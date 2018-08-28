var express = require("express");
var app = express();
app.set("view engine","ejs");
var bodyParser = require("body-parser");

var campgrounds = [
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

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req,res){
    
        res.render("campgrounds",{campgrounds : campgrounds});
});

app.post("/campgrounds", function(req, res){
    
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name , image: image}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
    res.render("new");
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelp Camp has started");
});