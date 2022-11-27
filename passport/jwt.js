const { ExtractJwt, Strategy: JWTStrategy } = require("passport-jwt");
const { User } = require("../model");
const passport = require("passport");
const bcrypt = require("bcrypt");

const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: "jwt-secret-key",
};

const JWTVerify = async (jwtPayload, done) => {
  try {
    // payload의 id값으로 유저의 데이터 조회
    const user = await User.findOne({ where: { id: jwtPayload.id } });
    // 유저 데이터가 있다면 유저 데이터 객체 전송
    if (user) {
      done(null, user);
      return;
    }
    // 유저 데이터가 없을 경우 에러 표시
    done(null, false, { reason: "올바르지 않은 인증정보 입니다." });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

module.exports = () => {
  passport.use("jwt", new JWTStrategy(JWTConfig, JWTVerify));
};
