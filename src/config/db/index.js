const mongoose = require("mongoose");

async function connect() {
  const dbUri = "mongodb://localhost:27017/blog_express";
  try {
    await mongoose.connect(dbUri);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
}
module.exports = { connect };
