const express = require("express");
const router = express.Router();
const blogController = require("../app/controllers/BlogController");
const validateToken = require("../app/middleware/validateTokenHandler");

// router.use(validateToken);

router.get("/", blogController.list);
router.post("/", validateToken.validateTokenHeader, blogController.create);
router.get("/:id", validateToken.validateTokenHeader, blogController.edit);
router.put("/:id", validateToken.validateTokenHeader, blogController.update);
router.patch("/:id/restore", validateToken.validateTokenHeader, blogController.restore);
router.delete("/:id", validateToken.validateTokenHeader, blogController.delete);
router.delete("/:id/force", validateToken.validateTokenHeader, blogController.forceDelete);
router.get("/:slug", validateToken.validateTokenHeader, blogController.detail);

module.exports = router;
