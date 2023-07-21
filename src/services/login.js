import axios from "axios";

const baseUrl = '/api/login' //发布 //'http://localhost:3001/api/login'//本地测试

const Login = async (user) => {
    // try{
    console.log('api login', user)
    const resp = await axios.post(baseUrl, user)
    return resp
    // }
    // catch(error){
    //     for(let v in error)
    //     {
    //         console.log(v,error[v])
    //     }
    //     // console.log('error.error',error.error,'error.resp',error.response)
    //     return error
    // }

}

export default { Login }