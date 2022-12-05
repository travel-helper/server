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
      const result = await postService.mapHashtag(hashtags); //게시글 해시태그 매핑
      await post.addHashtags(result.map((v) => v[0])); //반환된 fulfilled객체의 name(해시태그)를=> v ([name,true])
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

exports.updatePost = async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const updatedPost = postService.updatePost(req);
    if (hashtags) {
      const hashResult = await postService.mapHashtag(hashtags); //게시글 해시태그 매핑
      await updatedPost.setHashtags(hashResult.map((v) => v[0]));
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
    await postService.deletePost(req);
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const post = postService.findPost(req);
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }

    const createdComment = await postService.addComment(req);

    res.status(201).json(createdComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.like = async (req, res, next) => {
  try {
    const post = postService.findPost(req);
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    postService.like(post, req);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.unlike = async (req, res, next) => {
  try {
    const post = postService.findPost(req);
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    postService.unlike(post, req);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
