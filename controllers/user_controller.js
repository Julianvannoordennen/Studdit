const User = require('../models/user');
const neo = require('../neo4j_setup');
const neoQueries = require('../models/neo_queries');

// create a new user
function create(req, res) {
    const user = req.body
    let session = neo.session();

    neoQueries.createUser(session, user)
        .then(result => {
            session.close();
            res.send(result);
        })
        .catch(err => {
            console.log(err)
            res.status(400);
            res.send(err);
        })

}


// update a specific user
function setUser(req, res) {
    const user = req.body


    const name = req.params.id;
    const props = req.body;
    User.updateOne({name: name}, props)
        // TODO also update graph!
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            console.log('error in set user: ' + err);
            res.status(400);
            res.send(err);
        });
}



module.exports = {
    create: create,
    setUser: setUser
}