var express = require("express");
var app = express();

var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("search");
});



app.get("/results", function(req,res){
    // res.send("Hello it works!");
    var search = req.query.search;
    request("http://www.omdbapi.com/?s=" + search + "&apikey=thewdb", function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {data:data});
        }
    });
});


app.listen(3000, function(){
    console.log("movie app started!");
});