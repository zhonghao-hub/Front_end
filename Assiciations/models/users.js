var mongoose = require("mongoose");
// User - email name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]

// format：
// {
//     email: "ningbo@mcgill.ca",
//     name: "ningbo",
//     posts: [
//         123654654,
//         12rfederiu527980,
//         12rfederiu527980
//     ]
// }
// 
// {
//     id: 123654654,
//     title: "hjkl",
//     content: "fghjikoalkfnd"
// }

});

module.exports = mongoose.model("User", userSchema);
