import blogService from './../services/blogs'
import userService from './../services/users'

const reducer = (state = {
        users: [],
        user: {},
        loggedInUser: null
    }, action) => {
    if (action.type === 'LOGIN') {
        return {
            ...state,
            loggedInUser: action.user }
    }
    if (action.type === 'LOGOUT') {
        return { ...state,
            loggedInUser: null
        }
    }
    if (action.type === 'INITIALIZE_USERS') {
        return {
            ...state,
            users: action.users
        }
    }
    return state
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
export const initialize = () => {
    return async (dispatch) => {
        const users = await userService.getAll()
        dispatch({
            type: 'INITIALIZE_USERS',
            users: users
        })
    }
}

export default reducer