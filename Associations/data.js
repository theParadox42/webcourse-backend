
// Mongoose
var mongoose = require("mongoose");
mongoose.connect('mongodb+srv://public:123@associations-mddjv.mongodb.net/data?retryWrites=true&w=majority', {
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
    content: String
});
var Post = mongoose.model("Post", postSchema);

var newPost = new Post({
    title: "Apples",
    content: "Yummy"
})
newPost.save(function(err, post){
    if(err){
        console.log("Error", err);
    } else {
        console.log("New Post!", post)
    }
});

// var newUser = new User({
//     email: "fred@me.com",
//     name: "Fred McGuffin"
// })
// newUser.save(function(err, user){
//     if(err){
//         console.log("Error Occured", err);
//     } else {
//         console.log("New user added!", user)
//     }
// });
