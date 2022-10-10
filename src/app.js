const express=require('express');
const {sequelize} = require('./models');
const app = express();
const cors = require('cors');
const postRouter = require('./routers/post')


//npx sequelize db:create

sequelize.sync({ force: false })
   .then(() => {
      console.log('데이터베이스 연결됨.');
   }).catch((err) => {
      console.error(err);
   });
//mysql와 sequelize 동기화

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//req.body를 사용하기 위해 달아주는 미들웨어

app.use(cors({
   origin:'*',
   credentials:true,
   }));
//프론트-백엔드 간 port가 달라 발생하는 cors 문제 해결

app.get('/',(req,res)=>{
res.send('Hello!');
})//테스트용


app.use('/post', postRouter);
//라우터 자원별로 분리


app.listen(443,()=>{
   

console.log('서버실행중')});

