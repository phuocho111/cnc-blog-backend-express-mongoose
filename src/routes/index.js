const postsRouter = require("./posts.route");
const meRouter = require("./me.route");
const aboutRouter = require("./about.route");
const blogRouter = require("./blogs.route");
const userRouter = require("./users.route");
const uploadRouter = require("./upload.route");
const categoryRouter = require("./category.route");

function route(app) {
  app.use("/api/posts", postsRouter);
  app.use("/api/me", meRouter);
  app.use("/api/about", aboutRouter);
  app.use("/api/blogs", blogRouter);
  app.use("/api/users", userRouter);
  app.use("/api/upload", uploadRouter);
  app.use("/api/categories", categoryRouter);
}

module.exports = route;
