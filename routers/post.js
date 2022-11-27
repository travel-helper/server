const express = require("express");
const postController = require("../controllers/post");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/loginCheck");

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
router.post("/", postController.addPost);
router.post("/img", upload.single("img"), postController.addImg);
module.exports = router;
