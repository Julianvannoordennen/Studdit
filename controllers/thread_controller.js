const Thread = require('../models/thread');
const neo = require('../neo4j_setup');
const neoQueries = require('../models/friendship_neo');

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
        Thread.findById(id).then(thread => {
            
                //Check if we couldn't find the ID
                if (thread === null) return Promise.reject({ message: "Couldn't find Id, make sure you entered the correct Id" })

                //Return thread
                res.send(thread)
            })

            //Error while reading thread from database
            .catch(next);
    },

    //Read threads from friends
    readFriends(req, res, next) {

        //Get body from request and neo session
        const { body } = req, session = neo.session();

        //Check values in body
        if ( body.depth === undefined || body.username === undefined ) next({ message: "Body is incorrect, make sure you entered a valid body" });

        else {

            //Create neo query
            neoQueries.getFriends(session, body.depth, body.username)
            
                //Execute query
                .then(result => {

                    //Filter names from result
                    let results = [];
                    result.records.forEach(person => results.push(person._fields[0].properties.name));
                    if (body.depth === 1) results.push( body.username );
                    
                    //Read all threads without comments
                    return Thread.find({ username: { $in: results }}, { comments: 0 })
                })

                //Return threads without commentcount
                .then(threads => { res.send(threads) })
                
                //Error while reading threads from database
                .catch(next);
        }      
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
        
        //Update thread by id
        Thread.findOneAndUpdate({ _id: id }, { content: body.content }, { new: true, runValidators: true }).then((thread) => {
                
                //Check if we couldn't find the ID
                if (thread === null) return Promise.reject({ message: "Couldn't find Id, make sure you entered the correct Id" });

                //Return updated thread
                res.send(thread)
            })
            
            //Error while updating thread from database
            .catch(next);
    },

    //Delete one thread
    delete(req, res, next) {

        //Get id from request
        const { id } = req.params;
        
        //Delete thread by id
        Thread.findByIdAndDelete(id).then((thread) => {

                //Check if we couldn't find the ID
                if (thread === null) return Promise.reject({ message: "Couldn't find Id, make sure you entered the correct Id" });

                //Return deleted thread
                res.send(thread)
            })
                
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
    Thread.findById(id, { votes: 1 }).then(thread => {

            //Check if we couldn't find the ID
            if (thread === null) return Promise.reject({ message: "Couldn't find Id, make sure you entered the correct Id" });

            //Filter on username
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