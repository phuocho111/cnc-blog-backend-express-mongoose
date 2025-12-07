const Blog = require("../models/Blog");
const { mongooseToObject } = require("../../util/mongoose");
const { multiplemongooseToObject } = require("../../util/mongoose");

class BlogController {
  // [GET] /blogs
  async list(req, res, next) {
    try {
      // const blogs = await Blog.find({ user_id: req.user.id });
      const blogs = await Blog.find();
      // res.render("home", { blogs: multiplemongooseToObject(blogs) });
      res.json(multiplemongooseToObject(blogs));
    } catch (err) {
      next(err);
    }
  }
  // [GET] /blogs/:slug
  async detail(req, res, next) {
    try {
      const blogItem = await Blog.findOne({ slug: req.params.slug });
      if (blogDetail.user_id !== req.user.id) {
        res.status(403).json({
          status: 403,
          message: "User is not authorized to view this blog",
        });
      }
      // res.render("blogs/show", { blog: mongooseToObject(blogItem) });
      res.json(mongooseToObject(blogItem));
    } catch (err) {
      next(err);
    }
  }
  // [POST] /blog
  async create(req, res, next) {
    // res.render("blogs/create");
    const { name, description, level } = req.body;
    if (!name || !description || !level) {
      res.status(404).json({ status: 404, message: "All fields are required!" });
    }
    try {
      const newBlog = await Blog.create({
        name,
        description,
        level,
        user_id: req.user.id, // Lấy user_id từ req.user
      });
      res.status(201).json(newBlog);
    } catch (error) {
      next(error);
    }
  }

  // [GET] /blogs/:id/edit
  async edit(req, res, next) {
    try {
      const blogDetail = await Blog.findById(req.params.id);
      if (blogDetail.user_id !== +req.user.id) {
        res.status(403).json({
          status: 403,
          message: "User is not authorized to edit this blog",
        });
      }
      // res.render("blogs/edit", { blog: mongooseToObject(blogDetail) });
      res.json(mongooseToObject(blogDetail));
    } catch (error) {
      next(error);
    }
  }

  // [PUT] /blogs/:id
  async update(req, res, next) {
    try {
      const blogUpdate = await Blog.updateOne({ _id: req.params.id }, req.body);
      // res.redirect("/me/stored/blogs");
      res.json(blogUpdate);
    } catch (error) {
      next(error);
    }
  }

  // [DELETE] /blogs/:id
  async delete(req, res, next) {
    try {
      const blogdelete = await Blog.delete({ _id: req.params.id });
      // res.redirect("/me/stored/blogs");
      res.json(blogdelete);
    } catch (error) {
      next(error);
    }
  }

  // [PATCH] /blogs/:id/restore
  async restore(req, res, next) {
    try {
      const blogRestore = await Blog.restore({ _id: req.params.id });
      // res.redirect("/me/trash/blogs");
      res.json(blogRestore);
    } catch (error) {
      next(error);
    }
  }

  // [DELETE] /blogs/:id/force
  async forceDelete(req, res, next) {
    try {
      const blogForceDelete = await Blog.deleteOne({ _id: req.params.id });
      // res.redirect("/me/trash/blogs");
      res.json(blogForceDelete);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BlogController();
