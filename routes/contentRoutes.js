const { ContentControllers } = require("../controller");
const router = require("express").Router();

router.get("/view", ContentControllers.getAllContents);
router.get("/view/:id", ContentControllers.getContentById);
router.post("/create", ContentControllers.createContent);
router.put("/edit/:id", ContentControllers.updateContent);
router.delete("/delete/:id", ContentControllers.deleteContent);

module.exports = router;
