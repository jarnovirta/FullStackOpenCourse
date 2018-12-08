var router = require('express').Router()
var Blog = require('./../models/blog')
var User = require('./../models/user')
const jwt = require('jsonwebtoken')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs.map(Blog.format))
})

router.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id).populate('user')
    blog.user = User.format(blog.user)
    response.json(Blog.format(blog))
  }
  catch (e) {
    console.log(e)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

router.post('/', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    let blog = new Blog(request.body)
    if (!blog.likes) blog.likes = 0
    if (!blog.title || blog.title.length === 0 || !blog.url || blog.url.length === 0) {
      return response.status(400).send({ error: 'Title and url must not be empty' })
    }
    const user = await User.findById(decodedToken.id)
    blog.user = user._id
    blog = await blog.save()
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    response.status(201).json(Blog.format(blog))
  }
  catch (e) {
    if (e.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: e.message })
    } else {
    console.log(e)
    response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

router.delete('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (decodedToken.id !== blog.user.toString()) {
      return response.status(401).json({ error: 'not authorized to delete another user\'s blog.' })
    }
    await blog.delete()
    response.sendStatus(204)
  }
  catch (e) {
    console.log(e)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

router.put('/:id', async (request, response) => {
  try {
    const body = request.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(Blog.format(updatedBlog))
  }
  catch (e) {
    console.log(e)
    response.status(500).json({ error: 'something went wrong...' })
  }
})
module.exports = router