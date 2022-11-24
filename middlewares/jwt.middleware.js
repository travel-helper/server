const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { response, errResponse } = require("../utilities/response");
const baseResponse = require("../utilities/baseResponseStatus");

exports.isJWT = (req, res, next) => {
  console.log("헤더확인");
  console.log(req.headers["authorization"]);
  let accessToken =
    req.headers["x-access-token"] || req.headers["authorization"];
  if (!accessToken) {
    //토큰이 없는 경우
    return res.status(401).send(errResponse(baseResponse.TOKEN_EMPTY));
  }

  // const token = accessToken.replace(/^Bearer\s+/, ""); //토큰 값 앞의 Bearer를 없앰
  const token = accessToken;

  console.log("토큰추출");
  console.log(token);
  if (!token) {
    return res.status(401).send(errResponse(baseResponse.TOKEN_EMPTY));
  }

  //토큰 검증
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, "jwt-secret-key", (error, verifiedToken) => {
      if (error) {
        console.log("유효하지 않은 토큰입니다.");
        console.log(error);
        reject(error);
      }
      //검증 성공하면 verifiedToken으로 넘기기

      console.log("유효한 토큰입니다.");
      resolve(verifiedToken);
    });
  });

  const onError = (error) => {
    return res
      .status(401)
      .send(errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE));
  };

  p.then(async (verifiedToken) => {
    // 비번 변경시 추가할 곳
    // DB에서 jwt 토큰 유무 검사(로그인 시 생성하며, 로그아웃 시 제거할 것)
    // const loginCheckbyToken = await userService.checkValidAccess(verifiedToken.userIdx);

    // 로그아웃/회원탈퇴한 유저에 대해 접근하려는 경우
    // if(loginCheckbyToken == null){
    //     return res.send(errResponse(baseResponse.TOKEN_WRONG_ACCESS));
    // }
    // // 현재 로그인되어있는 유저의 이전 로그인 jwt로 접근하려는 경우
    // else if(loginCheckbyToken != token) {
    //     return res.send(errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE));
    // }
    // else
    req.verifiedToken = verifiedToken; //유효한 토큰 인 경우 next()로 다음 미들웨어 실행
    next();
  }).catch(onError);
};

exports.isNotJWT = (req, res, next) => {
  console.log("헤더확인");
  console.log(req.headers["authorization"]);
  let accessToken =
    req.headers["x-access-token"] || req.headers["authorization"];
  if (!accessToken) {
    //토큰이 없는 경우
    next();
  } else {
    return res.status(401).send("로그인 하지 않은 사용자만 접근 가능합니다. ");
  }
};
