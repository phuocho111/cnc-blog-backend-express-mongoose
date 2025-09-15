const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-sequence")(mongoose);
const Post = new Schema(
  {
    user_id: {
      type: Number,
      require: true,
      ref: "User",
    },
    post_id: { type: Number },
    title: { type: String, require: [true, "please add the post title"] },
    content: { type: String, required: [true, "please add the post content"] },
    description: {
      type: String,
      required: [true, "please add the post description"],
    },
    image: {
      type: String,
      required: [true, "please add the post image"],
    },
    categories: {
      type: [String],
      required: [true, "please add the post categories"],
    },
    slug: { type: String, slug: "title" },
  },
  {
    timestamps: true,
  },
);
// Add plugins to the schema
mongoose.plugin(slug, {
  separator: "-", // Dấu phân cách
  lang: false, // Không force về ASCII
  truncate: 120, // Giới hạn slug
  symbols: false, // Không đổi ký hiệu thành chữ
});
Post.plugin(autoIncrement, { inc_field: "post_id" });
Post.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("Post", Post);
