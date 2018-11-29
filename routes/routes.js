const UsersController = require('../controllers/user_controller')
const FriendsController = require('../controllers/friends_controller')
const CommentController = require('../controllers/comment_controller.js');
const ThreadController = require('../controllers/thread_controller.js');

module.exports = (app) => {

    //Thread routes
    app.post(       '/api/thread'                       , ThreadController.create);
    app.get(        '/api/thread/:id'                   , ThreadController.readOne);
    app.get(        '/api/thread'                       , ThreadController.readAll);
    app.put(        '/api/thread/:id'                   , ThreadController.update);
    app.delete(     '/api/thread/:id'                   , ThreadController.delete);
    app.put(        '/api/thread/:id/upvote'            , ThreadController.upVote);
    app.put(        '/api/thread/:id/downvote'          , ThreadController.downVote);

    //User routes
    app.post(       '/api/users'                        , UsersController.create)
    app.put(        '/api/users'                        , UsersController.editPassword)
    app.delete(     '/api/users'                        , UsersController.deleteUser)

    //Friendship routes
    app.post(       '/api/friends'                      , FriendsController.createFriendship)
    app.delete(     '/api/friends'                      , FriendsController.deleteFriendship)

    //Comment routes
    app.post(       '/api/thread/:id/comment'           , CommentController.createInThread);    
    app.delete(     '/api/comment/:id'                  , CommentController.delete);
    app.put(        '/api/comment/:id/upvote'           , CommentController.upVote);
    app.put(        '/api/comment/:id/downvote'         , CommentController.downVote);
}