var mongoose = require("mongoose");
const { getMaxListeners } = require("process");
mongoose.connect("mongodb://localhost/blog_demo_2", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var Post = require("./models/posts");//refer to "./models/posts.js"
var User = require("./models/users");


// //create(I)
// User.create({
//     email: "bob@gmail.com",
//     name: "Bob"
// });

// //create(II)
// Post.create({
//     title: "How to cook the best burger Part.4",
//     content: "blahfghjkl..."
// }, function(err, post){
//     User.findOne({name: "Bob"}, function(err, foundUser){
//         if(err){
//             console.log(err);
//         }else{
//             foundUser.posts.push(post);
//             foundUser.save(function(err, data){
//                 if(err){
//                     console.log(err);
//                 }else{
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });


// Find user --> populate:遍历每一个element --> exec：对于每一个遍历的element，执行function
// Find all posts for that user
// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// });





