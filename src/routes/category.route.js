const express = require("express");

const router = express.Router();

const categoryController = require("../app/controllers/category.controller");

router.get("/:slug", categoryController.Categories);

module.exports = router;
