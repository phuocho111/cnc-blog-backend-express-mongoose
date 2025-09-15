const Post = require("../models/Post");
const { mongooseToObject } = require("../../util/mongoose");
const { multiplemongooseToObject } = require("../../util/mongoose");
const { formatSlug } = require("../../util/format");
class NewsController {
  // [GET] /Posts
  async Posts(req, res, next) {
    try {
      const { pageNumber, pageSize } = req.query;
      const currentPage = Number(pageNumber);
      const perPage = Number(pageSize);
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
      const totalItems = posts.length;
      const totalPage = Math.ceil(totalItems / perPage);
      if (pageNumber && pageSize) {
        res.json({
          posts,
          totalPosts: posts.length,
          totalPage,
          currentPage,
        });
      } else {
        res.json({
          posts: posts,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // [GET] /Post Detail
  async PostDetail(req, res, next) {
    try {
      const postItem = await Post.findOne({
        slug: formatSlug(req.params.slug),
      });
      if (!postItem) {
        res.status(404).json({ status: 404, message: "Post not found!" });
      }
      res.json(mongooseToObject(postItem));
    } catch (err) {
      next(err);
    }
  }

  // [GET] /User of posts
  async UserOfPosts(req, res, next) {
    try {
      const userOfPosts = await Post.find({ user_id: req.user.id });
      res.json(multiplemongooseToObject(userOfPosts));
    } catch (err) {
      next(err);
    }
  }

  // [GET] /Edit post
  async Edit(req, res, next) {
    try {
      console.log(req.params.id, req.user.id);
      const postEdit = await Post.findOne({ post_id: Number(req.params.id) });

      if (!postEdit) {
        res.status(403).json({
          status: 403,
          message: "not found post",
        });
      }
      res.json(mongooseToObject(postEdit));
    } catch (err) {
      next(err);
    }
  }

  // [PUT] /Update post
  async Update(req, res, next) {
    try {
      const postUpdate = await Post.updateOne({ post_id: Number(req.params.id) }, req.body);
      res.json(postUpdate);
    } catch (err) {
      next(err);
    }
  }

  // [Delete] /Delete post
  async Delete(req, res, next) {
    try {
      const postDelete = await Post.deleteOne({
        post_id: Number(req.params.id),
      });
      res.json(postDelete);
    } catch (err) {
      next(err);
    }
  }

  // [POST] /Create post
  async Create(req, res, next) {
    const { title, content, description, image, categories } = req.body;
    if (!title || !content || !description || !image || !categories) {
      res.status(404).json({ status: 404, message: "All fields are required!" });
    }
    try {
      const newPost = await Post.create({
        title,
        content,
        description,
        image,
        categories,
        user_id: req.user.id, // Lấy user_id từ req.user
      });

      res.status(201).json(newPost);
      res.status(201).json({
        status: 201,
        message: "Post created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NewsController();
