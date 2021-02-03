const router = require("express").Router();

/*  Howto Router  */
const router = require("../post/post_router");

/*  Users Router  */
const ur = require("../users/users_router");

router.use("/post", router);
router.use("/users", ur);


module.exports = router;
