const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helper")
const api = supertest(app)
const Blog = require("../models/blog")
const User = require("../models/user")
const bcrypt = require("bcrypt")


beforeEach( async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
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



describe("test id (4.9)", () => {
    test("id property exists", async () => {
       const response =  await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
        expect(response.body[0].id).toBeDefined()
    })
})


describe("HTTP POST(4.10-4.11-4.12)", () => {
    test('blogs are returned as json', async () => {
        const newBlog = {
            title: "Golang",
            author: "john",
            url: "http://golang.org",
            likes: 23,
            userId: "7675"
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        const authors = blogsAtEnd.map(b => b.author)
        expect(authors).toContain("john")
    })

    test("(4.11) blog.likes default to 0 value", async () => {

        const newBlog = {
            title: "Golang",
            author: "jonas",
            url: "http://golang.org",
            userId: "ytrt54"
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const blog = blogsAtEnd.filter(b => b.author === "jonas")
        console.log(blog)
        expect(blog[0].likes).toBe(0)
    })

    test("(4.12) return HTTP 400 ERROR if title and url is missing!", async () => {

        const newBlog = {
            author: "jonas",
            userId: "68676",
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
})

describe("HTTP DELETE (4.13)", () => {
    test("delete test", async () => {
        const blogsAtEnd = await helper.blogsInDb()
        const ids = blogsAtEnd.map(blog => blog.id)
        console.log(ids)
        await api
            .delete(`/api/blogs/${ids[0]}`)
            .expect(204)
        const newblogsAtEnd = await helper.blogsInDb()
        const newids = newblogsAtEnd.map(blog => blog.id)
        expect(newids).not.toContain(ids[0])
    })
})


describe("HTTP PUT (4.14)", () => {
    test("put test", async () => {
        const blogsAtEnd = await helper.blogsInDb()
        const ids = blogsAtEnd.map(blog => blog.id)
        const newBlog = {
            ...blogsAtEnd[0],
            likes: blogsAtEnd[0].likes + 20
        }
        const response = await api
            .put(`/api/blogs/${ids[0]}`)
            .send(newBlog)
            .expect('Content-Type', /application\/json/)
        const updatedBlog = response.body
        expect(updatedBlog.likes).toEqual(newBlog.likes)
    })
})

describe("when there is initially one user in db", () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash("sekret", 10)
        const user = new User({ username: "root", passwordHash })

        await user.save()
    })


    test("creation succeeds with a fresh usrname", async () => {
        const usersAtStart = await helper.usersInDb()
        
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)


        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)

    })




    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

})

describe("HTTP POST test username or password missing (4.16)", () => {
    
    test('username missing', async () => {
        const newUser = {
            name: 'Superuser',
            password: "hello",
        }


        const result =  await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    

        expect(result.body.error).toEqual("Username or password missing!")
    })

    test("password missing", async () => {
        const newUser = {
            username: "mr hello",
            name: 'Superuser',
        }
        const result =  await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    

        expect(result.body.error).toEqual("Username or password missing!")
    })

})





afterAll(()=> {
    mongoose.connection.close()
})