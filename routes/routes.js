const ExampleController = require('../controllers/example_controller.js')
const UsersController = require('../controllers/user_controller')
const FriendsController = require('../controllers/friends_controller')


module.exports = (app) => {

    //Routes
    app.get('/api/penguin', ExampleController.example);

    //User routes
    app.post('/api/users', UsersController.create)
    app.put('/api/users', UsersController.editPassword)
    app.delete('/api/users', UsersController.deleteUser)

    //POST friendship
    app.post('/api/friends', FriendsController.createFriendship)

    /*
        ######################
        ### Example routes ###
        ######################

        app.post('/api/driver', DriversController.create);
        app.put('/api/driver/:id', DriversController.put);
        
    */

}