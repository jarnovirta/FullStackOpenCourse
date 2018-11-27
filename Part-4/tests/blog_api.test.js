const supertest = require('supertest')
const { app, server } = require('../index')
const testsHelper = require('./tests_helper')
const api = supertest(app)
const Blog = require('./../models/blog')

beforeAll(async () => {
    await Blog.remove({})
    let initialBlog = new Blog(testsHelper.testBlogs[0])
    await initialBlog.save()

    initialBlog = new Blog(testsHelper.testBlogs[1])
    await initialBlog.save()
})

describe('Get existing blogs', () => {
    test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
})

describe('Adding a new post', () => {
    const blog = testsHelper.testBlogs[2]
    test('blogs are saved', async () => {
        const blogsInDbBefore = await testsHelper.blogsInDb()

        await api
            .post('/api/blogs')
            .send(blog)
            .set('Accept', 'application/json')
            .expect(201)
            .expect('Content-Type', /application\/json/)
            .expect(res => {
                const responseBlog = {}
                Object.keys(blog).forEach(key => responseBlog[key] = res.body[key])
                expect(blog).toEqual(blog)
            })
        const blogsInDbAfter = await testsHelper.blogsInDb()
        expect(blogsInDbAfter.length).toBe(blogsInDbBefore.length + 1)
    })
    test('if likes count is undefined it is set to zero', async () => {
        const blogWithNoLikes = {}
        Object.keys(blog).forEach(key => { if (key != 'likes') blogWithNoLikes[key] = blog[key] })
        await api
            .post('/api/blogs')
            .send(blogWithNoLikes)
            .set('Accept', 'application/json')
            .expect(201)
            .expect(res => {
                expect(res.body.likes).toBe(0)
            })
    })
    test('HTTP POST with no blog title or url results in 400 Bad request', async () => {
        const blogWithNoTitleAndUrl = {}
        Object.keys(blog).forEach(key => {
            if (key != 'title' && key != 'url') blogWithNoTitleAndUrl[key] = blog[key]
        })
        await api
            .post('/api/blogs')
            .send(blogWithNoTitleAndUrl)
            .expect(400)
    })
})
test('deleting a post', async () => {
    const blogs = await testsHelper.blogsInDb()
    const id = blogs[0].id
    await api
        .delete(`/api/blogs/${id}`)
        .expect(204)
    const deletedBlog = await Blog.findById(id)
    expect(deletedBlog).toBeNull()
})
test('updating a post', async () => {
    const blogs = await testsHelper.blogsInDb()
    const blog = blogs[0]
    const newAuthor = 'Pamela Anderson'
    blog.author = newAuthor
    await api
        .put(`/api/blogs/${blog.id}`)
        .send(blog)
        .expect(200)
    await api
        .get(`/api/blogs/${blog.id}`)
        .expect(res => {
            expect(res.body.author).toBe(newAuthor)
        })
})
afterAll(() => {
  server.close()
})