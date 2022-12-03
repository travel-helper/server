const express = require("express");
const postController = require("../controllers/post");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const { isJWT, isNotJWT } = require("../middlewares/jwt.middleware");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.get("/", postController.loadPosts);
// router.get("/postId", postController);
router.post("/", postController.addPost);
router.post("/img", upload.single("img"), postController.addImg);
router.patch("/:postId", postController.updatePost);
router.delete("/:postId", postController.deletePost);

router.post("/:postId/comment", postController.addComment);

// router.patch("/:postId/like", postController.like);
// router.delete("/:postId/like", postController.unlike);

module.exports = router;
