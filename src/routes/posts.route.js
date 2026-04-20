const express = require("express");
const router = express.Router();
const postsController = require("../app/controllers/posts.controller");
const validateToken = require("../app/middleware/validateTokenHandler");

router.get("/", postsController.Posts);
router.get("/user", validateToken.validateTokenCookie, postsController.UserOfPosts);
router.get("/:slug", validateToken.validateTokenCookie, postsController.PostDetail);
router.post("/", validateToken.validateTokenCookie, postsController.Create);
router.get("/user/:id", validateToken.validateTokenCookie, postsController.Edit);
router.put("/user/:id", validateToken.validateTokenCookie, postsController.Update);
router.delete("/user/:id", validateToken.validateTokenCookie, postsController.Delete);

module.exports = router;
