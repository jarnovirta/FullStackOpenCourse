import blogService from '../services/blogs'

const reducer = (blogs = [], action) => {
    if (action.type === 'CREATE_BLOG') {
        return [...blogs, action.blog]
    }
    if (action.type === 'INITIALIZE_BLOGS') {
        return action.blogs
    }
    if (action.type === 'LIKE_BLOG') {
        const old = blogs.filter(a => a.id !== action.id)
        const liked = blogs.find(a => a.id === action.id)
        return [...old, {...liked, likes: action.likes }]
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
            type: 'LIKE_BLOG',
            id: blog.id,
            likes: blog.likes
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