import axios from 'axios'

const baseUrl = '/api/contentlist' //发布 'http://localhost:3001/api/contentlist'//本地测试

let token = null

const setToken = newtoken => {
    token = `bearer ${newtoken}`
}

const getAll = (page) => {
    const request = axios.get(`${baseUrl}/page/${page}`)
    // console.log(request)
    return request.then(request => request.data)
}

const addOne = async newArticle => {
    console.log(token)
    const config = {
        // Headers: {Authorization: token}
        headers: { Authorization: token }   //大小写！！！
    }
    console.log('config',config)
    const response = await axios.post(baseUrl, newArticle, config)
    return response.data
}

const deletebyId = async deleteId => {
    const config = {
        // Headers: {Authorization: token}
        headers: { Authorization: token }   //大小写！！！
    }
    const response = await axios.delete(`${baseUrl}/${deleteId}`, config)
    return response
}

export default { getAll, addOne, deletebyId, setToken }