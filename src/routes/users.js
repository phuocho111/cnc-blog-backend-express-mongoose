const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/UserController");
const validateToken = require("../app/middleware/validateTokenHandler");

router.post("/", userController.register);
router.post("/Login", userController.login);
router.get("/Profile", validateToken, userController.profile);

module.exports = router;
