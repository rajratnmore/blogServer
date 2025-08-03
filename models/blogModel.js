const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    blogTitle: { type: String, required: true },
    blogContent: { type: String, required: true },
    blogImageURL: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true }
);

const Blog = model("blog", blogSchema);

module.exports = Blog;
