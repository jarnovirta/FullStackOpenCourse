const Blog = require('./../models/blog')

const testBlogs = [{
        "title": "Test post",
        "author": "Test author",
        "url": "Test url",
        "likes": 4
    }, 
    {
        "title": "Test post2",
        "author": "Test author2",
        "url": "Test url2",
        "likes": 8
    },
    {
        "title": "Test post3",
        "author": "Test author3",
        "url": "Test url3",
        "likes": 4
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(Blog.format)
}


module.exports = { testBlogs, blogsInDb }