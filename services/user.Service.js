const User = require("../model/user");
// const { Op } = require('sequelize');
const bcrypt = require("bcrypt");
const baseResponse = require("../utilities/baseResponseStatus");
const { errResponse, response } = require("../utilities/response");


exports.loadUser = async function () {
  pass;
};

exports.exUser=async function (req) { //이메일 중복 확인

  const exUser=await User.findOne({
    where: {
      email: req.body.email,
    },
  })

  return exUser
};

exports.createUser=async function (req) { //유저 생성
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  await User.create({
    email: req.body.email,
    nickname: req.body.nickname,
    password: hashedPassword,
    gender: req.body.gender,
    age:req.body.age,
    address:req.body.address
  })

};