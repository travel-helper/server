const postController = require("../controllers/postController");

const postRouter = (router) => {
  this.postController = new postController();
};

module.exports = postRouter;
