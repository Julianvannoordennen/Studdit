const Comment = require('../models/comment');
const Thread = require('../models/thread');

module.exports = {

    //Create a new comment inside a thread
    createInThread(req, res, next) {

        //Get body and thread id from request
        const { id } = req.params;
        const { body } = req;
        let result;

        //Create comment
        Comment.create(body)

            //Update existing thread with reference
            .then(comment => { 
                result = comment;
                return Thread.findOneAndUpdate({ _id: id }, { $push: { comments: { _id: comment._id }}}, { new: true });
            })

            //Return created comment
            .then(() => res.send(result))

            //Error while creating comment in database
            .catch(next);
    },

    //Create a new comment inside another comment
    createInComment(req, res, next) {

        //Get body and comment id from request
        const { id } = req.params;
        const { body } = req;
        let result;

        //Create comment
        Comment.create(body)

            //Update existing comment with reference
            .then(comment => { 
                result = comment;
                return Comment.findOneAndUpdate({ _id: id }, { $push: { comments: { _id: comment._id }}}, { new: true });
            })

            //Return created comment
            .then(() => res.send(result))

            //Error while creating comment in database
            .catch(next);
    },

    //Delete a comment
    delete(req, res, next) {

        //Get id from request
        const { id } = req.params;

        //Delete thread by id
        Comment.findByIdAndDelete(id)

            //Return deleted comment
            .then(thread => res.send(thread))
                
            //Error while pulling comment from database
            .catch(next);
    }
}