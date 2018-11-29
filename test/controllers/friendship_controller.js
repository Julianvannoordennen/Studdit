const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const User = mongoose.model('user');
const neo4j = require('neo4j-driver').v1;
const neo = require('../../neo4j_setup')

describe('Friendship controller', () => {

    it('returns relationship created when using POST /api/friends', done => {
        let session = neo.session();
        session.run('MERGE (p:Person {name: $user1}) ' +
            'MERGE (f:Person {name: $user2}) ', {
                user1: 'username_test',
                user2: 'username_test2'
            }).then(() => {
            request(app)
                .post('/api/friends')
                .send({
                    nameA: 'username_test',
                    nameB: 'username_test2'
                })
                .then(result => {
                    const {
                        body
                    } = result;
                    assert(body.summary.counters._stats.relationshipsCreated === 1);
                    done();
                })


        })
    })

    it('returns relationship deleted when using DELETE /api/friends', done => {
        let session = neo.session();
        session.run('MERGE (p:Person {name: $user1}) ' +
            'MERGE (f:Person {name: $user2}) ', {
                user1: 'username_test',
                user2: 'username_test2'
            }).then(() => {
            session.run('MATCH(u:Person), (f:Person) ' +
                'WHERE u.name = $username AND f.name = $friendname ' +
                'CREATE UNIQUE (u)-[r:FRIENDS]->(f)' +
                'RETURN u, r, f', {
                    username: 'username_test',
                    friendname: 'username_test2'
                }).then(() => {
                    request(app)
                        .delete('/api/friends')
                        .send({
                            nameA: 'username_test',
                            nameB: 'username_test2'
                        })
                        .then(result => {
                            const { body } = result
                            assert(body.summary.counters._stats.relationshipsDeleted === 1);
                            done();
                        })
                })
        })

    })
})