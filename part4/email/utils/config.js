require("dotenv").config();

exports.mongodbURI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
exports.portNum = process.env.PORT || 3000;
