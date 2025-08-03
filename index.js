require("dotenv").config();
const { makeDatabaseConnectionWithServer } = require("./databaseConnectivity");
const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routers/userRouter");
const blogRouter = require("./routers/blogRouter");
const commentRouter = require("./routers/commentRouter");
const { PORT, FRONTEND_BASE_URL } = require("./constants");
const {
  checkIsUserAuthorized,
} = require("./middlewares/checkIsUserAuthorized");

// MongoDB connectivity with nodeJs
makeDatabaseConnectionWithServer();

// Middlewares
app.use(cors({ origin: FRONTEND_BASE_URL, credentials: true }));
app.use(express.json());
app.use(checkIsUserAuthorized());
app.use("/uploads", express.static("public/uploads"));
app.use("/images", express.static("public/images"));

// Routes
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/comment", commentRouter);

app.listen(PORT, () => {
  console.log("Server started on PORT : ", PORT);
});
