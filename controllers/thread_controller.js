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
        Thread.aggregate([{ 
                $project: {                                                                                                             //Create projection
                    username: 1, title: 1, content: 1,                                                                                  //Show default values
                    commentcount: { $size: "$comments" },                                                                               //Count array, place value in comments_count attribute
                    upvotes: { $size: { $filter: { input: "$votes", as: "vote", cond: { $eq: [ "$$vote.positive", "true" ]}}}},         //Count votes, filter on positive votes, place in upvotes attribute
                    downvotes: { $size: { $filter: { input: "$votes", as: "vote", cond: { $eq: [ "$$vote.positive", "false"]}}}}        //Count votes, filter on negative votes, place in downvotes attribute
                }       
            },{ 
                $sort: { 
                    commentcount: -1                                                                                                    //Sort by comment count
                }
            }
        ])

            //Return threads without commentcount
            .then(threads => { res.send(threads) })

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

    //Get thread by id
    Thread.findById(id, { votes: 1 })
        
        //Check if name exists in thread
        .then(thread => {
            let votes = thread.votes.filter(vote => { return vote.username === body.username });

            //Check if the vote is inside
            if (votes.length === 1)
                
                //Found comment, edit the existing one
                votes[0].positive = body.positive;

            else
                
                //Didn't found comment, create a new one
                thread.votes.push(body);

            //Save the document
            thread.save().then(thread => {
                
                //Return saved document
                res.send(thread);
            });
        })
            
        //Error while editting vote
        .catch(next);
}