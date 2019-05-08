var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/cat_app', {
    useNewUrlParser: true
}).catch(function(e){
    console.log("Error occured connecting");
	console.log(e);
});


var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    cuteness: Number
});

var Cat = mongoose.model("Cat", catSchema);

Cat.create({
    name: "Snow white",
    age: 5,
    cuteness: 2,
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log("cat created");
        console.log(cat);
    }
});

//Add a cat
// var george = new Cat({
//     name: "fred",
//     age: 2,
//     cuteness: 1,
// })

// george.save(function(err, cat){
//     if (err) {
//         console.log("Something went wrong adding a cat");
//     } else {
//         console.log("Cat added");
//         console.log(cat);
//     }
// });

//Get all cats
Cat.find({}, function(err, cats){
    if(err){
        console.log("Error occured fetching cats");
        console.log(err);
    } else {
        console.log("Cats");
        console.log(cats);
    }
});