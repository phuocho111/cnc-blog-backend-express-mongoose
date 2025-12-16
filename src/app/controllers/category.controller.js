const Post = require("../models/post.model");

class CategoryController {
  // [GET] /category
  async Categories(req, res, next) {
    try {
      const { slug } = req.params;
      const categories = await Post.distinct("categories", {
        categories: { $regex: slug, $options: "i" },
      });
      const posts = await Post.find().select("title categories -_id");
      console.log(posts);
      res.json(categories || []);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
