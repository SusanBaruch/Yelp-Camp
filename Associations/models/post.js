var mongoose = require("mongoose");

//Post - title and content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
module.exports = mongoose.model("Post", postSchema);
