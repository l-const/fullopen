import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, updateLikes, removeBlog }) =>  {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBotton: 5
  }
  const [viewDetails, setViewDetails] = useState(false)

  const showDetails = { display: viewDetails ? '' : 'none' }
  const hideDetails = { display: viewDetails ? 'none' : '' }

  const detailsHandler = async (event) => {
    // console.log(event.target.name)
    setViewDetails(!viewDetails)
  }

  const likeHandler = async (event) => {
    //console.log(event.target.name)
    updateLikes({ ...blog, likes: blog.likes+1 })
  }

  const removeHandler = async (event) => {
    console.log('remove')
    const answer = window.confirm(`Remove ${blog.title} by ${blog.author}`)
    console.log(answer)
    if(answer){
      removeBlog(blog)
    }
  }

  return (
    <div style={blogStyle}>
      <div style={showDetails} className="showD">
        <p>{blog.title}  <button onClick={detailsHandler} name={blog.id}>hide</button>
          <br/> {blog.url}
          <br/>{blog.likes} <button onClick={likeHandler} name={blog.id}>like</button>
          <br/>{blog.author}
          <br/><button onClick={removeHandler} style={{ backgroundColor: 'dodgerblue' }}>remove</button>
        </p>
      </div>
      <div style={hideDetails} className="hideD">
        {blog.title}{'  '}
        <button onClick={detailsHandler} name={blog.id}>view</button>
      </div>
    </div>
  )}


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired

}

export default Blog