const blogsRouter = require("express").Router();
const Blog = require("../models/blog_model");

// personsRouter.get('/info', (request, response,next) => {
//   Person.find({}).then(persons => {
//     const numberPersons = persons.length
//     const dateRequet = new Date().toString()
//     response.send(`<h3>Phonebook has info for ${numberPersons} people</h3>
//     <p>${dateRequet}</p>`)
//   }).catch(error => next(error))
// })

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

// // const idNum = Math.floor(Math.random() * 4556432)

blogsRouter.get("/:id", async (request, response) => {
  console.log(request.params.id);
  const body = request.body;
  const user = request.user;

  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

////////////////////////////////////////check about next
blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = request.user;
  console.log("line39");
  console.log(body);
  console.log("line41");
  console.log(user);
  //console.log(body.password)
  //if (body === undefined||!body.name||!body.number) {
  if (body === undefined) {
    return response.status(400).json({ error: "content missing" });
  }
  if (!user) {
    return response.status(403).json({ error: "user missing" });
  }
  if (!body.title || !body.url) {
    return response.status(400).json({ error: "title or url missing" });
  }
  const blogFound = await Blog.find({ title: body.title });
  if (blogFound[0]) {
    console.log(blogFound);
    return response.status(400).json({ error: "this person already exists" });
  }

  // user.blogs = user.blogs.concat(body._id)
  // await user.save()

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes | 0,
    user: user,
    comments: [],
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;

  console.log(user.id.toString());
  console.log("line93");
  const blog = await Blog.findById(request.params.id);
  console.log(blog.user.toString());
  // console.log('line96')
  // console.log(blog.user.toString())
  if (user.id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: "user not authorized" });
  } else {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  }

  // user.blogs = user.blogs.filter(b => b._id.toString() !== blog._id.toString())
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes + 1,
    user: body.user.id,
    comments: body.comments,
  };
  console.log(blog);

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });
  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    response.status(400).end();
  }
});

module.exports = blogsRouter;
