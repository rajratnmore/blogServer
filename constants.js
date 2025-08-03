require("dotenv").config(); // Only needed in backend

const PORT = process.env.PORT;
const userAuthenticationTokenSecretKey =
  process.env.USER_AUTHENTICATION_TOKEN_SECRET_KEY;
const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;
const MONGODB_URL = process.env.MONGODB_URL;

module.exports = {
  PORT,
  userAuthenticationTokenSecretKey,
  FRONTEND_BASE_URL,
  MONGODB_URL,
};
