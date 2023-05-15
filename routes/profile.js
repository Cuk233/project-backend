const { ProfileControllers } = require("../controller");

const router = require("express").Router();

router.get("/view", ProfileControllers.getUser_profile);
module.exports = router;
