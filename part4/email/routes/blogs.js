const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const blogsController = require("../controllers/blogs.controller");

router.get("/", asyncHandler(blogsController.getBlogs));

router.post("/", asyncHandler(blogsController.postBlog));

router.delete("/:id", asyncHandler(blogsController.deleteBlog));

router.put("/:id", asyncHandler(blogsController.updateBlog));

module.exports = router;
