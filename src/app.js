const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = requite("dotenv");
//const morgan = require("morgan");
//const cookieParser = require("cookie-parsers");

dotenv.config();

const cors = require("cors");
const comression = require("compression");

const app = express();
const Router = require("./routers/router.js");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options = require("../swagger/swaggerDoc");

app.use(express.json());
app.use(helmet());
app.use(cors()); //허용 도메인 설정
//app.use(morgan("tiny"));
