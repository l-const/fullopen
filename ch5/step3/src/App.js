import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from "./components/Notification"
import blogService from './services/blogs'
import loginService from "./services/login"


const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notifMessage, setNotifMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")

  useEffect(() => {
    if(user !== null) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )  
    }
  }, [user])

  useEffect(() => {
    const loggedBlogappUser = window.localStorage.getItem("loggedBlogappUser")
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
      const user = await loginService.login({username, password})

      window.localStorage.setItem(
        "loggedBlogappUser", JSON.stringify(user)
      )
      setNotifMessage("Login successful!")
      setMessageType("good")
      setTimeout(() => {setNotifMessage(null);setMessageType(null)}, 500)
      setUsername("")
      setPassword("")
      blogService.setToken(user.token)
      setUser(user)

    } catch (exception) {
      setNotifMessage("Wrong credentials")
      setMessageType("bad")
      setTimeout(() => {setNotifMessage(null);setMessageType(null)}, 1000)
    }
    console.log("form submitted")
  }


  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem("loggedBlogappUser")

  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    try{
      const newBlog = await blogService.create({title, author, url})
      setBlogs(blogs.concat(newBlog))
      setTitle("")
      setAuthor("")
      setUrl("")
      setNotifMessage(` a new blog ${newBlog.title} by ${newBlog.author} added`)
      setMessageType("good")
      setTimeout(() => {
        setMessageType(null); setNotifMessage(null)
      }, 1000)
    } catch (exception) {

    }
    
  }


  const loginForm = () => 
    (
        <>
            <h2>log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>username:
                    <input
                    type = "text"
                    value = {username}
                    name = "Username"
                    onChange = {({target}) => setUsername(target.value)}
                    />
                </div>
                <div>password: 
                    <input
                    type = "password"
                    value = {password}
                    name= "Password"
                    onChange = {({target}) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </>
    )


    const blogForm = () => (
      <>
            <h2>create new</h2>
            <form onSubmit={handleBlogCreation}>
              <div>title:
                <input 
                type ="text"
                name = "title"
                value = {title}
                onChange = {({target}) => setTitle(target.value)}
                />
              </div>
              <div>author:
                <input 
                type = "text"
                name = "author"
                value = {author}
                onChange = {({target}) => setAuthor(target.value)}
                />
              </div>
              <div>url:
                <input 
                type = "text"
                name = "url"
                value = {url}
                onChange = {({target}) => setUrl(target.value)}
                />
              </div>
              <button type="submit">create</button>
            </form>
      </>
    )
    
  

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

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />)
        }
      </div>
    }
    </div>
  )
}

export default App