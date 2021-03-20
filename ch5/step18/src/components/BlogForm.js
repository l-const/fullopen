import React , { useState } from 'react'

const BlogForm = ({ BlogCreation }) => {
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')


  const addBlog = async (event) => {
    event.preventDefault()
    BlogCreation({ title, url, author })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form id="form" onSubmit={addBlog}>
        <div>title:
          <input
            type ="text"
            id="title"
            name = "title"
            value = {title}
            onChange = {({ target }) => setTitle(target.value)}
          />
        </div>
        <div>author:
          <input
            type = "text"
            id="author"
            name = "author"
            value = {author}
            onChange =  {({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>url:
          <input
            type = "text"
            id="url"
            name = "url"
            value = {url}
            onChange = {({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="submit-create-button" type="submit">create</button>
      </form>
    </>
  )
}


export default BlogForm
