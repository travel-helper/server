const postService = require("../services/post");
const baseResponse = require("../utilities/baseResponseStatus");
const { errResponse, response } = require("../utilities/response");

exports.loadPosts = async function (req, res) {
  const lastId = req.query.lastId;
  const result = await postService.loadPosts(lastId);
  return res.status(200).json(result);
};

exports.addImg = async (req, res, next) => {
  res.json({ url: `/upload/${req.file.filename}` });
};

exports.addPost = async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g); //해시태그 추출

    const post = await postService.addContent(req); //게시글 text 저장

    if (hashtags) {
      await postService.addHashtag(hashtags, post); //게시글 해시태그 매핑
    }

    if (req.body.image) {
      await postService.addImage(req, post); //게시글 이미지 매핑
    }

    const fullPost = await postService.getFullPost(post); //조인된 post 반환

    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

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

exports.updatePost = async (req, res, next) => {
  const hashtags = req.body.content.match(/#[^\s#]+/g);
  try {
    await Post.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.postId,
          UserId: req.user.id,
        },
      }
    );
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      ); // [[노드, true], [리액트, true]]
      await post.setHashtags(result.map((v) => v[0]));
    }
    res.status(200).json({
      PostId: parseInt(req.params.postId, 10),
      content: req.body.content,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
