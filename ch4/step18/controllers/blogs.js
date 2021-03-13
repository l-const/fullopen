const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")


const getTokenFrom = request => {
    const authorization = request.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
        return authorization.substring(7)
    }
    return null
}

blogRouter.get("/", async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate("user", {username: 1, name: 1, id: 1})
    response.json(blogs)
})


blogRouter.post("/", async (request, response) => {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid"})
    }

    const user = await User.findById(decodedToken.id)

    if (!body.url && !body.title) {
        return response.status(400).json({error: "missing url or title"})
    }


    const blog = new Blog ({
       title: body.title || "",
       author: body.author || "",
       url: body.url || "",
       likes: body.likes || 0,
       user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    
    response.status(200).json(savedBlog)
})

blogRouter.delete("/:id", async (request, response) => {
    console.log(request.params.id)
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})


blogRouter.get("/:id", async (request, response) => {
    const note = await Blog.findById(request.params.id)
    if (note) {
        response.status(200).json(note)
    } else {
        response.status(400).end()
    }
})



blogRouter.put("/:id", async (request, response) => {
    const body = request.body

    const blog = {
       title: body.title || "",
       author: body.author || "",
       url: body.url || "",
       likes: body.likes || 0,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog , {new: true})
    response.json(updatedBlog.toJSON())
})

module.exports = blogRouter