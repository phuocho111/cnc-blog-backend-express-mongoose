const postsRouter = require("./posts");
const meRouter = require("./me");
const aboutRouter = require("./about");
const blogRouter = require("./blogs");
const userRouter = require("./users");
const uploadRouter = require("./upload");
const categoryRouter = require("./category");

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
