const User = require('../models/user');
const neo = require('../neo4j_setup');
const neoQueries = require('../models/user_neo');
const ApiError = require('../models/api_error')

// create a new user
function create(req, res) {
    const user = req.body
    let session = neo.session();
    User.create(user)
        .then(user => {
            return neoQueries.createUser(session, user)
        }).then(() => {
            session.close();
            res.send(user);
        })
        .catch(err => {
            if (err.code === 11000) {
                res.status(422);
                res.send(new ApiError('Gebruiker bestaat al', 422));
            } else {
                console.log('error in create user: ' + err);
                res.status(400);
                res.send(err);
            }
        });

}


// update user
function editPassword(req, res, next) {
    const data = req.body;
    console.log('Request to edit password for user: ' + data.name);
    User.findOne({
            password: data.currentPassword,
            name: data.name,
        })
        .then((user) => {
            console.log("user was succesfully found and password checks out")
            User.findByIdAndUpdate({
                    _id: user._id
                }, {
                    password: data.newPassword
                })
                .then((user) => {
                    res.status(200);
                    res.send({
                        message: 'password has been changed for user: ' + user.name
                    }).end();
                    next();
                })
                .catch((err) => {
                    res.status(422)
                    res.send(new ApiError("User information is invalid", 422));
                    console.log('Error while trying to edit a user - ' + err);
                    next();
                })
        })
        .catch((err) => {
            console.log("No user found with password: " + data.currentPassword);
            res.status(422);
            res.send(new ApiError("User information is invalid", 422))
            next();
        });
}

//delete user
function deleteUser(req, res, next) {
    let data = req.body
    let session = neo.session();

    User.findOne({
            name: data.name,
            password: data.password
        })
        .then((user) => {
            if (user.password != data.password) {
                res.status(422);
                res.send(new ApiResponse("No user found with this password and id", 422))
                next();
            } else {

                User.findOneAndDelete({
                        name: data.name,
                        password: data.password
                    })
                    .then(() => {
                        return neoQueries.deleteUser(session, data)
                    }).then(() => {
                        session.close();
                        res.send({
                            message: 'User ' + data.name + ' has been succesfully deleted'
                        }).end()
                        next()
                    })
                    .catch((err) => {
                        res.status(422)
                        res.send(new ApiError("User information is invalideee", 422));
                        console.log("Error while tying to delete a user - " + err);
                        next();
                    })

            }

        }).catch((err) => {
            res.status(422)
            res.send(new ApiError("User information is invalid", 422));
            console.log("Error while tying to delete a user - " + err);
            next();
        })
}


module.exports = {
    create: create,
    editPassword: editPassword,
    deleteUser: deleteUser
}