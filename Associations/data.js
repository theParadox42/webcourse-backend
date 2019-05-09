
// Mongoose
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
    useNewUrlParser: true
}).catch(function(e){
    console.log("Error occured connecting to mongodb");
	console.log(e);
});

// user
var userSchema = new mongoose.Schema({
    email: String,
    name: String
});

var User = mongoose.model("User", userSchema);

//POST
var postSchema = new mongoose.Schema({
    title: String,
    content: String,
});
var postModel = new mongoose.model("post", postSchema)