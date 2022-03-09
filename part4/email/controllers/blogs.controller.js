const Blog = require("../models/blog");

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
};

exports.postBlog = async (req, res, next) => {
  const { title, author, url, likes } = req.body;

  if (!(title && author && url)) {
    const error = new Error("Missing values");
    error.statusCode = 400;
    return next(error);
  }

  const blog = new Blog({ title, author, url, likes: likes || 0 });

  const data = await blog.save();

  res.json(data);
};

exports.deleteBlog = async (req, res, next) => {
  const { id } = req.params;

  const data = await Blog.findByIdAndDelete(id);
  res.json(data);
};

exports.updateBlog = async (req, res, next) => {
  const { id } = req.params;
  const { title, author, url, likes } = req.body;

  const data = await Blog.findByIdAndUpdate(id, { title, author, url, likes });
  res.json(data);
};
