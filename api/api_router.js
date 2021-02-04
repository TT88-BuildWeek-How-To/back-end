const router = require("express").Router();

/*  Howto Router  */
const router = require("../post/post_router");

/*  Users Router  */
const userRouter = require("../users/users_router");

router.use("/post", router);
router.use("/users", userRouter);


module.exports = router;
