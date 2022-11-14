const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const comression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const { sequelize } = require("./model/index");
const postRouter = require("./routers/post.router");
const userRouter = require("./routers/user.router");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const passportConfig = require("./passport");

dotenv.config();

const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = require("./swagger/swagger");
const { compareSync } = require("bcrypt");

//클라이언트에서 보내준 데이터를 json으로 파싱해서 req.body에 전송
app.use(express.json());
//로그인, 회원가입 등 form태그에서 submit하여 전달할 때 form 파싱
app.use(express.urlencoded({ extended: false }));
// app.use(compression());
app.use(helmet());
app.use(
  cors()
  // {
  // origin:'*',
  // credentials:true,
  // }
); //허용 도메인 설정
app.use(cookieParser(process.env.COOKIE_SECRET)); //cookieparser에 비밀키 설정
app.use(morgan("dev")); //개발모드로 로깅

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });
//mysql와 sequelize 동기화

const {
  SERVER_HOST,
  SERVER_PORT,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_NAME,
  DB_PORT,
} = process.env;

// app.use("/post", postRouter);
app.use("/user", userRouter);


app.use(cookieParser('travelH')); // 키 코드로 쿠기 생성 -> 추후 dotenv로 키값을 옮길 예정

app.use(session({

saveUninitialized:false,
resave:false,
secret:'travelH',

}));

app.use(passport.initialize()); //passport 초기화
app.use(passport.session()); //페이지 내에서 영구 로그인 설정 (변경 요)

passportConfig(); //패스포트 설정 실행

app.get("/", (req, res) => {
  res.send("백엔드 서버 실행중");
}); //실행확인용

//404 처리
app.use((req, res, next) => {
  console.log("404 Error");
  res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message);
});

app.listen(SERVER_PORT, () => {
  console.log(`서버실행중 : http://${SERVER_HOST}:${SERVER_PORT}`);
});
