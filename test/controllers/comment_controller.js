const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Thread = mongoose.model('thread');

describe('Comment controller', () => {

    it('posts a comment inside a thread when using POST /api/thread/:id/comment', done => {
        new Thread ({ username: "username_test", title: "title_test", content: "content_test" }).save().then(thread => {
            request(app)
                .post(`/api/thread/${thread._id}/comment`)
                .send({ username: "username_test", content: "content_test" })
                .then(result => {

                //Assert data
                const { body } = result;
                assert(body.username === "username_test");
                assert(body.content === "content_test");
                done();
            }); 
        });   
    });

    it('deletes a comment when using DELETE /api/comment/:id', done => {
        new Thread ({ username: "username_test", title: "title_test", content: "content_test", comments: [{ username: "username_test", content: "content_test" }] }).save().then(thread => {
            request(app)
                .delete(`/api/comment/${thread.comments[0]._id}`)
                .then(() => { return Thread.findOne({"comments._id": thread.comments[0]._id})})
                .then(result => {
                    
                //Assert data
                assert(result === null);
                done();
            });   
        }); 
    });

    it('upvotes a single comment when using PUT /api/comment/:id/upvote', done => {
        new Thread ({ username: "username_test", title: "title_test", content: "content_test", comments: [{ username: "username_test", content: "content_test" }] }).save().then(thread => {
            request(app)
                .put(`/api/comment/${thread.comments[0]._id}/upvote`)
                .send({ username: "voter_test" })
                .then(() => { return Thread.findOne({"comments._id": thread.comments[0]._id})})
                .then(result => {
                    
                //Assert data
                assert(result.comments[0].votes.length === 1);
                assert(result.comments[0].votes[0].username === "voter_test");
                assert(result.comments[0].votes[0].positive === "true");
                assert(result.comments[0].upvotes === 1);
                assert(result.comments[0].downvotes === 0);
                done();
            });   
        });     
    });  

    it('upvotes a single comment when using PUT /api/comment/:id/upvote', done => {
        new Thread ({ username: "username_test", title: "title_test", content: "content_test", comments: [{ username: "username_test", content: "content_test" }] }).save().then(thread => {
            request(app)
                .put(`/api/comment/${thread.comments[0]._id}/downvote`)
                .send({ username: "voter_test" })
                .then(() => { return Thread.findOne({"comments._id": thread.comments[0]._id})})
                .then(result => {
                    
                //Assert data
                assert(result.comments[0].votes.length === 1);
                assert(result.comments[0].votes[0].username === "voter_test");
                assert(result.comments[0].votes[0].positive === "false");
                assert(result.comments[0].upvotes === 0);
                assert(result.comments[0].downvotes === 1);
                done();
            });   
        });     
    });
});