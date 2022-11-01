const authService = require("../services/auth.Service");
const dotenv = require("dotenv");
const baseResponse = require("../utilities/baseResponseStatus");
const { errResponse, response } = require("../utilities/response");

const jwt = require("jsonwebtoken");

const passport = requuire("passport");
const bcrypt = require("bcrypt");

const bcryptSaltRounds = 12;

export async function signup(req, res) {
  const { email, nickname, password, phonenumber, birth } = req.body;
  const found = await authService.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await userRepository.createUser({
    email,
    nickname,
    password: hashed,
    phonenumber,
    birth,
  });
  res.status(201).json({ token, username });
}
