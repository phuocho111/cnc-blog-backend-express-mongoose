const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

// Tạo specs
const userSpec = YAML.load("./src/docs/user.yaml");

function swaggerDocs(app, port) {
  // route swagger
  app.use("/docs/Users", swaggerUi.serve, swaggerUi.setup(userSpec));

  //Docs in JSON format
  app.use((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(userSpec);
  });
}

module.exports = swaggerDocs;
