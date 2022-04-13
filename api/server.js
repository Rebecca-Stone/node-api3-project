const express = require('express');
// const userRouter = require("./users/users-router.js");

const server = express();
// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middleware and the user's router need to be connected here

//--- logger() ---

// logger logs to the console the following information about each request: request method, request url, and a timestamp
// this middleware runs on every request made to the API


//--- validateUserId() ---

// this middleware will be used for all user endpoints that include an id parameter in the url (ex: /api/users/:id and it should check the database to make sure there is a user with that id.

//  ~if the id parameter is valid, store the user object as req.user and allow the request to continue

//  ~if the id parameter does not match any user id in the database, respond with status 404 and { message: "user not found" }

//--- validateUser() ---

// validateUser validates the body on a request to create or update a user

//  ~if the request body lacks the required name field, respond with status 400 and { message: "missing required name field" }

//--- validatePost() ---

// validatePost validates the body on a request to create a new post

// ~if the request body lacks the required text field, respond with status 400 and { message: "missing required text field" }

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
