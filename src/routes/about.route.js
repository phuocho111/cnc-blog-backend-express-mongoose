const express = require("express");

const router = express.Router();

const aboutController = require("../app/controllers/about.controller");

router.use("/", aboutController.index);

module.exports = router;
