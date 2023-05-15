const { AuthControllers } = require("../controller");

const router = require("express").Router();

router.post("/register", AuthControllers.register);
router.post("/login", AuthControllers.login);
router.get("/users", AuthControllers.findAllUser);
router.get("/verify-email/:id", AuthControllers.verifyEmail);
module.exports = router;
