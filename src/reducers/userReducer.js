import articleApi from '../services/articles'

const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.user
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

const loginCreate = loginInfo => {
    window.localStorage.setItem('loginUser', JSON.stringify(loginInfo))
    articleApi.setToken(loginInfo.token)
    return {
        type: 'LOGIN',
        user: loginInfo.username
    }
}

const logOutCreate = () => {
    window.localStorage.removeItem('loginUser')
    articleApi.setToken('')
    return {
        type: 'LOGOUT'
    }
}

export default userReducer
export {loginCreate, logOutCreate}