const app = require('./app');
const port = process.env.PORT || 3050;

//Start the app and listen to the specified port
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});