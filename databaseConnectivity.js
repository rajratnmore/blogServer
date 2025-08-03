const mongoose = require("mongoose");
const { MONGODB_URL } = require("./constants");

function makeDatabaseConnectionWithServer() {
  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("mongoDB connected");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { makeDatabaseConnectionWithServer };
