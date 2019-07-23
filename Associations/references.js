
// Mongoose
var mongoose = require("mongoose");
mongoose.connect('mongodb+srv://public:123@associations-mddjv.mongodb.net/references?retryWrites=true&w=majority', {
    useNewUrlParser: true
}).catch(function(e){
    console.log("Error occured connecting to mongodb");
	console.log(e);
});

//POST
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

// user
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ]
});

var User = mongoose.model("User", userSchema);

Post.create({
    title: "I had another day",
    content: "Now I am mostly sleeping"
}, function(err, post){
    if(err){
        console.log("Error making post");
    } else {
        User.findOne({email: "bob@bob.com"}, function(err, user){
            console.log(err?err:user);
        })
    }
});
