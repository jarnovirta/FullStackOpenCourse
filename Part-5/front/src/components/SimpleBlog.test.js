import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'
import SimpleBlog from './SimpleBlog';

describe.only('<SimpleBlog />', () => {
    const blog = {
        title: "test title",
        author: "some author",
        likes: 4
    }
    const mockClickHandler = jest.fn()
    const blogComponent = shallow(<SimpleBlog
        blog={blog}
        onClick={mockClickHandler}
        />)
    const titleDiv = blogComponent.find('.title')
    const contentDiv = blogComponent.find('.content')
    it('renders blog, author, likes', () => {
        expect(titleDiv.text()).toContain(blog.title)
        expect(titleDiv.text()).toContain(blog.author)
        expect(contentDiv.text()).toContain(blog.likes)
    })
    it('registers like clicks', () => {
        const likeButton = contentDiv.find('button')
        likeButton.simulate('click')
        likeButton.simulate('click')
        expect(mockClickHandler.mock.calls.length).toBe(2)
    })
})