import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'
import SimpleBlog from './SimpleBlog';

describe.only('<SimpleBlog />', () => {
    it('renders blog, author, likes', () => {
        const blog = {
            title: "test title",
            author: "some author",
            likes: 4
        }
        const onClickHandler = jest.fn()
        const blogComponent = shallow(<SimpleBlog
            blog={blog}
            onClick={jest}
            />)
        const titleDiv = blogComponent.find('.title')
        const contentDiv = blogComponent.find('.content')
        expect(titleDiv.text()).toContain(blog.title)
        expect(titleDiv.text()).toContain(blog.author)
        expect(contentDiv.text()).toContain(blog.likes)
    })

})