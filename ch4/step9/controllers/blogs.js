const blogRouter = require("express").Router()
const Blog = require("../models/blog")


blogRouter.get("/api/blogs", async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})


blogRouter.post("/api/blogs", async (request, response) => {
    const body = request.body

    if (!body.url && !body.title) {
        response.status(400).end()
        return
    }


    const blog = new Blog ({
       title: body.title || "",
       author: body.author || "",
       url: body.url || "",
       likes: body.likes || 0,
    })

    const savedBlog = await blog.save()
    response.status(200).json(savedBlog)
})


module.exports = blogRouter