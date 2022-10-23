const express = require("express");
const router = express.Router();

const postRouter = require("./post.router");
const userRouter = require("./user.router");

module.exports = () => {
  postRouter(router);
  userRouter(router);

  return router;
};
