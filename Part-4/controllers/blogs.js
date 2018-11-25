var router = require('express').Router()
var Blog = require('./../models/blog')

router.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

router.post('/', (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.likes) blog.likes = 0
  if (!blog.title || blog.title.length === 0 || !blog.url || blog.url.length === 0) return response.status(400).send({ error: 'Title and url must not be empty' })
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})
module.exports = router