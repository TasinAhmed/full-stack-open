const app = require("../index");
const api = require("supertest")(app);
const Blog = require("../models/blog");

const blogs = [
  { title: "Test", author: "test", url: "www.google.com", likes: 139 },
  { title: "Test 2", author: "test 2", url: "www.facebook.com", likes: 140 },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  const promises = blogs.map((x) => new Blog(x).save());
  await Promise.all(promises);
});

describe("GET /api/blogs", () => {
  test("the unique identifier should be named id", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  });
});

describe("POST /api/blogs", () => {
  test("new blog should be added to the database", async () => {
    const response = await api.post("/api/blogs").send({
      title: "Test 3",
      author: "test",
      url: "www.youtube.com",
      likes: 139,
    });

    expect((await Blog.find({})).length).toBe(3);
  });

  test("likes property should default to 0 if not provided", async () => {
    const response = await api.post("/api/blogs").send({
      title: "Test 3",
      author: "test",
      url: "www.youtube.com",
    });

    expect((await Blog.findOne({ title: "Test 3" })).likes).toBe(0);
  });

  test("return status code 400 when title is missing", async () => {
    const response = await api.post("/api/blogs").send({
      author: "test",
      url: "www.youtube.com",
    });

    expect(response.statusCode).toBe(400);
  });

  test("return status code 400 when url is missing", async () => {
    const response = await api.post("/api/blogs").send({
      title: "Test 3",
      author: "test",
    });

    expect(response.statusCode).toBe(400);
  });
});

describe("DELETE /api/blogs", () => {
  test("blog should be deleted from the database", async () => {
    const deleteId = (await Blog.findOne({ title: "Test" })).id;

    const response = await api.delete(`/api/blogs/${deleteId}`);

    expect((await Blog.find({})).length).toBe(1);
  });
});

describe("PUT /api/blogs", () => {
  test("blog should be updated in the database", async () => {
    const updateId = (await Blog.findOne({ title: "Test" })).id;

    const response = await api
      .put(`/api/blogs/${updateId}`)
      .send({ title: "Title updated" });

    expect((await Blog.findById(updateId)).title).toBe("Title updated");
  });
});
