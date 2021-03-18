import React, { useState } from 'react'
const Blog = ({blog, updateLikes}) =>  {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: "solid",
      borderWidth: 1,
      marginBotton: 5
    }
    const [viewDetails, setViewDetails] = useState(false)

    const showDetails = {display: viewDetails ? "" : "none"}
    const hideDetails = {display: viewDetails ? "none" : ""}

    const detailsHandler = async (event) => {
      // console.log(event.target.name)  
      setViewDetails(!viewDetails)
    }

    const likeHandler = async (event) => {
      //console.log(event.target.name)
      updateLikes({...blog, likes: blog.likes+1})
    }

    return (
      <div style={blogStyle}>
        <div style={showDetails}>
          <p>{blog.title}  <button onClick={detailsHandler} name={blog.id}>hide</button>
            <br/> {blog.url} 
            <br/>{blog.likes} <button onClick={likeHandler} name={blog.id}>like</button>
            <br/>{blog.author}  
          </p>  
        </div> 
        <div style={hideDetails}>
          {blog.title}{"  "}
          <button onClick={detailsHandler} name={blog.id}>view</button>
        </div>  
      </div>
    )}

export default Blog