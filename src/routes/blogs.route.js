const express = require("express");
const router = express.Router();
const blogController = require("../app/controllers/blog.controller");
const validateToken = require("../app/middleware/validateTokenHandler");

// router.use(validateToken);

router.get("/", blogController.list);
router.post("/", validateToken.validateTokenCookie, blogController.create);
router.get("/:id", validateToken.validateTokenCookie, blogController.edit);
router.put("/:id", validateToken.validateTokenCookie, blogController.update);
router.patch("/:id/restore", validateToken.validateTokenCookie, blogController.restore);
router.delete("/:id", validateToken.validateTokenCookie, blogController.delete);
router.delete("/:id/force", validateToken.validateTokenCookie, blogController.forceDelete);
router.get("/:slug", validateToken.validateTokenCookie, blogController.detail);

module.exports = router;
