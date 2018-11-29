const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Thread schema
const VoteSchema = new Schema({
    username: {
        required: true,
        type: String
    },
    positive: {
        required: true,
        type: String
    }
});

module.exports = VoteSchema;