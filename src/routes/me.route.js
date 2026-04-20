const express = require("express");
const router = express.Router();
const meController = require("../app/controllers/me.controller");

router.get("/stored/blogs", meController.storedBlogs);
router.get("/trash/blogs", meController.trashBlogs);

module.exports = router;
