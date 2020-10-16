#Rendering HTML and Templates

* What EJS is?
    .ejs文件其实就是.html文件
    

在app.js 文件中：
    1. 调用express framework 并叫它app
        var express = require("express");
        var app = express();
    2. 告诉app， 默认所有.css文件都放到了"public"文件中了：
        app.use(express.static("public"));
    3. 默认所有没有后缀的文件调用时的后缀是.ejs
        app.set("view engine", "ejs");
    4. body-parser：passing arg back and forth 
        var bodyParser = require("body-parser");
        app.use(bodyParser.urlencoded({extended: true}));

        app.post("/addFriend", function(req, res){
            var newFriend = req.body.newfriend;
        });//这里的newfriend是在.ejs文件中pass进来的
    5. Mongoose
        var mongoose = require("mongoose");
        mongoose.connect("mongodb://localhost/cat_app", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        <!-- .then(() => console.log("Connect to DB!")) -->
        <!-- .catch( error => console.log(error.messaage)); -->

        var catSchema = new mongoose.Schema({
            name: String,
            age: Number,
            temperament: String
        });

        //generate cats collections 
        var Cat = mongoose.model("Cat", catSchema);

        1).Create()
            Cat.create({
                name: "Snow White",
                age: 15,
                temperament: "nice"
            }, function(err, cat){
                if(err){
                    console.log(err);
                }
                else{
                    // cat 是新加入的一项，即{name: "Snow White",age: 15,temperament: "nice"}
                    console.log(cat);
                }
            });

        2).Find()
            Campground.find({}, function(err, cats){
                if(err){
                    console.log(err);
                }
                else{
                    res.render("cats", {cats: cats});
                }  
            });

<!-- =========================================================================================== -->
    5. res.render() to render HTML(from an EJS file)
        res.render("home");
    6. Pass variables to EJS templates
        res.render("love.ejs", {thingVar: thing});
    7. res.redirect()
        res.redirect("/friends");
        跳转到“/friends"
<!-- =========================================================================================== -->
    8. app.get
        app.get("/", function(req, res){
            res.send("This is home page");//send a message
            res.render("home", {Var: var});//Pass variables to EJS templates
        });
    9. app.post
        app.post("/addFriend", function(req, res){
            var newFriend = req.body.newfriend;
            friends.push(newFriend);
            res.redirect("/friends");
        });

        <!-- 循环！！！ -->
        // 1).到"/friends"-->
        // 2).调用”friends.ejs"--> 
        // 3).creat a form with <input> newfriend = "ZZH" & action = 链接到"/addFriend"-->
        // 4).每次新进入"/addFriend" 都调用app.post（）， 取req.body.newfriend放入friends中 & 刷新“/friends"。-->
        // 5).调用到"/friends"。
            <!-- app.get("/friends", function(req, res){
                res.render("friends", {friends:friends});
            });

            app.post("/addFriend", function(req, res){
                var newFriend = req.body.newfriend;
                friends.push(newFriend);
                res.redirect("/friends");
            }); -->
            
    10. findById()
        app.get("/campgrounds/:id", function(req, res){
            // Find the campgrounds with provided id
            Campground.findById(req.params.id, function(err, foundCampground){
                if(err){
                    console.log(err);
                }
                else{
                    // render show template with that campground 
                    res.render("show", {campground: foundCampground});
                }
            });
        
        
        });

    10. 设置端口（3000）
        app.listen(3000, function(){
            console.log("PostRequest:server is listening!");
        });



    

在.ejs 文件中：
就是正常的写html文件， 但所有的.ejs文件都要放在views文件夹中，然后用app.js文件调用这些文件夹
    1. link .css文件（）与app.js中的app.use呼应：
        <link  rel="stylesheet" href="/app.css">， “/”一定要写！！！
    2. 包含另一个.ejs文件， 一般用于header.ejs and footer.ejs, 所以<link>可以写在这里
        <%- include("partials/header") %>
    3. form
        <form action="/addFriend" method="POST">
        <!-- 对应app.post("/addFriend", function(req, res){}）； -->
            <input type="text" placeholder="name" name="newfriend">
            <!-- 对应req.body.newfriend，  here newfriend = "输入的名字" -->
            <button>A new friend</button>
        </form>

    2. <%= %>: is treated as javascript containing 传进来的var-
       <% %>: if use logic（if/while/.forEach()） inside, don't use "=" , 所有的logic的[], {}, () 都要括起来
       <%- %>: treat to content as javascript/html file