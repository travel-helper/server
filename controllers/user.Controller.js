const userService = require("../services/user.Service");
const bcrypt = require("bcrypt");
const baseResponse = require("../utilities/baseResponseStatus");
const { errResponse, response } = require("../utilities/response");
const regexDate = new RegExp(
  /(^(19|20)\d{2})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/
); // YYYYMMDD 확인 정규표현식

exports.loadUsers = async function (req, res, next) {
  try {
    if (req.user) {
      const fullUser = await userService.fullUserWithoutPassword(req.user);

      return res.status(200).json(fullUser);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const passport = require("passport");

exports.login = async function (req, res, next) {
  // 패스포트를 활용한 로그인 컨트롤러(서비스는 패스포트 내에 존재함)

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      next(err);
    }

    if (info) {
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      // passport index.js 실행

      if (loginErr) {
        return next(loginErr);
      }
      const fullUser = await userService.fullUserWithoutPassword(user);

      return res.status(200).json(fullUser);
    });
  })(req, res, next);
};

exports.signup = async function (req, res, next) {
  // POST /user/
  console.log("회원가입요청");
  console.log(req.body);
  try {
    const exUser = await userService.exUser(req); //이메일 중복 확인
    if (exUser) {
      return res.status(403).send("이미 사용 중인 아이디입니다.");
    }

    await userService.createUser(req); //회원정보 기입
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
};

exports.logout = async function (req, res) {
  //로그아웃
  req.logout();
  req.session.destroy();
  res.send("ok");
};
