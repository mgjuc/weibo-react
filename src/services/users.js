import axios from "axios";

const baseUrl = '/api/users' //发布 'http://localhost:3001/api/users'//本地测试

const Registe = async (user) => {
    const resp = await axios.post(baseUrl, user)
    return resp

}


export default {Registe}