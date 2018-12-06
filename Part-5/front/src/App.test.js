import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    let app

    describe('when user is not logged in', () => {
        beforeEach(() => {
            app = mount(<App />)
        })
        it('does not render blogs', () => {
            app.update()
            const blogsDiv = app.find('.blogs')
            expect(blogsDiv.getElement().props.style).toEqual({ display: 'none' })
        })
    })
    describe('when user is logged in', () => {
        beforeEach(() => {
            const user = {
                username: 'tester',
                token: '1231231214',
                name: 'Teuvo Testaaja'
              }
            localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user))
            app = mount(<App />)
        })
        it('all blogs are rendered', () => {
            app.update()
            const blogsDiv = app.find('.blogs')
            expect(blogsDiv.getElement().props.style).toEqual({ display: '' })
            const blogComponents = app.find(Blog)
            expect(blogComponents.length).toBe(blogService.blogs.length)
        })
    })
})