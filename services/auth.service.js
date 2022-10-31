const auth = require("../repository/auth.repository");
// const { Op } = require('sequelize');

const baseResponse = require("../utilities/baseResponseStatus");
const { errResponse, response } = require("../utilities/response");

exports.loadPosts = async function (lastId) {
  const auth = await Post.findAll({
    attributes: ["id", "text"],
  }); //임시

  return auth;
};
