const Users = require("../users/users-model");

//--- logger() ---
// this middleware runs on every request made to the API
// function logger(req, res, next) {
// DO YOUR MAGIC
// logger logs to the console the following information about each request: request method, request url, and a timestamp
// }

function validateUserId(req, res, next) {
  Users.getById(req.params.id).then((user) => {
    if (user) {
      req.existingUser = user;
      next();
    } else {
      res.status(404).json({ message: "user not found" });
    }
  });
}

function validateUser(req, res, next) {
  if (typeof req.body.name != "string" || req.body.name.trim() == "") {
    res.status(400).json({ message: "missing required name field" });
    return;
  }
  req.user = { name: req.body.name.trim() };
  next();
}

//--- validatePost() ---
// function validatePost(req, res, next) {
// DO YOUR MAGIC
// validatePost validates the body on a request to create a new post
// ~if the request body lacks the required text field, respond with status 400 and { message: "missing required text field" }
// }

module.exports = {
  // logger,
  validateUserId,
  validateUser,
  // validatePost,
};
