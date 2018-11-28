
function createUser(session, user) {
    let queries = []

    queries.push(
        session.run('MERGE (p: Person {name: $name}) ' +
                    'RETURN p',
                    {
                        name: user.name
                    })
    )

    return Promise.all(queries);
}

function createFriendship(session, userA, userB){

    return session.run('MATCH (personA: Person {name: $nameA}), (personB: Person {name: $nameB}) ' +
                        'CREATE (personA)-[f:FRIENDS]->(personB) ' +
                        'CREATE (personB)-[f:FRIENDS]->(personA) ' +
                        'RETURN personA, r, personB',
                        {
                            nameA: userA.name,
                            nameB: userB.name
                        });
}

function deleteUser(session, user){
    return session.run('MATCH(p: Person) ' +
                        'WHERE p.name = $name ' + 
                        'DETACH DELETE p',
                        {
                            name: user.name
                        })
}


module.exports = {
    createUser: createUser,
    createFriendship: createFriendship,
    deleteUser: deleteUser
}