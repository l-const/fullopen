import React from "react"

const BlogForm = ({
    handleBlogCreation,
    handleTitle,
    handleAuthor,
    handleUrl,
    title,
    author,
    url
    }) => {
    return (
        <>
         <h2>create new</h2>
            <form onSubmit={handleBlogCreation}>
              <div>title:
                <input 
                type ="text"
                name = "title"
                value = {title}
                onChange = {handleTitle}
                />
              </div>
              <div>author:
                <input 
                type = "text"
                name = "author"
                value = {author}
                onChange = {handleAuthor}
                />
              </div>
              <div>url:
                <input 
                type = "text"
                name = "url"
                value = {url}
                onChange = {handleUrl}
                />
              </div>
              <button type="submit">create</button>
            </form>
        </>
    )
}


export default BlogForm
