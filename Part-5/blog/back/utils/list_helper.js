const dummy = (blogs) => {
    return 1
  }
const totalLikes = (blogs)  => {
    return blogs.reduce((likes, blog) => likes + blog.likes, 0 )
}
const favoriteBlog = (blogs) => {
    return blogs.reduce((resultBlog, blog) => {
        if (resultBlog == undefined || resultBlog.likes < blog.likes) return blog
        return resultBlog
    })
}
const mostBlogs = (blogs) => {
    const blogsByAuthors = {}
    blogs.forEach(blog => {
        if (Object.keys(blogsByAuthors).indexOf(blog.author) === -1) blogsByAuthors[blog.author] = 0
        blogsByAuthors[blog.author] += 1
    })
    
    return Object.keys(blogsByAuthors).reduce((topAuthor, author) => {
        if (topAuthor.author === undefined || blogsByAuthors[author] > topAuthor.blogs) return { author: author, blogs: blogsByAuthors[author]}
        else return topAuthor
    }, {})
}
const mostLikes = (blogs) => {
    const likesForAuthors = {}
    blogs.forEach(blog => {
        if (Object.keys(likesForAuthors).indexOf(blog.author) === -1) likesForAuthors[blog.author] = 0
        likesForAuthors[blog.author] += blog.likes
    })
    return Object.keys(likesForAuthors).reduce((topAuthor, author) => {
        if (topAuthor.author === undefined || likesForAuthors[author] > topAuthor.likes) return { author: author, likes: likesForAuthors[author]}
        else return topAuthor
    }, {})
}

module.exports = {
dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}