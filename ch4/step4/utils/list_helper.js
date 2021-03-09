const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(bl => bl.likes).reduce((a,b) => a+b, 0)
}

module.exports = {
    dummy,
    totalLikes
}