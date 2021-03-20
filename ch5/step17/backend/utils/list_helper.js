const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(bl => bl.likes).reduce((a,b) => a+b, 0)
}

const favoriteBlog = (blogs) => {
  const max = Math.max(...blogs.map(blog => blog.likes))
  console.log(max)
  return blogs.find(blog => blog.likes === max)
}

const mostBlogs = (blogs) => {
  const max = Math.max(...blogs.map(blog => blog.likes))
  console.log(max)
  return blogs.find(blog => blog.likes === max)
}


const mostLikes = (blogs) => {
  const max = Math.max(...blogs.map(blog => blog.likes))
  console.log(max)
  return blogs.find(blog => blog.likes === max)
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes

}