const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Rust',
    author: 'ntinos',
    url: 'http://youtube.com',
    likes: 8
  },
  {
    title: 'Python',
    author: 'konstantinos',
    url: 'http://instagram.com',
    likes: 12
  }
]


const nonExistingId = async () => {
  const blog = new Blog(
    { title: 'remove', author: 'remover', url: 'http://', likes: 0 }
  )
  await blog.save()
  await blog.remove()

  return blog._id._toString()
}


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}
