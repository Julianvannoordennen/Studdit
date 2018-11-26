const mongoose = require('mongoose');
const Comment = require('../models/comment');
const Schema = mongoose.Schema;

//Thread schema
const ThreadSchema = new Schema({
    username: {
        required: true,
        type: String
    },
    title: {
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

//Get thread API
const Thread = mongoose.model('thread', ThreadSchema);

module.exports = Thread;