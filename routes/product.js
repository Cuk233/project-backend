const { productControllers } = require("../controller");

const router = require("express").Router();

router.get("/view", productControllers.findAllProduct);
router.post("/create", productControllers.createProduct);
router.post("/edit/:id", productControllers.updateProduct);

module.exports = router;
