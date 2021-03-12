const _ = require("lodash")

const blogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            },
            {

                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsr W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
            },
            {

                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 6,
            }
        ]


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
    const group = _.uniqBy(blogs, blogs.author)
    console.log(group)
    //return blogs.find(blog => blog.likes === max)
}

mostBlogs(blogs)


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