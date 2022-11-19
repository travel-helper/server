const express = require("express");
const postController = require("../controllers/post.Controller");

const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/loginCheck");
router.get("/", postController.loadPosts);
router.post("/", isLoggedIn, postController.addPost);

module.exports = router;
