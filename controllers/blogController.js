const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");

async function handleCreateNewBlog(req, res) {
  try {
    if (!req?.user) {
      console.error(
        "File:Backend/controllers/blogController.js:7 User is not logged in to create new blog"
      );
      return res.status(401).json({
        success: false,
        message: "User is not logged in to create a new blog",
      });
    }
    const { blogTitle, blogContent } = req.body;
    const blogImageURL = req.file ? req?.file?.filename : null;

    const createdBy = req.user._id;

    const blogEntry = await Blog.create({
      blogTitle,
      blogContent,
      blogImageURL: `uploads/${blogImageURL}`,
      createdBy,
    });

    console.log(
      "File:Backend/controllers/blogController.js from try block in 'handleCreateNewBlog' method blogEntry:- ",
      blogEntry
    );
    return res.status(201).json({
      success: true,
      message:
        "File:Backend/controllers/blogController.js from catch block in 'handleCreateNewBlog' method ",
      data: { blogEntry },
    });
  } catch (error) {
    console.error(
      "File:Backend/controllers/blogController.js from catch block in 'handleCreateNewBlog' method error:- " +
        error
    );
    return res.status(500).json({
      success: false,
      message:
        "File:Backend/controllers/blogController.js from catch block in 'handleCreateNewBlog' method ",
      error: error.message,
    });
  }
}

async function handleGetAllBlogsOfUser(req, res) {
  try {
    if (!req?.user) {
      console.error(
        "File:Backend/controllers/blogController.js:7 User is not logged in to create new blog"
      );
      return res.status(401).json({
        success: false,
        message: "User is not logged in to create a new blog",
      });
    }

    const userId = req?.user?._id;
    const userBlogs = await Blog.find({ createdBy: userId });
    return res.status(200).json({
      success: true,
      message:
        "File:Backend/controllers/blogController.js in catch block from 'handleGetAllBlogsOfUser' method ",
      data: { userBlogs },
    });
  } catch (error) {
    console.error(
      "File:Backend/controllers/blogController.js in catch block from 'handleGetAllBlogsOfUser' method error.message:- ",
      error.message
    );
  }
}

async function handleGetAllBlogs(req, res) {
  try {
    const allBlogs = await Blog.find();
    console.log("allBlogs are :- ", allBlogs);
    return res.status(200).json({
      success: true,
      message:
        "File:Backend/controllers/blogController.js in catch block from 'handleGetAllBlogsOfUser' method ",
      data: { allBlogs },
    });
  } catch (error) {
    console.error(
      "File:Backend/controllers/blogController.js in catch block from 'handleGetAllBlogsOfUser' method error.message:- ",
      error.message
    );
  }
}

async function handleDeleteBlogById(req, res) {
  try {
    const blogId = req.params.blogId;
    await Comment.deleteMany({ blogId });
    await Blog.findByIdAndDelete(blogId);
    return res.status(200).json({
      success: true,
      message:
        "File:Backend/controllers/blogController.js in catch block from 'handleDeleteBlogById' method blog is deleted successfully ",
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message:
        "File:Backend/controllers/blogController.js in catch block from 'handleDeleteBlogById' method error.message:- ",
      error: error.message,
    });
  }
}

module.exports = {
  handleCreateNewBlog,
  handleGetAllBlogsOfUser,
  handleGetAllBlogs,
  handleDeleteBlogById,
};
