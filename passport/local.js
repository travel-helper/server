const passport =require('passport')

const {Strategy:LocalStrategy} = require('passport-local');
const { User } = require('../repository/user.repository')

module.exports=()=>{


passport.use(new LocalStrategy(
    
    {

usernameField:"email",  
passwordField:"password",}, //body로 전달된 email과 password



async (email,password,done)=>{    //req.body의 email과 passwrod를 가져옴


try{

    const user = await User.findOne({where:{email}}) //이메일로 유저 찾기

    if (!user){

        return done(null,false,{reason:"존재하지 않는 사용자입니다."})
    }

    const result = await bcrypt.compare(password,user.password); // 유저의 암호화된 패스워드와 로그인 패스워드 비교

    if (result){

        return done(null,user); // 비밀번호 찾으면 done객체로 전달
    }

    return done(null,false,{reason:"비밀번호가 틀렸습니다."}) // 틀린 경우
}catch(error){

    console.error(error)
    return done(error)
}


}));


}