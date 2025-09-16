const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

// Tạo specs
const userSpec = YAML.load("./src/docs/user.yaml");
const postSpec = YAML.load("./src/docs/post.yaml");

function swaggerDocs(app, port) {
  // route swagger
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(null, {
      explorer: true, // bật chọn definition
      swaggerOptions: {
        urls: [
          { url: "/swagger/user.json", name: "User API" },
          { url: "/swagger/post.json", name: "Post API" },
        ],
      },
    }),
  );

  //Docs in JSON format
  app.use("/swagger/user.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(userSpec);
  });
  app.use("/swagger/post.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(postSpec);
  });
}

module.exports = swaggerDocs;
