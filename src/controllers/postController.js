const postService = require("../services/postService");
// const baseResponse = require('../utilities/baseResponseStatus')

const baseResponse = require("../utilities/baseResponseStatus");
const { errResponse, response } = require("../utilities/response");

exports.loadPosts = async function (req, res) {
  const lastId = req.query.lastId;
  const result = await postService.loadPosts(lastId);
  return res.status(200).json(result);
};
