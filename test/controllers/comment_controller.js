const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Thread = mongoose.model('thread');
const Comment = mongoose.model('comment');

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
        new Comment ({ username: "username_test", content: "content_test" }).save().then(comment => {
            request(app)
                .delete(`/api/comment/${comment._id}`)
                .send({ content: "content_test_put" })
                .then(() => { return Thread.findOne({_id: comment._id})})
                .then(result => {
                    
                //Assert data
                assert(result === null);
                done();
            });   
        }); 
    });
});