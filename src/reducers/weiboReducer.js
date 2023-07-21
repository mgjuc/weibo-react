
const weiboReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL':
            return action.data
        case 'ADD_ARTICLE':
            return state.concat(action.article).sort((b, a) => new Date(a.time) - new Date(b.time))
        case 'DELETE_ONE':
            return state.filter(p => p.id != action.id)
        default:
            return state
    }
}


const addArticleCreater = (article) => {
    return {
        type: 'ADD_ARTICLE',
        article
    }
}

const setArticles = (articles) => {
    return {
        type: 'SET_ALL',
        data: articles
    }
}

const deleteArticlebyId = (articleId) => {
    return {
        type: 'DELETE_ONE',
        id: articleId
    }
}

export default weiboReducer
export { addArticleCreater, setArticles, deleteArticlebyId }