const express = require("express");
const router = express.Router();
const {
  handleCreateNewBlog,
  handleGetAllBlogsOfUser,
  handleGetAllBlogs,
  handleDeleteBlogById,
} = require("../controllers/blogController");
const {
  blogImageUploadMiddleware,
} = require("../middlewares/blogImageUploadMiddleware");

router.post(
  "/createNewBlog",
  blogImageUploadMiddleware("blogImage"),
  handleCreateNewBlog
);
router.delete("/deleteBlogById/:blogId", handleDeleteBlogById);
router.get("/getAllBlogsOfUser", handleGetAllBlogsOfUser);
router.get("/getAllBlogs", handleGetAllBlogs);

module.exports = router;
