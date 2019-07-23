
// Mongoose
var mongoose = require("mongoose");
mongoose.connect('mongodb+srv://public:123@associations-mddjv.mongodb.net/data?retryWrites=true&w=majority', {
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
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

User.findOne({name: "George Muffin"}, function(err, user){
    if(err){
        console.log("Error finding George Muffin", err);
    } else {
        user.posts.push({
            title: "3 things I hate",
            content: "Apples, Bananas, Cats"
        })
        user.save(function(err, user){
            console.log(err?err:user);
        })
    }
})

// var newUser = new User({
//     email: "george.muffin@gmail.com",
//     name: "George Muffin"
// })
// newUser.posts.push({
//     title: "I made a Muffin!",
//     content: "Look at it. Wait... I ate it!"
// })
// newUser.save(function(err, user){
//     if(err){
//         console.log("Error Occured", err);
//     } else {
//         console.log("New user added!", user)
//     }
// });


// New stuff

// var newPost = new Post({
//     title: "Apples",
//     content: "Yummy"
// })
// newPost.save(function(err, post){
//     if(err){
//         console.log("Error", err);
//     } else {
//         console.log("New Post!", post)
//     }
// });
