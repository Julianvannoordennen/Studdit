const Thread = require('../models/thread');

module.exports = {

    //Create a new comment inside a thread
    createInThread(req, res, next) {

        //Get body and thread id from request
        const { id } = req.params;
        const { body } = req;

        //Create comment in thread
        Thread.findOneAndUpdate({ _id: id }, { $push: { comments: body }}, { new: true, runValidators: true }).then(thread => { 
                
                //Check if we couldn't find the ID
                if (thread === null) return Promise.reject({ message: "Couldn't find Id, make sure you entered the correct Id" });

                //Return thread
                res.send(thread)
            })

            //Error while creating comment in database
            .catch(next);
    },

    //Delete a comment
    delete(req, res, next) {

        //Get id from request
        const { id } = req.params;

        //Delete thread by id
        Thread.findOneAndUpdate({ 'comments._id': id }, { $pull: { 'comments': { _id: id}}}, { new: true }).then(thread => {

                //Check if we couldn't find the ID
                if (thread === null) return Promise.reject({ message: "Couldn't find Id, make sure you entered the correct Id" });

                //Return deleted comment
                res.send(thread)
            })
                
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
    Thread.findOne({ 'comments._id': id })
        
        //Check if name exists in comment
        .then(thread => {

            //Check if we couldn't find the ID
            if (thread === null) return Promise.reject({ message: "Couldn't find Id, make sure you entered the correct Id" });

            //Get correct comment
            let comment = thread.comments.id(id);
            
            //Get votes that already contain sended username
            let votes = comment.votes.filter(vote => { return vote.username === body.username });
            
            //Check if the vote is inside
            if (votes.length === 1)
                
                //Found comment, edit the existing one
                votes[0].positive = body.positive;

            else
                
                //Didn't found comment, create a new one
                comment.votes.push(body);

            //Save the document
            thread.save().then(comment => {
                
                //Return saved document
                res.send(comment);
            });
        })
            
        //Error while editting vote
        .catch(next);
}