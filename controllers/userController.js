const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const { createHmac, randomBytes } = require("crypto");

async function handleUserSignUp(req, res) {
  try {
    const { firstName, lastName, gender, email, password } = req.body;
    const user = await User.create({
      firstName,
      lastName,
      gender,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      message:
        "New user created.   File:Backend/controllers/userController.js in try block from 'handleUserSignUp' method ",
      data: { user },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "File:Backend/controllers/userController.js in catch block from 'handleUserSignUp' method ",
      error: error.message,
    });
  }
}

async function handleUserSignIn(req, res) {
  try {
    const { email, password } = req.body;
    const tokenAlongWithUser = await User.findMatchWithUserAndGenerateToken(
      email,
      password
    );

    return res.status(200).json({
      success: true,
      message:
        "File:Backend/controller/userController.js from 'handleUserSignIn' method  Valid user",
      data: {
        token: tokenAlongWithUser.token,
        user: tokenAlongWithUser.payload,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "File:Backend/controller/userController.js in catch block from 'handleUserSignIn' method ",
      error: error.message,
    });
  }
}

async function handleUpdateUserPassword(req, res) {
  try {
    if (!req.user) {
      throw new Error(
        "File:Backend/controller/userController.js in try block from 'handleUpdateUserPassword' method User is not loggedIn "
      );
    }
    console.log(
      "File:Backend/controller/userController.js in try block from 'handleUpdateUserPassword' req.user:- ",
      req.user
    );
    console.log(
      "File:Backend/controller/userController.js in try block from 'handleUpdateUserPassword' req.body:- ",
      req.body
    );
    const { oldPassword, newPassword } = req.body;
    const user = await User.findOne({ email: req.user.email });
    const oldHashedPassword = user.password;
    const currentHashedPassword = createHmac("sha256", user.salt)
      .update(oldPassword)
      .digest("hex");

    if (oldHashedPassword !== currentHashedPassword) {
      return res.status(400).json({
        success: false,
        message:
          "File:Backend/controller/userController.js in catch block from 'handleUpdateUserPassword' method old password is incorrect ",
      });
    }
    const newHashedPassword = createHmac("sha256", user.salt)
      .update(newPassword)
      .digest("hex");

    const updatedUserWithNewPassword = await User.findOneAndUpdate(
      {
        email: user.email,
        password: currentHashedPassword,
      },
      {
        password: newHashedPassword,
      }
    );
    return res.status(200).json({
      success: true,
      message:
        "File:Backend/controller/userController.js in catch block from 'handleUpdateUserPassword' method password updated successfully ",
      data: { updatedUserWithNewPassword },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "File:Backend/controller/userController.js in catch block from 'handleUpdateUserPassword' method ",
      error: error.message,
    });
  }
}

async function handleDeleteUserByEmail(req, res) {
  try {
    if (!req.user) {
      throw new Error(
        "File:Backend/controller/userController.js in try block from 'handleUpdateUserPassword' method User is not loggedIn "
      );
    }
    const email = req.params.email;
    await Comment.deleteMany({ commentedBy: req.user._id });
    await Blog.deleteMany({ createdBy: req.user._id });
    const deletedUser = await User.findOneAndDelete({ email });
    return res.status(200).json({
      success: true,
      message:
        "File:Backend/controller/userController.js in try block from 'handleDeleteUserByEmail' method ",
      data: { deletedUser },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "File:Backend/controller/userController.js in catch block from 'handleDeleteUserByEmail' method ",
      error: error.message,
    });
  }
}

module.exports = {
  handleUserSignUp,
  handleUserSignIn,
  handleUpdateUserPassword,
  handleDeleteUserByEmail,
};
