
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

module.exports = {
    createFriendship: createFriendship,
    deleteFriendship: deleteFriendship
}