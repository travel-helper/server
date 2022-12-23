const { Post, User, Hashtag, Image, Comment } = require("../model");
// const { Op } = require('sequelize');

const baseResponse = require("../utilities/baseResponseStatus");
const { errResponse, response } = require("../utilities/response");

exports.loadPosts = async function (where) {
  const posts = await Post.findAll({
    where,
    limit: 10,
    order: [
      ["createdAt", "DESC"],
      // [Comment, "createdAt", "DESC"],
    ],
    include: [
      {
        model: User,
        // attributes: ["id"],
        attributes: ["id", "nickname"],
      },
      {
        model: Image,
      },
      // {
      //   model: Comment,
      //   include: [
      //     {
      //       model: User,
      //       attributes: ["id"],
      //       // attributes: ["id", "nickname"],
      //     },
      //   ],
      // },
      {
        model: User, // 좋아요 누른 사람
        as: "Likers",
        attributes: ["id"],
      },
    ],
  });

  return posts;
};

exports.addContent = async function (req) {
  // post테이블에 content와 id를 저장

  const post = await Post.create({
    title: req.body.title,
    content: req.body.content,
    tema: req.body.tema,
    region: req.body.region,
    thumbnail: req.body.thumbnail,
    price_range: req.body.priceRange,
    UserId: req.user.dataValues.id,

    // UserId: req.body.id, //수정 요 >req.user.id
  });

  return post;
};

exports.mapHashtag = async function (hashtags) {
  const result = await Promise.all(
    // promise.all은 인자로 받은 배열의 원소가 모두 fulfilled 상태일때 결과값을 반환
    hashtags.map((tag) =>
      Hashtag.findOrCreate({
        //배열을 순회하며, 해당 해시 태그가 존재하지 않으면 추가
        where: { name: tag.slice(1).toLowerCase() }, // #을 제거후 소문자화
      })
    )
  );

  return result;
};

exports.addImage = async function (req, post) {
  const image = await Image.create({ src: req.body.image }); //이미지 url 테이블에 저장, 기입한 url을 반환받음
  await post.addImages(image); //post - image 관계 테이블에 매핑
};

exports.getFullPost = async function (post) {
  const fullpost = await Post.findOne({
    where: { id: post.id }, //기본 반환 값은 content

    include: [
      //관계데이터 포함
      {
        model: Image, //게시글과 매핑된
        //이미지
      },
      {
        model: Comment, //댓글
        include: [
          {
            model: User, //작성자
            attributes: ["id", "nickname"], //의 아이디와 닉네임
          },
        ],
      },
      {
        model: User, //작성자
        attributes: ["id", "nickname"], //의 아이디와 닉네임
      },
      {
        model: User, //좋아요 누른 사람
        as: "Likers",
        attributes: ["id"], //의 아이디
      },
    ],
  });

  return fullpost;
};

exports.findPost = async function (req) {
  const post = await Post.findOne({
    where: { id: req.params.postId },
  });

  return post;
};

exports.addComment = async function (req, res) {
  const comment = await Comment.create({
    content: req.body.content,
    PostId: parseInt(req.params.postId, 10),
    UserId: req.user.id, //수정 요 >req.user.id
  });

  const fullComment = await Comment.findOne({
    where: { id: comment.id },
    include: [
      {
        model: User,
        attributes: ["id", "nickname"],
      },
    ],
  });

  return fullComment;
};

exports.updatePost = async function (req) {
  await Post.update(
    {
      content: req.body.inText,
    },
    {
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    }
  );
  const post = await Post.findOne({ where: { id: req.params.postId } });

  return post;
};
exports.deletePost = async function (req) {
  deleteComment = await Post.destroy({
    where: {
      id: req.params.postId,
      UserId: req.user.id, //수정 요 >req.user.id
    },
  });
};

exports.like = async function (post, req) {
  await post.addLikers(req.user.id); //수정 요 >req.user.id
};

exports.unlike = async function (post, req) {
  await post.removeLikers(req.user.id); //수정 요 >req.user.id
};
