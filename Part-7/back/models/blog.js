const mongoose = require('mongoose')
const User = require('./user')

mongoose.set('useFindAndModify', false)
const BlogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})
BlogSchema.statics.format = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: User.format(blog.user),
    id: blog._id
  }
}
const Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog