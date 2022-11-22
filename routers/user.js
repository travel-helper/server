const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require("../middlewares/loginCheck");

router.get("/", isLoggedIn, userController.loadUsers); //로그인 유지를 위한 로그인 정보 반환

router.post("/login", isNotLoggedIn, userController.login); // 로그인(로그인 상태가 아닌 경우에만)

router.post("/signup", isNotLoggedIn, userController.signup); //회원가입

router.post("/logout", isLoggedIn, userController.logout); //로그아웃

module.exports = router;
