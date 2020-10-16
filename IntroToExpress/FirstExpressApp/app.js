console.log("Our Express App will go here!");
var express = require("express");
var app  = express();

// "/" => "Hi there"
app.get("/", function(req, res){
    res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
    res.send("Goodbye!");
});

// "/dog" => "NEOW!"
app.get("/dog", function(req, res){
    res.send("MEOW!");
    console.log("Someone made a request!");
});

// route parameters-- :subredditName--a pattern not an extact name.
// subreddit can only be string, no more "/"
app.get("/r/:subredditName",function(req, res){
    var subName = req.params.subredditName;
    res.send("Welcome to the "+ subName.toUpperCase() +" sunreddit!");
});

app.get("/r/:subredditName/comments/:id/:title", function(req, res){
    res.send("Welcome to the Comments Page!");
});

app.get("/speak/:animal", function(req, res){
    var sounds = {
        pig: "'oink'",
        cow: "moo",
        dog: "Woof",
        cat: "'I hate you!'"
    }
    var animal = req.params.animal;

    res.send("The " + animal.toLowerCase() + " says " + sounds[animal.toLowerCase()] + "!");
});

app.get("/repeat/:message/:time", function(req, res){
    var message = req.params.message;
    var time = Number(req.params.time);
    var result = "";
    for(var i = 0; i< time; i++){
        result += message + " ";
    }
    res.send(result);
    
});


//wrong address shows: 
// Must be at the end
app.get("*", function(req, res){
    res.send("You are a *! wrong address");
});

// Tell Express to listen for requests (start server)
app.listen(3000, function(){
    console.log("sever has started!");
});