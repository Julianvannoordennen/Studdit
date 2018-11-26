const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Comment schema
const CommentSchema = new Schema({
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
        ref: 'comment'
    }]
});

//Get comment API
const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;