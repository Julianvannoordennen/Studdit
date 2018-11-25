const ExampleController = require('../controllers/example_controller.js')

module.exports = (app) => {

    //Routes
    app.get('/api/penguin', ExampleController.example);

    /*
        ######################
        ### Example routes ###
        ######################

        app.post('/api/driver', DriversController.create);
        app.put('/api/driver/:id', DriversController.put);
        
    */
}