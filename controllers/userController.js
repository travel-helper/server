const userService = require("../services/userService");

const baseResponse = require("../utilities/baseResponseStatus");
const { errResponse, response } = require("../utilities/response");
const regexDate = new RegExp(
  /(^(19|20)\d{2})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/
); // YYYYMMDD 확인 정규표현식



exports.loadUsers = async function (req, res) {
  const result = await userService.loadUser();
  return res.status(200).json(result);
};


const passport = require("passport");

exports.login = async function (req,res){  // 패스포트를 활용한 로그인 컨트롤러(서비스는 패스포트 내에 존재함)

passport.authenticate("local",(err,user,info)=>{

if(err){

  console.error(err);
  next(err);
}

if(info){


  return res.status(401).send(info.reason);
}

return req.login(user,async(loginErr)=>{ // passport index.js 실행 

if(loginErr){

  return next(loginErr);
}

return res.json(user);
})

})(req,res,nest);


}

