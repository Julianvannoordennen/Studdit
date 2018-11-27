const express = require('express');
const app = express();
const mongoose = require('mongoose')
const routes = require('./routes/routes');
const bodyParser = require('body-parser')

//Select default mongoose promise
mongoose.Promise = global.Promise;

//Check if we are on a test environment
if (process.env.NODE_ENV !== 'test') {
    console.log(`Variable NODE_ENV is ${process.env.NODE_ENV}, application runs with the default database`);
    mongoose.connect(process.env.STUDDIT_CONNECTION_URL, { useNewUrlParser: true })
} else {
    console.log(`Variable NODE_ENV is ${process.env.NODE_ENV}, application runs with the test database`);
}

neo.driver = neo4j.driver(
    'bolt://hobby-miglodfghkjagbkedgoebfbl.dbs.graphenedb.com:24786', 
    neo4j.auth.basic('new-user', 'b.s2Rdsjueq3Ui.jmeyP12EhOYHIATF')
);

process.on('exit', function() {
    neo.driver.close();
});



//Body parser middleware, processes incoming JSON bodies
app.use(bodyParser.json());

//Routes
routes(app);

//Error handling middleware
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});

//Export the application
module.exports = app;