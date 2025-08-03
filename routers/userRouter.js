const express = require("express");
const router = express.Router();
const {
  handleUserSignUp,
  handleUserSignIn,
  handleUpdateUserPassword,
  handleDeleteUserByEmail,
} = require("../controllers/userController");

router.post("/signUp", handleUserSignUp);
router.post("/signIn", handleUserSignIn);
router.patch("/updateUserPassword", handleUpdateUserPassword);
router.delete("/deleteUserByEmail/:email", handleDeleteUserByEmail);

module.exports = router;
