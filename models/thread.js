const mongoose = require('mongoose');
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
    }
});

//Get thread API
const Thread = mongoose.model('thread', ThreadSchema);

module.exports = Thread;