import blogService from '../services/blogs'
const reducer = (blogs = [], action) => {
    if (action.type === 'CREATE') {
        return [...blogs, action.blog]
    }
    if (action.type === 'INITIALIZE') {
        return action.blogs
    }
    if (action.type === 'LIKE') {
        const old = blogs.filter(a => a.id !== action.id)
        const liked = blogs.find(a => a.id === action.id)
        return [...old, {...liked, likes: action.likes }]
    }
    if (action.type === 'REMOVE') {
        return blogs.filter(blog => blog.id !== action.id)
    }
    return blogs
}

export const like = (blog) => {
    return async (dispatch) => {
        blog.likes++
        blog = await blogService.update(blog)
        dispatch({
            type: 'LIKE',
            id: blog.id,
            likes: blog.likes
        })
    }
}

export const initialize = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INITIALIZE',
            blogs: blogs
        })
    }
}

export const create = (blog) => {
    return async (dispatch) => {
        blog = await blogService.create(blog)
        dispatch({
            type: 'CREATE',
            blog: blog
        })
    }
}

export const remove = (blog) => {
    return async (dispatch) => {
        await blogService.remove(blog)
        dispatch({
            type: 'REMOVE',
            id: blog.id
        })
    }
}

export default reducer