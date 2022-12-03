const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const tagController = require("../controllers/hashtag");

const router = express.Router();

router.get("/:hashtag", tagController);
