import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './index.scss'
import { useEffect } from 'react'
import { setAlarm } from '../../reducers/alarmReducer'

export const NavigatBar = () => {
    const dispatch = useDispatch()
    const alarm = useSelector(state => state.alarm)
    const user = useSelector(state => state.user)
    
    useEffect(() => {
        if (alarm) {
            console.log(alarm)
            setTimeout(() => dispatch(setAlarm(null)), 5000)
        }
    }, [alarm])

    return (
        <>
            <div className='NavigatBar'>
                <ul className='NavigatBar__Ul'>
                    <li><Link className='NavigatBar__Link' to="/">首页</Link></li>
                    <li><Link className='NavigatBar__Link' to="login">{user ? user : 'Login'}</Link></li>
                    <li><a className='NavigatBar__Link' href="https://v3.cn.vuejs.org/guide/installation.html">Vue文档</a></li>
                    <li><a className='NavigatBar__Link' href="https://reactjs.org/docs/hooks-reference.html">React文档</a></li>
                </ul>
            </div>
            {alarm && <div className='Alarm'>{alarm}</div>}
            {/* <Outlet /> */}
        </>


    )
}
