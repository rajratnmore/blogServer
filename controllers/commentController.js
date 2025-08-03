const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");

async function handleCrateNewComment(req, res) {
  try {
    const { comment } = req?.body;
    const blogId = req?.params?.blogId;

    if (!req.user || !comment || comment === "") {
      console.error("User is not authorized to comment this post");
      return res.status(400).json({
        success: false,
        message:
          "File:Backend/controllers/commentController.js in try block from 'handleCreateNewComment' method ",
      });
    }
    const userId = req.user._id;
    const commentBlog = await Blog.findById(blogId);
    const commentPost = await Comment.create({
      comment,
      blogId: commentBlog._id,
      commentedBy: userId,
    });

    return res.status(201).json({
      success: true,
      message: "New comment created successfully",
      data: { commentPost },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "File:Backend/controllers/commentController.js in catch block from 'handleCreateNewComment' method ",
      error: error.message,
    });
  }
}

async function handleGetAllCommentsOf(req, res) {
  try {
    const blogId = req.params.blogId;
    const allComments = await Comment.find({ blogId }).populate("commentedBy");
    return res.status(200).json({
      success: true,
      message:
        "File:Backend/controllers/commentController.js in catch block from 'handleGetAllComments' method fetched all comments from database ",
      data: { allComments },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "File:Backend/controllers/commentController.js in catch block from 'handleGetAllComments' method ",
      error: error.message,
    });
  }
}

module.exports = { handleCrateNewComment, handleGetAllCommentsOf };
