const neo = require('../neo4j_setup');
const neoQueries = require('../models/friendship_neo');
const ApiError = require('../models/ApiError');

function createFriendship(req, res){
    const nameA = req.body.nameA;
    const nameB = req.body.nameB;

    let session = neo.session();
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

function deleteFriendship(req, res){
    const nameA = req.body.nameA;
    const nameB = req.body.nameB;

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
