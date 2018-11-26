const Thread = require('../models/thread');

module.exports = {

    //Create a new thread
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

    //Read one thread
    readOne(req, res, next) {

        //Get id from request
        const { id } = req.params;
        
        //Read thread by id
        Thread.findById(id)

            //Load comment references
            .populate('comments')

            //Return thread
            .then(thread => res.send(thread))

            //Error while reading thread from database
            .catch(next);
    },

    //Read all threads
    readAll(req, res, next) {
        
        //Read all threads without comments
        Thread.find({}, { comments: 0 })

            //Return threads
            .then(threads => res.send(threads))

            //Error while reading threads from database
            .catch(next);
    },

    //Update one thread
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

    //Delete one thread
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