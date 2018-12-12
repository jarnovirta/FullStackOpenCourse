import blogService from '../services/blogs'

const reducer = (blogs = [], action) => {
    if (action.type === 'CREATE_BLOG') {
        return [...blogs, action.blog]
    }
    if (action.type === 'INITIALIZE_BLOGS') {
        return action.blogs
    }
    if (action.type === 'UPDATE_BLOG') {
        const old = blogs.filter(a => a.id !== action.id)
        return [...old, action.blog]
    }
    if (action.type === 'REMOVE_BLOG') {
        return blogs.filter(blog => blog.id !== action.id)
    }
    return blogs
}

export const like = (blog) => {
    return async (dispatch) => {
        blog.likes++
        blog = await blogService.update(blog)
        dispatch({
            type: 'UPDATE_BLOG',
            blog: blog
        })
    }
}
export const comment = (blog, comment) => {
    return async (dispatch) => {
        if (blog.comments === undefined) blog.comments = []
        blog.comments.push(comment)
        blog = await blogService.update(blog)
        dispatch({
            type: 'UPDATE_BLOG',
            blog: blog
        })
    }
}

export const initialize = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INITIALIZE_BLOGS',
            blogs: blogs
        })
    }
}

export const create = (blog) => {
    return async (dispatch) => {
        blog = await blogService.create(blog)
        dispatch({
            type: 'CREATE_BLOG',
            blog: blog
        })
    }
}

export const remove = (blog) => {
    return async (dispatch) => {
        await blogService.remove(blog)
        dispatch({
            type: 'REMOVE_BLOG',
            id: blog.id
        })
    }
}

export default reducer