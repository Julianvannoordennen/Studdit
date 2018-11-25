/*
    ######################
    ### Example Schema ###
    ######################
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExampleSchema = new Schema({
    family: [{
        name: String,
        scienceName: String,
        species: [{
            name: String,
            scienceName: String,
            Extinct: Boolean
        }]
    }]
});

const Example = mongoose.model('penguins', ExampleSchema);

module.exports = Example;