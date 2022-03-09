const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./routes/blogs");
const config = require("./utils/config");
const morgan = require("morgan");
const { errorHandler } = require("./middlewares/errorHandler");

const mongoUrl = config.mongodbURI;
mongoose.connect(mongoUrl);

app.use(morgan("dev"));

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use(errorHandler);

module.exports = app;
