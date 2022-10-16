const userService = require("../services/userService");
// const baseResponse = require('../utilities/baseResponseStatus')

exports.loadPosts = async function (req, res) {
  const lastId = req.query.lastId;
  const result = await postService.loadPosts(lastId);
  return res.status(200).json(result);
};
