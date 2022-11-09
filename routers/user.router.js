const express = require("express");

const userController = require("../controllers/user.Controller");

const router = express.Router();

// router.get("/", userController.loadPosts);

router.post("/login", userController.login); // 로그인 

module.exports = router;

router.post("/signup", userController.signup); //회원가입 

router.post('/logout', userController.logout); //로그아웃