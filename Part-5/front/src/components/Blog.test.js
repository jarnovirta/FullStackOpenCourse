import React from 'react'
import { mount } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
    let blog
    let mockLikeHandler
    let mockDeleteHandler
    let blogComponent
    let detailComponent
    let clickableTitle
    beforeAll(() => {
        blog = {
            title: "test title",
            author: "some author",
            likes: 4
        }
        mockLikeHandler = jest.fn()
        mockDeleteHandler = jest.fn()
        blogComponent = mount(<Blog
            blog={blog}
            likeHandler={mockLikeHandler}
            deleteHandler={mockDeleteHandler}
            isByCurrentUser={true}
            />)
        detailComponent = blogComponent.find('BlogDetail')
        clickableTitle = blogComponent.find('.clickableTitle')
    })

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