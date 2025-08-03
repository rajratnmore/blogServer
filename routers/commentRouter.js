const express = require("express");
const router = express.Router();
const {
  handleCrateNewComment,
  handleGetAllCommentsOf,
} = require("../controllers/commentController");

router.post("/newComment/:blogId", handleCrateNewComment);
router.get("/getAllCommentsOf/:blogId", handleGetAllCommentsOf);

module.exports = router;
