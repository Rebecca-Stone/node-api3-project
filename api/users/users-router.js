const express = require("express");
const Users = require("./users-model");
// const Posts = require("../posts/posts-model");
// The middleware functions also need to be required
const {
  logger,
  validateUserId,
  validateUser,
  // validatePost,
} = require("../middleware/middleware");

const router = express.Router();

function rootGetHandler(req, res) {
  Users.get(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
    });
}

router.get("/", logger, rootGetHandler);

router.get("/:id", logger, validateUserId, (req, res) => {
  res.json(req.existingUser);
});

router.post("/", logger, validateUser, (req, res) => {
  Users.insert(req.user)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.put("/:id", logger, validateUser, validateUserId, (req, res) => {
  Users.update(req.params.id, req.user)
    .then(() => {
      res.status(200).json({ ...req.existingUser, ...req.user });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/:id", logger, validateUserId, (req, res) => {
  Users.remove(req.existingUser.id)
    .then(() => {
      res.status(200).json(req.existingUser);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/:id/posts", logger, validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
    });
});

// router.post("/:id/posts", (req, res) => {
// RETURN THE NEWLY CREATED USER POST
// this needs a middleware to verify user id
// and another middleware to check that the request body is valid
// });

module.exports = router;
