const userController = require("../controllers/userController");

const userRouter = (router) => {
  this.userController = new userController();

  router.post("/auth/signup", this.userController.signup());
};

module.exports = userRouter;
