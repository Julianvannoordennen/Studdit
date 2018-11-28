const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const VoteSchema = require('./vote');
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
    comments: [ this ],
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
CommentSchema.virtual('upvotes').get(function() {
    let votes = 0;
    this.votes.filter(vote => {  if (vote.positive == "true") { votes++;} });
    return votes;
});

CommentSchema.virtual('downvotes').get(function() {
    let votes = 0;
    this.votes.filter(vote => {  if (vote.positive == "false") { votes++;} });
    return votes;
});

//Use auto populator middleware for comments
CommentSchema.plugin(autopopulate);

module.exports = CommentSchema;