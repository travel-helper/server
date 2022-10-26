const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const comression = require("compression");
const helmet = require("helmet");
const { sequelize } = require("./models");
const postRouter = require("./routers/post.router");
//const morgan = require("morgan");
//const cookieParser = require("cookie-parsers");

dotenv.config();
const app = express();
const Router = require("./routers/index.js");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options = require("../swagger/swagger");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use("/post", postRouter);

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
  console.log(`${DB_USER}, ${DB_PASS}, ${DB_HOST}, ${DB_NAME}, ${DB_PASS}`);
  console.log(`서버실행중 : http://${SERVER_HOST}:${SERVER_PORT}`);
});
