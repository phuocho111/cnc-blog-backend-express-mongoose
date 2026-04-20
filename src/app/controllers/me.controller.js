const Blog = require("../models/blog.model");
const { multiplemongooseToObject } = require("../../util/mongoose");

class MeController {
  // [GET] /stored/blogs
  storedBlogs(req, res, next) {
    Promise.all([
      Blog.find({}),
      Blog.countDocumentsWithDeleted({
        deleted: true,
      }),
    ])
      .then(([blogs, deletedCount]) => {
        res.render("me/stored-blogs", {
          deletedCount,
          blogs: multiplemongooseToObject(blogs),
        });
      })
      .catch(next);
  }
  // [GET] /trash/blogs
  trashBlogs(req, res, next) {
    Blog.findWithDeleted({ deleted: true })
      .then((blogs) => {
        res.render("me/trash-blogs", {
          blogs: multiplemongooseToObject(blogs),
        });
      })
      .catch(next);
  }
}

module.exports = new MeController();
