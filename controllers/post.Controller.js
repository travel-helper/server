const postService = require("../services/post.Service");

const baseResponse = require("../utilities/baseResponseStatus");
const { errResponse, response } = require("../utilities/response");

exports.loadPosts = async function (req, res) {
  const lastId = req.query.lastId;
  const result = await postService.loadPosts(lastId);
  return res.status(200).json(result);
};

exports.addPost = async (req, res, next) => { // POST /post
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);

    const post = await Post.create({ //s1
      content: req.body.content,
      UserId: req.user.id,
    });

    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      }))); 
      await post.addHashtags(result.map((v) => v[0]));
    }
    if (req.body.image) {

        const image = await Image.create({ src: req.body.image }); //s2
        await post.addImages(image);
      
    }
    const fullPost = await Post.findOne({ //s3
      where: { id: post.id },
      include: [{
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User, // 댓글 작성자
          attributes: ['id', 'nickname'],
        }],
      }, {
        model: User, // 게시글 작성자
        attributes: ['id', 'nickname'],
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }]
    })
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
}