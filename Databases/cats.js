var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true }); 


var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    cuteness: Number
})

var Cat = mongoose.model("Cat", catSchema);

//Add a cat

var george = new Cat({
    name: "Nutmeg",
    age: 2,
    cuteness: 3,
})

george.save(function(err, cat){
    if (err) {
        console.log("Something went wrong adding a cat")
    } else {
        console.log("Cat added")
        console.log(cat)
    }
});

//Get all cats
