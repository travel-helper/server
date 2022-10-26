const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const {sequelize} = require('./models');
const postRouter = require('./routers/post.router')
//const morgan = require("morgan");
//const cookieParser = require("cookie-parsers");

dotenv.config();


const comression = require("compression");

const app = express();
// const Router = require("./routers/router.js");
// const swaggerUi = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");
// const options = require("../swagger/swaggerDoc");



app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(helmet());
app.use(cors(
    // {
    // origin:'*',
    // credentials:true,
    // }
    )); //허용 도메인 설정
//app.use(morgan("tiny"));
app.use('/post', postRouter);

sequelize.sync({ force: false })
   .then(() => {
      console.log('데이터베이스 연결됨.');
   }).catch((err) => {
      console.error(err);
   });
//mysql와 sequelize 동기화

app.get('/',(req,res)=>{
    res.send('백엔드 서버 실행중');
    })//실행확인용




app.listen(443,()=>{


console.log('서버실행중')});