const {
  getAuthenticationTokenOfUser,
} = require("../services/userAuthenticationWithToken");

function checkIsUserAuthorized() {
  return (req, res, next) => {
    try {
      const authorizationHeaderValue = req.headers["authorization"];
      req.user = null;

      if (
        !authorizationHeaderValue ||
        !authorizationHeaderValue.startsWith("Bearer")
      ) {
        return next();
      }
      const token = authorizationHeaderValue.split("Bearer ")[1];
      const user = getAuthenticationTokenOfUser(token);
      req.user = user;
      console.log(
        "File:Backend/middlewares/checkIsUserAuthorized.js:25 from 'checkIsUserAuthorized' method req.user:- ",
        req.user
      );
      return next();
    } catch (error) {
      console.error(
        "File:Backend/middlewares/checkIsUserAuthorized.js in catch block from 'checkIsUserAuthorized' method error:-",
        error
      );
      return res.status(500).json({
        success: false,
        message:
          "File:Backend/middlewares/checkIsUserAuthorized.js from 'checkIsUserAuthorized' method  something weng wrong ",
        error: error.message,
      });
    }
  };
}

module.exports = { checkIsUserAuthorized };
