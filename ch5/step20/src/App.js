import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notifMessage, setNotifMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)


  const blogFormRef = useRef()

  useEffect(() => {
    if(user !== null) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [user])

  useEffect(() => {
    const loggedBlogappUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedBlogappUser) {
      const user = JSON.parse(loggedBlogappUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const handleLogin = async (event) => {
    event.preventDefault()
    try
    {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setNotifMessage('Login successful!')
      setMessageType('good')
      setTimeout(() => {setNotifMessage(null);setMessageType(null)}, 2000)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setNotifMessage('Wrong credentials')
      setMessageType('bad')
      setTimeout(() => {setNotifMessage(null);setMessageType(null)}, 2000)
    }
    console.log('form submitted')
  }


  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')

  }

  const handleBlogCreation = async (blogObject) => {
    try{
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()
      setNotifMessage(` a new blog ${newBlog.title} by ${newBlog.author} added`)
      setMessageType('good')
      setTimeout(() => {
        setMessageType(null); setNotifMessage(null)
      }, 1000)
    } catch (exception) {
      setNotifMessage('Error in blog creation')
      setMessageType('bad')
      setTimeout(() => {setNotifMessage(null);setMessageType(null)}, 1000)
    }

  }

  const handleLikesUpdate = async (blogObject) => {
    try {
      const newBlog = await blogService.modify(blogObject)
      //console.log(newBlog)
      setBlogs(blogs.map( b => b.id === newBlog.id ? newBlog : b))
      setNotifMessage(` a new blog ${newBlog.title} by ${newBlog.author} now has ${newBlog.likes} likes`)
      setMessageType('good')
      setTimeout(() => {setMessageType(null); setNotifMessage(null)}, 1000)

    } catch (exception) {
      setNotifMessage('Error in update likes')
      setMessageType('bad')
      setTimeout(() => {setNotifMessage(null);setMessageType(null)}, 1000)
    }
  }

  const handleBlogRemove = async (blogObject) => {
    try {
      const response = await blogService.remove(blogObject)
      console.log(response.body)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      setNotifMessage(` a  blog deleted ${blogObject.title}`)
      setMessageType('good')
      setTimeout(() => {setMessageType(null); setNotifMessage(null)}, 1000)

    } catch (exception) {
      setNotifMessage(`Error in deleting blog! ${exception.message}`)
      setMessageType('bad')
      setTimeout(() => {setNotifMessage(null);setMessageType(null)}, 1000)
    }
  }


  const loginForm = () =>
    (
      <>
        <h2>log in to application</h2>
        <form id="login-form" onSubmit={handleLogin}>
          <div>username:
            <input
              id = "username"
              type = "text"
              value = {username}
              name = "Username"
              onChange = {({ target }) => setUsername(target.value)}
            />
          </div>
          <div>password:
            <input
              id = "password"
              type = "password"
              value = {password}
              name= "Password"
              onChange = {({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </>
    )


  const blogForm = () => {

    return (
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          BlogCreation={handleBlogCreation}
        />
      </Togglable>

    )}



  return (
    <div>
      <Notification message={notifMessage} type={messageType}/>
      {
        user === null ?
          loginForm() :
          <div>
            <h2>blogs</h2>
            <p>{user.name} is logged-in <button type="submit" onClick={handleLogout}>logout</button></p>
            {blogForm()}

            {blogs.map(b => b).sort((a,b) => b.likes - a.likes).map(blog =>
              <Blog key={blog.id} blog={blog} updateLikes={handleLikesUpdate}
                removeBlog={handleBlogRemove}
              />)
            }
          </div>
      }
    </div>
  )
}

export default App