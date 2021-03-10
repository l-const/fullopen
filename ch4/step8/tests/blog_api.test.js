const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helper")
const api = supertest(app)
const Blog = require("../models/blog")

beforeEach( async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
})


describe("HTTP GET(4.8)", () => {
    test('blogs are returned as json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

    test("correct number of posts", async () => {
        const response = await api.get("/api/blogs")
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })


    test("correct content", async () => {
        const response = await api.get("/api/blogs")
        const authors = response.body.map(r => r.author)
        expect(authors).toContain("ntinos")
    })


})


afterAll(()=> {
    mongoose.connection.close()
})