const { User } = require("../model");
// const { Op } = require('sequelize');
const bcrypt = require("bcrypt");
const baseResponse = require("../utilities/baseResponseStatus");
const { errResponse, response } = require("../utilities/response");

exports.loadUser = async function () {
  pass;
};

exports.exUser = async function (req) {
  //이메일 중복 확인

  const exUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  return exUser;
};

exports.createUser = async function (req) {
  //유저 생성
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  await User.create({
    email: req.body.email,
    nickname: req.body.nickname,
    password: hashedPassword,
    gender: req.body.gender,
    age: req.body.age,
    address: req.body.address,
  });
};

exports.fullUserWithoutPassword = async function (user) {
  //관계데이터를 포함한 유저 정보를 반환함 (패스워드 제외)

  const fullUserWithoutPassword = await User.findOne({
    where: { id: user.id },
    attributes: {
      exclude: ["password"], //패스워드 제외
    },
    // include: [{
    //   model: Post,
    //   attributes: ['id'],
    // }, {
    //   model: User,
    //   as: 'Followings',
    //   attributes: ['id'], //관계형 데이터 포함
    // }, {
    //   model: User,
    //   as: 'Followers',
    //   attributes: ['id'],
    // }]
  });

  return fullUserWithoutPassword;
};
