/*

    #####################
    ### Test Examples ###
    #####################

    const assert = require('assert');
    const request = require('supertest');
    const mongoose = require('mongoose');
    const app = require('../../app');
    const Driver = mongoose.model('driver');

    describe('Drivers controller', () => {

        it('Post to /api/drivers creates a new driver', (done) => {
            Driver.countDocuments()
                .then(count => {
                    request(app)
                        .post('/api/driver')
                        .send({email: 'keizer@pinguin.aq'})
                        .end(() => {
                        Driver.countDocuments().then(newCount => {
                            assert(count + 1 === newCount);
                            done();
                    });
                });   
            });     
        });

        it('PUT to /api/drivers/id edits an existing driver', done => {
            const driver = new Driver({ email: 'dwerg@pinguin.com', driving: false });
            driver.save()
                .then(() => {
                    request(app)
                        .put(`/api/driver/${driver._id}`)
                        .send({ driving: true })
                        .then(() => { return Driver.findOne({ email: 'dwerg@pinguin.com' })
                        .then(driver => {
                            assert(driver.driving === true);
                            done();
                    });
                })
            });
        });
    });
*/