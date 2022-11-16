exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    //passport의 isAuthenticated 메서드는 유저의 현재 로그인 상태를 반환함
    next(); // next의 인자가 비어있는 경우 다음 미들웨어(컨트롤러 부분)을 실행함
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인하지 않은 사용자만 접근 가능합니다.");
  }
};
