const express = require("express");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 8888;
const hostName = process.env.HOST_NAME || "localhost";
const morgan = require("morgan");
const methodOverride = require("method-override");
const app = express();
const errorHandle = require("./app/middleware/errorHandle");
const swaggerDocs = require("./swagger");
cors = require("cors");
const route = require("./routes");
const db = require("./config/db");

// Condition CORS
app.use(cors());

// Connect to database
db.connect();

// Action ---> Dispatcher ---> Function handler

// Cho phép public thư mục images ra ngoài
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// Override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride("_method"));

// Custom middleware
app.use(errorHandle);

// HTTP loggerlogger
app.use(morgan("combined"));

// Routes init
route(app);

app.listen(port, hostName, () => {
  console.log(`App listening on port ${port}`);
  swaggerDocs(app, port);
});
