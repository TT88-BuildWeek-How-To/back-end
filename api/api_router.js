const router = require("express").Router();

/*  Howto Router  */
const postRouter = require("../post/post_router");

/*  Users Router  */
const userRouter = require("../users/users_router");

router.use("/posts", postRouter);
router.use("/users", userRouter);


module.exports = router;
