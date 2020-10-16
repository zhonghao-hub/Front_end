var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("homes");
    // res.send("<h1>Welcome to the home page!</h1> <h2>blah blah</h2>");
});

app.get("/fallInLoveWith/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("love", {thingVar: thing});
    // 在love.ejs中， thingVar 对应于这里的ting
    // res.send("You fall in love with " + thingVar);

});

app.get("/posts", function(req, res){
    var posts = [
        {title: "Post1", author: "Susy1"},
        {title: "Post2", author: "Susy2"},
        {title: "Post3", author: "Susy3"},
    ]
    res.render("posts", {posts: posts});
});

app.listen(3000, function(){
    console.log("Server is listening!");

});