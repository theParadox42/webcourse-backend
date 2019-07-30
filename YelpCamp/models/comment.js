
var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    campground: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campground"
        },
        name: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);
