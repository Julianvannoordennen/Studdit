const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const Schema = mongoose.Schema;

//Comment schema
let CommentSchema = new Schema({
    username: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
        autopopulate: true
    }]
});

//Use auto populator middleware for comments
CommentSchema.plugin(autopopulate);

//Get comment API
const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;