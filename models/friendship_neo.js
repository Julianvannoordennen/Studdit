
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

function deleteFriendship(session, userA, userB){

    return session.run('MATCH (pA:Person {name:$nameA})-[f:FRIENDS]-(pB:Person {name:$nameB})' + 
                        'DELETE r' +
                        'RETURN pA, pB',
                        {
                            nameA: userA.name,
                            nameB: userB.name
                        })
}

module.exports = {
    createFriendship: createFriendship,
    deleteFriendship: deleteFriendship
}