const { Post, Hashtag } = require("../model");
// const { Op } = require('sequelize');

const baseResponse = require("../utilities/baseResponseStatus");
const { errResponse, response } = require("../utilities/response");

exports.loadPosts = async function (lastId) {
  const posts = await Post.findAll({
    attributes: ["id", "text"],
  }); //임시

  return posts;
};

exports.addContent = async function (req) {
  // post테이블에 content와 id를 저장
  const post = await Post.create({
    content: req.body.content,
    UserId: req.user.id,
  });

  return post;
};

exports.addHashtag = async function (hashtags, post) {
  const result = await Promise.all(
    // promise.all은 인자로 받은 배열의 원소가 모두 fulfilled 상태일때 결과값을 반환
    hashtags.map((tag) =>
      Hashtag.findOrCreate({
        //배열을 순회하며, 해당 해시 태그가 존재하지 않으면 추가
        where: { name: tag.slice(1).toLowerCase() }, // #을 제거후 소문자화
      })
    )
  );
  await post.addHashtags(result.map((v) => v[0])); //반환된 fulfilled객체의 name(해시태그)를=> v ([name,true])
  //인자로 받은 post에 hashtahg들을 대응시켜 관계 테이블에 저장
};
