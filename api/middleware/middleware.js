const Users = require("../users/users-model");

//--- logger() ---
// this middleware runs on every request made to the API
function logger(req, res, next) {
  // DO YOUR MAGIC
  // logger logs to the console the following information about each request: request method, request url, and a timestamp
}

//--- validateUserId() ---
// this middleware will be used for all user endpoints that include an id parameter in the url (ex: /api/users/:id
function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  // it should check the database to make sure there is a user with that id.
  Users.getById(req.params.id).then((user) => {
    if (user) {
      //  ~if the id parameter is valid, store the user object as req.user and allow the request to continue
      req.existingUser = user;
      next();
    } else {
      //  ~if the id parameter does not match any user id in the database, respond with status 404 and { message: "user not found" }
      res.status(404).json({ message: "user not found" });
    }
  });
}

//--- validateUser() ---
function validateUser(req, res, next) {
  // DO YOUR MAGIC
  // validateUser validates the body on a request to create or update a user
  if (typeof req.body.name != "string" || req.body.name.trim() == "") {
    res.status(400).json({ message: "missing required name field" });
    //  ~if the request body lacks the required name field, respond with status 400 and { message: "missing required name field" }
    return;
  }
  req.user = { name: req.body.name.trim() };
  next();
}

//--- validatePost() ---
function validatePost(req, res, next) {
  // DO YOUR MAGIC
  // validatePost validates the body on a request to create a new post
  // ~if the request body lacks the required text field, respond with status 400 and { message: "missing required text field" }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};
