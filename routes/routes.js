const ExampleController = require('../controllers/example_controller.js');
const CommentController = require('../controllers/comment_controller.js');
const ThreadController = require('../controllers/thread_controller.js');

module.exports = (app) => {

    //Example routes
    app.get(        '/api/penguin'                      , ExampleController.example);

    //Thread routes
    app.post(       '/api/thread'                       , ThreadController.create);
    app.get(        '/api/thread/:id'                   , ThreadController.readOne);
    app.get(        '/api/thread'                       , ThreadController.readAll);
    app.put(        '/api/thread/:id'                   , ThreadController.update);
    app.delete(     '/api/thread/:id'                   , ThreadController.delete);
    app.put(        '/api/thread/:id/upvote'            , ThreadController.upVote);
    app.put(        '/api/thread/:id/downvote'          , ThreadController.downVote);

    //Comment routes
    app.post(       '/api/thread/:id/comment'           , CommentController.createInThread);        // <= Notice, the id in this route represents a thread id, not a comment id
    app.post(       '/api/comment/:id/comment'          , CommentController.createInComment);
    app.delete(     '/api/comment/:id'                  , CommentController.delete);
    app.put(        '/api/comment/:id/upvote'           , CommentController.upVote);
    app.put(        '/api/comment/:id/downvote'         , CommentController.downVote);


    /*
        ######################
        ### Example routes ###
        ######################

        app.post('/api/driver', DriversController.create);
        app.put('/api/driver/:id', DriversController.put);
        
    */
}