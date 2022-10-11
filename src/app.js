const express = require("express");
const dotenv = requite("dotenv");
dotenv.config();

const cors = require("cors");
const comression = require("compression");

const app = express();
const Router = require("./routers/router.js");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options = require("../swagger/swaggerDoc");
