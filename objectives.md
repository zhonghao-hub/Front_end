#Rendering HTML and Templates

* What EJS is?
    .ejs文件其实就是.html文件
    

在app.js 文件中：
    1. 调用express framework 并叫它app
        var express = require("express");
        var app = express();
    2. 告诉app， 默认所有.css文件都放到了"public"文件中了：
        app.use(express.static(__dirname + "public"));
        //__dirname: current project directory
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
    6. method-override
        var = methodOverride = require("method-override");
        app.use(methodOverride("_method"));

    7. express-sanitizer
        var = expressSanitizer = require("express-sanitizer");
        app.use(expressSanitizer());

    8. module.exports = mongoose.model("Post", postSchema);
        var Post = require("./models/posts");
        在相应的posts.js中：
            var mongoose = require("mongoose");
            var postSchema = new mongoose.Schema({
                title: String,
                content: String
            });

            module.exports = mongoose.model("Post", postSchema);
    
    9. Passport
        var passport = require("passport"),
            LocalStrategy = require("passport-local"),
            User = require("./models/user")//save the User model in to ""./models/user".js"
        // Passport Configuration
        app.use(require("express-session")({
            secret:"Say anything you want",
            resave: false,
            saveUninitialized: false
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        passport.use(new LocalStrategy(User.authenticate()));
        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());

        // Auth Route
        //I. Register(Sign Up)
        // 1)show register form
        app.get("/register", function(req, res){
            res.render("register");
        });
        // 2)handle sign up logic
        app.post("/register", function(req, res){
            var newUser = new User({username: req.body.username});
            User.register(newUser, req.body.password, function(err, user){
                if(err){
                    console.log(err);
                    return res.render("register");
                }
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/campgrounds");
                });
            });
        });

        //II.login
        // 1)show login form
        app.get("/login", function(req, res){
            res.render("login");
        });
        // 2)handle lopgin logic
        app.post("/login", passport.authenticate("local", 
            {
                successRedirect:"/campgrounds",
                failureRedirect: "/login"
            }
            ), function(req, res){
        });
        
        // III. log out
        // add log out route
        app.get("/logout", function(req, res){
            req.logout();
            res.redirect("/campgrounds");
        });

        //用来限制，若没login， 则不能执行function， called middlewhere， 
        //用来放在前面的app.get()/app.post()中
        function isLoggedIn(req, res, next){
            if(req.isAuthenticated()){
                return next();
            }
            res.redirect("/login");
        }

        在user.js中：
            var mongoose = require("mongoose");
            var passportLocalMongoose = require("passport-local-mongoose");//require passport-local-mongoose

            var UserSchema = new mongoose.Schema({
                username: String,
                password: String
            });

            UserSchema.plugin(passportLocalMongoose);//add passport-local-Mongoose functions into UserSchema

            module.exports = mongoose.model("User", UserSchema);

    10. let all files have currentUser variable
        app.use(function(req, res, next){
            res.locals.currentUser = req.user;
            next();
        });

    11. requiring routes I
        var indexRoute = require("./routes/index");
        app.use("/", indexRoute);

    12. connect-flash//用于一次性的小信息提示
        var flash = require("connect-flash");
        app.use(flash());

        //every file can access <%= message %>, which is defined before "redirect"
        app.use(function(req, res, next){
            res.locals.message = req.flash("error");
            next();
        });

        //在应用到的地方定义：
        middlewareObj.isLoggedIn = function(req, res, next){
            if(req.isAuthenticated()){
                return next();
            }
            req.flash("error", "Please Login First!");///--<---<---<-----add every time we show a message before redirect them
            res.redirect("/login");
        }
        //在对应的.ejs file中 直接调用message(可以直接加到header中)
        <div class="container">
            <% if( error && error.length > 0){%><!-- error can be empty -->
                <div class="alert alert-danger" role="alert"><%= error %></div>
            <% }%>
            <% if( success && success.length > 0){%>
            <div class="alert alert-success" role="alert"><%= success %></div>
            <% }%>
        </div>



<!-- =========================================================================================== -->
    7. res.render() to render HTML(from an EJS file)
        res.render("home");
    8. Pass variables to EJS templates
        res.render("love.ejs", {thingVar: thing});
    9. res.redirect()
        res.redirect("/friends");
        跳转到“/friends"
    10. back
        //redirect back to the previous page
        res.redirect("back");
    10. findById()
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

    11. findByIdAndUpdate()
        Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs/" + req.params.id);
        }
    });

    12. findByIdAndDelete()
        Blog.findByIdAndRemove(req.params.id, function(err){
            if(err){
                res.redirect("/blogs");
            }else{
                //redirect
                res.redirect("/blogs");
            }
        });

    13. findOne()
        User.findOne({name: "Jinsong zhang"}, function(err, user){
            if(err){
                console.log(err);
            }else{
                console.log(user);
            }
        });
    14. .populate().exec()
        // Find user --> populate:遍历每一个element --> exec：对于每一个遍历的element，执行function
        // Find all posts for that user
        User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){//只有这样user里面的“posts”才能传过去
            if(err){
                console.log(err);
            }else{
                console.log(user);
            }
        });

    14. req.sanitize()
    <!-- delete bad html script eg. alert("") -->
        req.body.blog.body = req.sanitize(req.body.blog.body);

    15. login后， 调用当前的user信息
        req.user._id;
        req.user.username;
<!-- =========================================================================================== -->
    13. app.get
        app.get("/", function(req, res){
            res.send("This is home page");//send a message
            res.render("home", {Var: var});//Pass variables to EJS templates
        });
    14. app.post
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
    15. app.put
    <!-- -------!!in form:
                overwrite POST request to PUT request
                <form class="ui form" action="/blogs/<%= blog._id%>?_method=PUT" method="POST"> -->

        app.put("/blogs/:id", function(req, res){
            Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
                if(err){
                    res.redirect("/blogs");
                }
                else{
                    res.redirect("/blogs/" + req.params.id);
                }
            });
        });
    
    16. app.delete
        app.delete("/blogs/:id", function(req, res){
            //destory blog
            Blog.findByIdAndRemove(req.params.id, function(err){
                if(err){
                    res.redirect("/blogs");
                }else{
                    //redirect
                    res.redirect("/blogs");
                }
            });
        });
            
    
    17. 设置端口（3000）
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

    4. <%= %>: is treated as javascript containing 传进来的var-
       <% %>: if use logic（if/while/.forEach()） inside, don't use "=" , 所有的logic的[], {}, () 都要括起来
       <%- %>: treat to content as javascript/html file
    
    5. overwrite POST request to PUT request
        <!-- html file don't support any other than .get() or .post() request -->
        <form class="ui form" action="/blogs/<%= blog._id%>?_method=PUT" method="POST">