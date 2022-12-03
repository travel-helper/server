const postService = require("../services/post");
const baseResponse = require("../utilities/baseResponseStatus");
const { errResponse, response } = require("../utilities/response");

exports.addComment = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }

    const comment = await postService.addComment(req);
    const fullComment = await postService.getFullComment(comment);

    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
