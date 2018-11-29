const neo = require('../neo4j_setup');
const neoQueries = require('../models/friendship_neo');
const ApiError = require('../models/api_error');
const User = require('../models/user');

function createFriendship(req, res){
    const { nameA } = req.body, { nameB } = req.body;

    let session = neo.session();

    //TODO kijken of users bestaan

    // User.find({ $or: [{ name: nameA }, { name: nameB }]})

    neoQueries.createFriendship(session, nameA, nameB)
        .then(result => {
            session.close();
            res.send(result)
        })
        .catch(err => {
            res.status(400)
            res.send(new ApiError('Error while creating friendship between ' + nameA + ' and ' + nameB, 400))
        })
}

//kijken of users bestaan

function deleteFriendship(req, res){
    const { nameA } = req.body, { nameB } = req.body;

    let session = neo.session();
    neoQueries.deleteFriendship(session, nameA, nameB)
        .then(result => {
            session.close();
            res.send(result)
        })
        .catch(err => {
            res.status(400)
            res.send(new ApiError('Error while deleting friendship between ' + nameA + ' and ' + nameB, 400))
        })
}

module.exports = {
    createFriendship: createFriendship,
    deleteFriendship: deleteFriendship
}
