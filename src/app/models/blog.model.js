const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-sequence")(mongoose);
const Blog = new Schema(
  {
    user_id: {
      type: Number,
      require: true,
      ref: "User",
    },
    blogId: { type: Number },
    name: { type: String, maxLength: 255, required: true },
    description: { type: String },
    image: { type: String },
    level: { type: String },
    slug: { type: String, slug: ["name", "description"] },
  },
  {
    timestamps: true,
  },
);
// Add plugins to the schema
mongoose.plugin(slug);
Blog.plugin(autoIncrement, { inc_field: "blogId" });
Blog.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("Blog", Blog);
