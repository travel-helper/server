const passport = require("passport");
const { User } = require("../repository/user.repository");

const local = require ("./local");

module.exports = () => {



passport.serializeUser((user,done)=>{ //유저의 아이디만 갖고 있기

done(null,user.id);
});


passport.deserializeUser( async(id,done)=>{   // id로 user의 나머지 정보 얻어오기

try{

    await User.findOne({where: { id }});
}catch(error){

console.error(error);
done(error);

}


});

local();

}