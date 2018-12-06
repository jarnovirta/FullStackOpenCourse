import React from 'react'
import { mount } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
    const blog = {
        title: "test title",
        author: "some author",
        likes: 4
    }
    const mockLikeHandler = jest.fn()
    const mockDeleteHandler = jest.fn()
    const blogComponent = mount(<Blog
        blog={blog}
        likeHandler={mockLikeHandler}
        deleteHandler={mockDeleteHandler}
        isByCurrentUser={true}
        />)
    const detailComponent = blogComponent.find('BlogDetail')
    const clickableTitle = blogComponent.find('.clickableTitle')

    it('title and author are shown', () => {
        expect(clickableTitle.text()).toContain(blog.title)
        expect(clickableTitle.text()).toContain(blog.author)
    })
    it('detail is not shown only after click', () => {
        let detailDiv = blogComponent.find('.detail')
        expect(detailDiv.getElement().props.style).toEqual({ display: 'none' })

        clickableTitle.simulate('click')

        detailDiv = blogComponent.find('.detail')
        expect(detailDiv.getElement().props.style).toEqual({ display: '' })

        const likesElement = detailComponent.find(".likes")
        expect(likesElement.text()).toContain(blog.likes)
    })
})