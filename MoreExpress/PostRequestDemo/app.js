var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "zhonghao"];

app.get("/", function(req, res){
    console.log("home page");
    // res.send("This is home page");
    res.render("home");

});

// 1.到"/friends"-->
// 2.调用”friends.ejs"--> 
// 3.creat a form with <input> newfriend = "ZZH" & action = 链接到"/addFriend"-->
// 4.每次新进入"/addFriend" 都调用app.post（）， 取req.body.newfriend放入friends中 & 刷新“/friends"。-->
// 5.调用到"/friends"。
app.get("/friends", function(req, res){
    res.render("friends", {friends:friends});
});

app.post("/addFriend", function(req, res){
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});



app.listen(3000, function(){
    console.log("PostRequest:server is listening!");
});