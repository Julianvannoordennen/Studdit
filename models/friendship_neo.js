
function createFriendship(session, userA, userB){

    return session.run('MATCH(u:Person), (f:Person) ' +
                        'WHERE u.name = $username AND f.name = $friendname ' +
                        'CREATE UNIQUE (u)-[r:FRIENDS]->(f)' +
                        'RETURN u, r, f',
    {
                            username: userA,
                            friendname: userB
                        });
}

function deleteFriendship(session, userA, userB){

    return session.run('MATCH(u:Person)-[r:FRIENDS]-(f:Person) ' + 
                        'WHERE u.name = $username AND f.name = $friendname ' +
                        'DELETE r ' +
                        'RETURN u, f',
                        {
                            username: userA,
                            friendname: userB
                        })
}

function getFriends(session, depth, userA) {

    return session.run("MATCH(p:Person)-[r:FRIENDS*1.." + depth + "]-(n:Person) " +
                        "WHERE p.name = $username " +
                        "RETURN DISTINCT n",
                        {
                            username: userA
                        })
}

module.exports = {
    createFriendship: createFriendship,
    deleteFriendship: deleteFriendship,
    getFriends: getFriends
}