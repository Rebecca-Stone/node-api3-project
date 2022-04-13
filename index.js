// require your server and launch it
// this 'imports' the server in for use
const server = require('./api/server.js');

// this declares what localhost we want to use
const port = 3000;

server.listen(port, () => {
    // this is what will log on terminal
    console.log(`\n***Server Up on Port: ${port}***\n`) 
})
