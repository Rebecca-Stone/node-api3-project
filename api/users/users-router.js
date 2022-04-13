const express = require("express");
// You will need `users-model.js` and `posts-model.js` both
const Users = require("./users-model");
// const Posts = require("../posts/posts-model");
// The middleware functions also need to be required
const {
  // logger,
  validateUserId,
  validateUser,
  // validatePost,
} = require("../middleware/middleware");

const router = express.Router();

function rootGetHandler(req, res) {
  console.log(req.timestamp);
  Users.get(req.query)
    .then((users) => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
    });
}

router.get("/", rootGetHandler);

router.get("/:id", validateUserId, (req, res) => {
  res.json(req.existingUser);
});

router.post("/", validateUser, (req, res) => {
  Users.insert(req.user)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.put("/:id", validateUser, validateUserId, (req, res) => {
  Users.update(req.params.id, req.user)
    .then(() => {
      res.status(200).json({ ...req.existingUser, ...req.user });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  Users.remove(req.existingUser.id)
    .then(() => {
      res.status(200).json(req.existingUser);
    })
    .catch((error) => {
      console.log(error);
    });
});

// router.get("/:id/posts", (req, res) => {
// RETURN THE ARRAY OF USER POSTS
// this needs a middleware to verify user id
// });

// router.post("/:id/posts", (req, res) => {
// RETURN THE NEWLY CREATED USER POST
// this needs a middleware to verify user id
// and another middleware to check that the request body is valid
// });

// do not forget to export the router
module.exports = router;
