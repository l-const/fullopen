import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"


const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])



  const handleLogin = (event) => {
    event.preventDefault()
    try {
      setUsername("")
      setPassword("")
    } catch (exception) {

    }
    console.log("form submitted")
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
  

  return (
    <div>
    {
      user === null ?
        loginForm() :
      <div>
        <h2>blogs</h2>
        { blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    }
    </div>
  )
}

export default App