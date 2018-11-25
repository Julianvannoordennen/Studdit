const Example = require('../models/example');

module.exports = {

    example(req, res) {
        Example.find({}).then((penguins) => {
            res.send(penguins);
        });
    }
    
    /*

        ##############################
        ### Example create and put ###
        ##############################

    create(req, res, next) {
        const { body } = req;
        Driver.create(body)
            .then(driver => res.send(driver))
            .catch(next);
    },

    put(req, res, next) {
        const { id } = req.params;
        const { body } = req;
        Driver.findByIdAndUpdate({ _id: id }, body)
            .then(() => Driver.findById({ _id: id }))
                .then(driver => res.send(driver))
                .catch(next)
    }

    */
};