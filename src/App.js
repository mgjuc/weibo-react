import './App.css';
import { NavigatBar } from './components/Navigatbar';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Articles from './components/Articles';
import { useEffect } from 'react';
import Login from './components/Login';
import Footer from './components/Footer';
import { useDispatch } from 'react-redux';
import { loginCreate } from './reducers/userReducer';

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        console.log('app rended')
        const localdata = window.localStorage.getItem('loginUser')
        if (localdata) {
            const logininfo = JSON.parse(localdata)
            // setloginUser(logininfo.username)
            dispatch(loginCreate(logininfo))
        }
    }, [])  //第二个参数指点定Effect运行频率，空数据=》保证只在加载完成后执行，不然会一直执行


    return (
        <div className="App">
            <Router>
                <NavigatBar />
                <Routes>
                    {/* <Route path='/' element={<NavigatBar Msg={AlarmMsg} />} > 用不着二级路由*/}
                    <Route index element={<Articles />} />
                    <Route path='login' element={<Login />} />
                    <Route path='/:pathValue' element="pathvalue"></Route>
                    {/* </Route> */}
                </Routes>
                <Footer />
            </Router>
            {/* {<TextInputWithFocusButton/>} */}
        </div>

    );
}

export default App;
