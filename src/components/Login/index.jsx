import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userApi from '../../services/users'
import loginApi from '../../services/login'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import {loginCreate, logOutCreate} from '../../reducers/userReducer'

const Login = () => {
    const navigate = useNavigate()
    // const [loginUser, setloginUser] = useState(null)
    const loginUser = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [pwd, setPwd] = useState('')

     //＝＝＝＝＝＝「登录」＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    const handleSubmit = (event) => {
        console.log('on submit', event.target[0].value, event.target[1].value)
        const user = {
            'username': event.target[0].value,
            'password': event.target[1].value,
        }
        if (user.username && user.password) {
            loginApi.Login(user)    //login定义的异步函数
            .then(p => {
                console.log('login sucess', p.data)
                // alert('登录成功')
                // console.log('login user', user)
                // setloginUser(user.username)
                dispatch(loginCreate({
                    username: user.username,
                    token: p.data.token
                }))
            })
            .catch(error => {
                console.log('error' + JSON.stringify(error.response.data)) //报错时，response封装在error里
            })   //最佳实践：在catch里处理reject
            // handleLogin(user)
            // .then(() => {
                

            // })
            // setUsername('')
            // setPwd('')
            navigate('/', { replace: false })
        }
        event.preventDefault()
    }

    //＝＝＝＝＝＝「注册」＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    const handleClick = (event) => {
        event.preventDefault()
        const user = {
            username: username,
            password: pwd
        }
        userApi.Registe(user)
            .then(resp => {
                console.log('Registe success',resp)
                dispatch(loginCreate(resp.data))
                navigate('/')
            })
            .catch(error => {
                console.log('registe filed', error)
            })
    }

    //＝＝＝＝＝＝「退出」＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    const logout = () => {
        
        dispatch(logOutCreate())
    }

    return (
        loginUser === undefined || loginUser === null
            ?
            < div className='Login' >
                <h2>登录</h2>
                <form onSubmit={handleSubmit}>
                    <label>用户名：
                        <input type="text" value={username} required onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>密码：
                        <input type="password" value={pwd} required onChange={(e) => setPwd(e.target.value)} />
                    </label>
                    <input type="submit" value="login" />
                    <button onClick={handleClick}>注册</button>
                </form>
            </div >
            :
            < div className='Login' >
                <h2>你好，{loginUser}
                    <span>
                        <a href='#' onClick={logout}> [退出]</a>
                    </span>
                </h2>
            </div>
    )

}

export default Login
