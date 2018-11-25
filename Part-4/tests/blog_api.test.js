const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

test.skip('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

describe('HTTP POST tests', () => {
    test.skip('blogs are saved', async () => {
        await api
            .post('/api/blogs')
            .send(blog)
            .set('Accept', 'application/json')
            .expect(201)
            .expect('Content-Type', /application\/json/)
            .expect(res => { 
                const responseBlog = {}
                Object.keys(blog).forEach(key => responseBlog[key] = res.body[key])
                expect(responseBlog).toEqual(blog) 
            })
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
        Object.keys(blog).forEach(key => { if (key != 'title' && key != 'url') blogWithNoTitleAndUrl[key] = blog[key] }) 
        await api
            .post('/api/blogs')
            .send(blogWithNoTitleAndUrl)
            .expect(400)
    })
})
afterAll(() => {
  server.close()
})

const blog = {
    "title": "Test post",
    "author": "Test author",
    "url": "Test url",
    "likes": 7
}