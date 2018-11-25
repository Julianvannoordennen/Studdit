const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://localhost/studdit_test', { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => done())
        .on('error', error => {
        console.warn('Warning', error)
    });
});

/*

    ###############################
    ### Collection Wipe Example ###
    ###############################

    beforeEach(done => {
        const { drivers } = mongoose.connection.collections;
        drivers.drop()
            .then(() => done())
            .catch(() => done());
    });
*/