var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true }).catch(function(e){
	console.log(e);
}); 


var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    cuteness: Number
});

var Cat = mongoose.model("Cat", catSchema);

//Add a cat

var george = new Cat({
<<<<<<< HEAD
    name: "Nutmeg",
    age: 2,
    cuteness: 3,
})
=======
    name: "George",
    age: 50,
    cuteness: 0.1,
});
>>>>>>> d400851bd21167079b57f0934a2a16653d79e0ef

george.save(function(err, cat){
    if (err) {
        console.log("Something went wrong adding a cat");
    } else {
        console.log("Cat added");
        console.log(cat);
    }
});

//Get all cats
