require('dotenv').config();

// Mongoose
var mongoose = require("mongoose");
mongoose.connect('mongodb+srv://' +
    process.env.USERNAME + ':' +
    process.env.WEBDEVBOOTCAMPPASS +
    '@data-sodyq.mongodb.net/references?retryWrites=true&w=majority', {
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

var bob = new User({
    name: "Bob the Builder",
    email: "bob@bob.com"
})
bob.save(function(err, user){
    console.log(err?err:user);
});

// Post.create({
//     title: "I had another day",
//     content: "Now I am mostly sleeping"
// }, function(err, post){
//     if(err){
//         console.log("Error making post");
//     } else {
//         User.findOne({email: "bob@bob.com"}, function(err, foundUser){
//             if(err){
//                 console.log("Error finding user", err);
//             } else {
//                 foundUser.posts.push(post)
//                 foundUser.save(function(err, data){
//                     console.log(err?err:data)
//                 })
//             }
//         })
//     }
// });
