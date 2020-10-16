var mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    express = require("express"),
    app = express(),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer")

//App Config 
mongoose.connect("mongodb://localhost/restful_blog_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride("_method"));
app.use(expressSanitizer());

// Mongoose/Model Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, dafault: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL Routes
// Blog.create({
//     title: "testblog",
//     image: "https://www.lokeshdhakar.com/projects/lightbox2/images/image-3.jpg",
//     body: "Hello this is a blog post"
// });

// Index route
app.get("/", function(req, res){
    res.redirect("blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }
        else{
            res.render("index", {blogs: blogs});
        }
    });
});

//New route
app.get("/blogs/new", function(req, res){
    res.render("new");
});

//Create route
app.post("/blogs", function(req, res){
    // create Blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        }
        else{
            // TouchEvent, redirect to the index 
            res.redirect("/blogs");
        }
    });
    
});


// SHOW route 
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("show", {blog: foundBlog});
        }
    });
});

//Edit route
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("edit", {blog: foundBlog});
        }
    }); 
});


//Update route
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// Destory route
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



app.listen(3000, function(){
    console.log("Server has started!");
});

