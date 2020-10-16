var express = require("express"),
    monggoose = require("mongoose")

var app = express();
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});





app.get("/", function(req,res){
    res.render("home");
});

app.get("/secret", function(req,res){
    res.render("secret");
});

app.listen(3000, function(){
    console.log("Server started!");
});