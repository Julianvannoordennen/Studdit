const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const User = mongoose.model('user');

describe('User controller', () => {

    it('post a single user when using POST /api/users', done => {
        request(app)
            .post('/api/users')
            .send({ name: 'username_test', password: 'password_test'})
            .then(result => {

                const { body } = result;
                assert(body.name === 'username_test');
                assert(body.password === 'password_test');
                done();
            });
    });

    it('puts a single user when using PUT /api/users', done => {
        new User ({ name: 'username_test', password: 'password_test'}).save().then( thread => {
            request(app)
                .put('/api/users')
                .send({name: 'username_test', currentPassword:'password_test', newPassword:'test_password'})
                .then(result => {
                    const { body } = result;
                    assert(body.message === 'password has been changed for user: username_test')
                    done();
                })
        })
    })

    it('deletes a single user when using DELETE /api/users', done => {
        new User ({ name: 'username_test', password: 'password_test'}).save().then( thread => {
            request(app)
                .delete('/api/users')
                .send({name: 'username_test', password: 'password_test'})
                .then(result => {
                    const { body } = result;
                    assert(body.message === 'User username_test has been succesfully deleted')
                    done();
                })
        })
    })
});