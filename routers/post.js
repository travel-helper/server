const express = require("express");
const postController = require("../controllers/post");

const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/loginCheck");

router.get("/", postController.loadPosts);
router.post("/", isLoggedIn, postController.addPost);
router.post("/img", isLoggedIn, postController.addImg);
module.exports = router;
