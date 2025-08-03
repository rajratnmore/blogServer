const jwt = require("jsonwebtoken");
const { userAuthenticationTokenSecretKey } = require("../constants");

function generateAuthenticationTokenForUser(user) {
  try {
    const payload = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      userProfileImage: user.userProfileImage,
    };
    const token = jwt.sign(payload, userAuthenticationTokenSecretKey);
    return { token, payload };
  } catch (error) {
    throw new Error(
      "File:Backend/services/userAuthenticationWithToken.js in catch block something went wrong here " +
        error
    );
  }
}
function getAuthenticationTokenOfUser(token) {
  try {
    if (!token || typeof token !== "string" || token === "undefined") {
      console.error("⚠️ Token is empty or invalid format. ");
      return null;
    }

    const user = jwt.verify(token, userAuthenticationTokenSecretKey);
    return user;
  } catch (error) {
    console.error(
      "File:Backend/services/getAuthenticationTokenOfUser.js from catch block JWT verification failed: ",
      error.message
    );
    throw new Error(
      "File:Backend/services/getAuthenticationTokenOfUser.js - JWT verification failed " +
        error
    );
  }
}

module.exports = {
  generateAuthenticationTokenForUser,
  getAuthenticationTokenOfUser,
};
