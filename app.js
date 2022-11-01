const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const comression = require("compression");
const helmet = require("helmet");

const { sequelize } = require("./repository/index.repository");
// const postRouter = require("./routers/post.router");
// const userRouter = require("./routers/user.router");
const passportConfig = require("./passport")

const morgan = require("morgan");
const cookieParser = require("cookie-parsers");

dotenv.config();

const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = require("./swagger/swagger");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // req.body를 사용하기 위한 세팅
// app.use(compression());
app.use(helmet());
app.use(
  cors()
  // {
  // origin:'*',
  // credentials:true,
  // }
); //허용 도메인 설정
//app.use(morgan("tiny"));

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
// app.use("/user", userRouter);


app.use(cookieParser('travelH')); // 키 코드로 쿠기 생성 -> 추후 dotenv로 키값을 옮길 예정

app.use(session({

saveUninitialized:false,
resave:false,
secret:'travelH',

}));

passportConfig(); //패스포트 설정 실행

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });
//mysql와 sequelize 동기화

app.get("/", (req, res) => {
  res.send("백엔드 서버 실행중");
}); //실행확인용

app.listen(SERVER_PORT, () => {
  console.log(`서버실행중 : http://${SERVER_HOST}:${SERVER_PORT}`);
});
