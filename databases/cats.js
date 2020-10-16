var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connect to DB!"))
.catch( error => console.log(error.messaage));

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// search cat_app database:
    // find: return 
    // else: make a new db called "cat_app" and return 

// adding an new cat to the databases

// ------------------(一)---------------
// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// george.save(function(err, cat){
//     if(err){
//         console.log("somthing wrong");
//     }
//     else{
//         console.log("We just saved a cat to the DB:");
//         console.log(cat);
//     }
// });


// ------------------(二)---------------
Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "nice"
}, function(err, cat){
    if(err){
        console.log(err);
    }
    else{
        
        console.log(cat);
    }
});


// retrieve all cats from the databases and console.log each one

Cat.find({}, function(err, cats){
    if(err){
        console.log("Oh No!");
        console.log(err);
    }
    else{
        console.log("All cats:");
        console.log(cats);
    }
});