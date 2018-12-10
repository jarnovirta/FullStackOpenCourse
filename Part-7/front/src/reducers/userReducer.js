import blogService from './../services/blogs'

const reducer = (user = null, action) => {
    if (action.type === 'LOGIN') {
        return action.user
    }
    if (action.type === 'LOGOUT') {
        return null
    }
    return user
}

export const login = (user) => {
    blogService.setToken(user === null ? null : user.token)
    return {
        type: 'LOGIN',
        user: user
    }
}
export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}

export default reducer