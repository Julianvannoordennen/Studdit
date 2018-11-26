const Thread = require('../models/thread');

module.exports = {

    create(req, res, next) {

        //Get body from request
        const { body } = req;

        //Create Thread
        Thread.create(body)

            //Return thread
            .then(thread => res.send(thread))

            //Error while creating thread in database
            .catch(next);
    },

    readOne(req, res, next) {

        //Get id from request
        const { id } = req.params;
        
        //Read thread by id
        Thread.findById(id)

            //Return thread
            .then(thread => res.send(thread))

            //Error while reading thread from database
            .catch(next);
    },

    readAll(req, res, next) {
        
        //Read all threads
        Thread.find({})

            //Return threads
            .then(threads => res.send(threads))

            //Error while reading threads from database
            .catch(next);
    },

    update(req, res, next) {
        
        //Get body and id from request
        const { body } = req, { id } = req.params;
        
        /*  
            Update thread by id
            Normally the method returns the unaltered document, the option { new: true } returns the updated document
            Also, normally the validators won't run when updating, the option { runValidators: true } fixes this issue 
        */
        Thread.findOneAndUpdate({ _id: id }, { content: body.content }, { new: true, runValidators: true })

            //Return updated thread
            .then((thread) => res.send(thread))
            
            //Error while updating thread from database
            .catch(next);
    },

    delete(req, res, next) {

        //Get id from request
        const { id } = req.params;
        
        //Delete thread by id
        Thread.findByIdAndDelete(id)

            //Return deleted thread
            .then((thread) => res.send(thread))
                
            //Error while deleting thread from database
            .catch(next);
    }
}