var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Post - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

// User - email name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]

// format：
// {
//     email: "ningbo@mcgill.ca",
//     name: "ningbo",
//     posts: [
//         {title: "NB", content: "nnnnbbbb"},
//         {title: "NB", content: "nnnnbbbb"},
//         {title: "NB", content: "nnnnbbbb"},
//         {title: "NB", content: "nnnnbbbb"},
//     ]
// }

});

var User = mongoose.model("User", userSchema);

// -------creat a new post：
// var newPost = new Post({
//     title: "Refelections on Apples",
//     content: "they are delicious"
// }); 

// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(post);
//     }
// });

// ------- creat new user & embed post into user：=========(一)==========
// var newUser = new User({
//     email: "songge@mcgill.ca",
//     name: "Jinsong zhang",
// });

// newUser.posts.push({
//     title: "How to bre potion",
//     content: "go to class"
// });

// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// });

// ------- creat new user & embed post into user：=========(二)==========
// User.findOne({name: "Jinsong zhang"}, function(err, user){
//     if(err){
//         console.log(err);
//     }else{
//         user.posts.push({
//             title:"three things I hate",
//             content: "1, 2, 3"
//         });
//         user.save(function(err, user){
//             if(err){
//                 console.log(user);
//             }else{
//                 console.log(user);
//             }
//         });
//     }
// });





