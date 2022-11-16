const express = require("express");

const userController = require("../controllers/user.Controller");

const router = express.Router();

const { isLogedIn, isNotLogedIn } = require("../middlewares/loginCheck");

router.get("/", isLogedIn, userController.loadPosts);

router.post("/login", isNotLogedIn, userController.login); // 로그인(로그인 상태가 아닌 경우에만)

module.exports = router;

router.post("/signup", userController.signup); //회원가입

router.post("/logout", userController.logout); //로그아웃
