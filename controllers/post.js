const postService = require("../services/post");

const baseResponse = require("../utilities/baseResponseStatus");
const { errResponse, response } = require("../utilities/response");
exports.loadPosts = async function (req, res) {
  const lastId = req.query.lastId;
  const result = await postService.loadPosts(lastId);
  return res.status(200).json(result);
};

exports.addImg = async (req, res, next) => {
  try {
    fs.readdirSync("uploads");
  } catch (error) {
    console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
    fs.mkdirSync("uploads");
  }

  const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, "uploads/");
      },
      filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  });

  upload.single("img"),
    (req, res) => {
      console.log(req.file, req.body);
      res.json({ url: `/upload/${req.file.filename}` });
    };
};

exports.addPost = async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g); //해시태그 추출

    const post = await postService.addContent(); //게시글 text 저장

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
