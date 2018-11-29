const mongoose = require('mongoose');
const neo4j = require('neo4j-driver').v1;
const neo = require('../neo4j_setup')

//Execute this middleware before each test
before(done => {

    neo.driver = neo4j.driver(
        'bolt://hobby-hddlbaaccbcogbkemkjcffbl.dbs.graphenedb.com:24786', 
        neo4j.auth.basic('test', 'b.QZJtEEs3AbaY.WfLQx5kkklFt9AJA')
    );

    //Connect to local test database
    mongoose.connect('mongodb://localhost/studdit_test', { useNewUrlParser: true });



    mongoose.connection

        //Finish when connection has been succesfully established
        .once('open', () => done())

        //Error
        .on('error', error => console.warn('Warning', error));
});

beforeEach(done => {
    const { threads, users } = mongoose.connection.collections;
    let session = neo.session();
    session.run('MATCH (n) ' + 'DETACH DELETE n', {} )
        .then(() => { return threads.drop() })
        .then(() => { return users.drop() })
        .then(() => done())
        .catch(() => done());
});