const ExampleController = require('../controllers/example_controller.js')
const UsersController = require('../controllers/user_controller')

module.exports = (app) => {

    //Routes
    app.get('/api/penguin', ExampleController.example);

    //User routes
    app.post('/api/users', UsersController.create)
    app.put('/api/users/:id', UsersController.setUser)

    //POST friendship


    /*
        ######################
        ### Example routes ###
        ######################

        app.post('/api/driver', DriversController.create);
        app.put('/api/driver/:id', DriversController.put);
        
    */

}