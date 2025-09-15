const express = require("express");
const router = express.Router();
const blogController = require("../app/controllers/BlogController");
const validateToken = require("../app/middleware/validateTokenHandler");

// router.use(validateToken);

router.get("/", blogController.list);
router.post("/", validateToken, blogController.create);
router.get("/:id", validateToken, blogController.edit);
router.put("/:id", validateToken, blogController.update);
router.patch("/:id/restore", validateToken, blogController.restore);
router.delete("/:id", validateToken, blogController.delete);
router.delete("/:id/force", validateToken, blogController.forceDelete);
router.get("/:slug", validateToken, blogController.detail);

module.exports = router;
