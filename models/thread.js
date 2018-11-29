const mongoose = require('mongoose');
const VoteSchema = require('./vote');
const CommentSchema = require('./comment');
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
    comments: [ CommentSchema ],
    votes: [ VoteSchema ]
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true 
    }
});

//Create virtual attributes
ThreadSchema.virtual('upvotes').get(function() {
    let votes = 0;
    this.votes.filter(vote => {  if (vote.positive == "true") { votes++; } });
    return votes;
});

ThreadSchema.virtual('downvotes').get(function() {
    let votes = 0;
    this.votes.filter(vote => {  if (vote.positive == "false") { votes++; } });
    return votes;
});

//Get thread API
const Thread = mongoose.model('thread', ThreadSchema);

module.exports = Thread;