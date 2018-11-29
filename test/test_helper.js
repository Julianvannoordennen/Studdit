const mongoose = require('mongoose');

//Execute this middleware before each test
before(done => {

    //Connect to local test database
    mongoose.connect('mongodb://localhost/studdit_test', { useNewUrlParser: true });
    mongoose.connection

        //Finish when connection has been succesfully established
        .once('open', () => done())

        //Error
        .on('error', error => console.warn('Warning', error));
});

beforeEach(done => {
    const { threads } = mongoose.connection.collections;
    threads.drop()
        .then(() => done())
        .catch(() => done());
});