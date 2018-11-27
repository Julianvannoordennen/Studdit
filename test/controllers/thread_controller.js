const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Thread = mongoose.model('thread');

describe('Thread controller', () => {

    it('returns an array of threads when using GET /api/thread', done => {
        new Thread ({ username: "username_test", title: "title_test", content: "content_test" }).save().then(() => {
            request(app)
                .get(`/api/thread`)
                .then(result => {
                    
                //Assert data
                const { body } = result;
                assert(body.length === 1);
                assert(body[0].username === "username_test");
                assert(body[0].title === "title_test");
                assert(body[0].content === "content_test");
                assert(body[1] === undefined);
                done();
            });   
        });     
    });

    it('returns a single thread when using GET /api/thread/:id', done => {
        new Thread ({ username: "username_test", title: "title_test", content: "content_test" }).save().then(thread => {
            request(app)
                .get(`/api/thread/${thread._id}`)
                .then(result => {
                    
                //Assert data
                const { body } = result;
                assert(body.username === "username_test");
                assert(body.title === "title_test");
                assert(body.content === "content_test");
                done();
            });   
        });     
    });

    it('posts a single thread when using POST /api/thread', done => {
        request(app)
            .post(`/api/thread`)
            .send({ username: "username_test", title: "title_test", content: "content_test" })
            .then(result => {

            //Assert data
            const { body } = result;
            assert(body.username === "username_test");
            assert(body.title === "title_test");
            assert(body.content === "content_test");
            done();
        });   
    });  

    it('puts a single thread when using PUT /api/thread/:id', done => {
        new Thread ({ username: "username_test", title: "title_test", content: "content_test" }).save().then(thread => {
            request(app)
                .put(`/api/thread/${thread._id}`)
                .send({ content: "content_test_put" })
                .then(result => {
                    
                //Assert data
                const { body } = result;
                assert(body.username === "username_test");
                assert(body.title === "title_test");
                assert(body.content === "content_test_put");
                done();
            });   
        });     
    });   

    it('removes a single thread when using DELETE /api/thread/:id', done => {
        new Thread ({ username: "username_test", title: "title_test", content: "content_test" }).save().then(thread => {
            request(app)
                .delete(`/api/thread/${thread._id}`)
                .send({ content: "content_test_put" })
                .then(() => { return Thread.findOne({_id: thread._id})})
                .then(result => {
                    
                //Assert data
                assert(result === null);
                done();
            });   
        });     
    });  

    it('upvotes a single thread when using PUT /api/thread/:id/upvote', done => {
        new Thread ({ username: "username_test", title: "title_test", content: "content_test" }).save().then(thread => {
            request(app)
                .put(`/api/thread/${thread._id}/upvote`)
                .send({ username: "voter_test" })
                .then(() => { return Thread.findOne({_id: thread._id})})
                .then(result => {
                    
                //Assert data
                assert(result.votes.length === 1);
                assert(result.votes[0].username === "voter_test");
                assert(result.votes[0].positive === "true");
                assert(result.upvotes === 1);
                assert(result.downvotes === 0);
                done();
            });   
        });     
    });  

    it('downvotes a single thread when using PUT /api/thread/:id/upvote', done => {
        new Thread ({ username: "username_test", title: "title_test", content: "content_test" }).save().then(thread => {
            request(app)
                .put(`/api/thread/${thread._id}/downvote`)
                .send({ username: "voter_test" })
                .then(() => { return Thread.findOne({_id: thread._id})})
                .then(result => {
                    
                //Assert data
                assert(result.votes.length === 1);
                assert(result.votes[0].username === "voter_test");
                assert(result.votes[0].positive === "false");
                assert(result.upvotes === 0);
                assert(result.downvotes === 1);
                done();
            });   
        });     
    }); 
});