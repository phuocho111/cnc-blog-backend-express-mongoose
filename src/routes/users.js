const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/UserController");
const validateToken = require("../app/middleware/validateTokenHandler");

router.post("/", userController.register);
router.post("/login", userController.login);
router.post("/refresh-token", userController.refreshToken);
router.post("/log-out", userController.logOut);
router.get("/profile", validateToken.validateTokenCookie, userController.profile);

module.exports = router;
