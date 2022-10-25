const postController = require("../controllers/postController");

const postRouter = (router) => {
  router.post("/auth/signup", postController);
  router.post("/auth/login", postController);
};
