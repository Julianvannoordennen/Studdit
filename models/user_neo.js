
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
    deleteUser: deleteUser
}