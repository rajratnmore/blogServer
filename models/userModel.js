const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const {
  generateAuthenticationTokenForUser,
} = require("../services/userAuthenticationWithToken");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userProfileImage: { type: String, default: "/images/default.png" },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    salt: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const user = this;

    if (!user.isModified("password")) {
      return next();
    }

    const salt = randomBytes(16).toString("hex");
    const hashedPassowrd = createHmac("sha256", salt)
      .update(user.password)
      .digest("hex");

    this.salt = salt;
    this.password = hashedPassowrd;
    next();
  } catch (error) {
    next(error);
    throw new Error(
      "File:/Backend/models/userModel.js in catch block from 'userSchema.pre' method "
    );
  }
});

userSchema.static(
  "findMatchWithUserAndGenerateToken",
  async function (email, password) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error(
          "File:Backend/models/userModel.js from 'findMatchWithUserAndGenerateToken' method:- User not found"
        );
      }

      const newHashedPassword = createHmac("sha256", user.salt)
        .update(password)
        .digest("hex");

      if (user.password !== newHashedPassword) {
        throw new Error(
          "File:Backend/models/userModel.js from 'findMatchWithUserAndGenerateToken' method:- Password incorrect"
        );
      }

      const tokenAlongWithUser = generateAuthenticationTokenForUser(user);
      return tokenAlongWithUser;
    } catch (error) {
      throw new Error("File:Backend/model/userModel.js somethig went wrong");
    }
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
