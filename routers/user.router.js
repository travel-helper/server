const express = require("express");

const userController = require("../controllers/user.Controller");

const router = express.Router();

router.get("/", userController.loadUsers);

module.exports = router;
