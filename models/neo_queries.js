
function createUser(session, user, password) {
    let queries = []

    queries.push(
        session.run('MERGE (p: Person {name: $name, password: $password}) ' +
                    'RETURN p',
                    {
                        name: user.name,
                        password: user.password
                    })
    )

    return Promise.all(queries);
}

function changePassword(session, user, oldPassword, newPassword){
    
}




function retrieveLikes(session, userName) {
    return session.run(
        'MATCH (p: Person)-[:Likes]->(other: Person) ' + 
        'WHERE p.name = $name ' +
        'RETURN other.name',
        {
            name: userName
        }
    );
}


function addLike(session, userName, otherName) {
    return session.run(
        'MATCH (p: Person {name: $name}), (o:Person {name: $other}) ' + 
        'MERGE (p)-[r:Likes]->(o) ' +
        'RETURN p, r, o',
        {
            name: userName,
            other: otherName
        }
    );
}


function retrieveSuggestions(session, userName) {
    return session.run(
        'MATCH (p: Person {name: $name})-[:HasHobby]->(h: Hobby), ' +
        '(o: Person)-[:HasHobby]->(h)' + 
        'RETURN o.name',
        {
            name: userName
        }
    );
}


module.exports = {
    createUser: createUser,
    getList: getList,
    retrieveLikes: retrieveLikes,
    addLike: addLike,
    retrieveSuggestions: retrieveSuggestions,
}