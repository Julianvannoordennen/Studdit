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
    },

    //Upvote thread
    upVote(req, res, next) {
        
        //Manipulate body and execute helper method
        req.body.positive = true;
        vote(req, res, next);        
    },

    //Downvote thread
    downVote(req, res, next) {
        
        //Manipulate body and execute helper method
        req.body.positive = false;
        vote(req, res, next); 
    }
}

//Vote helper method for downvote and upvote
function vote(req, res, next) {

    //Get body and id
    let { body } = req, { id } = req.params;

    //Get comment by id
    Comment.findById(id, { votes: 1 })
        
        //Check if name exists in comment
        .then(comment => {
            let votes = comment.votes.filter(vote => { return vote.username === body.username });
            
            //Check if the vote is inside
            if (votes.length === 1)
                
                //Found comment, edit the existing one
                votes[0].positive = body.positive;

            else
                
                //Didn't found comment, create a new one
                comment.votes.push(body);

            //Save the document
            comment.save().then(comment => {
                
                //Return saved document
                res.send(comment);
            });
        })
            
        //Error while editting vote
        .catch(next);
}