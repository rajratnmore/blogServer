const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    comment: { type: String, required: true },
    blogId: { type: Schema.Types.ObjectId, required: true, ref: "blog" },
    commentedBy: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  },
  { timestamps: true }
);

const Comment = model("comment", commentSchema);

module.exports = Comment;
