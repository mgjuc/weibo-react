import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {combineReducers, createStore} from 'redux'
import weiboReducer from './reducers/weiboReducer'
import './index.css';
import App from './App';
import alarmReducer from './reducers/alarmReducer';
import userReducer from './reducers/userReducer'


const reducer = combineReducers({
  weibo: weiboReducer,
  alarm: alarmReducer,
  user: userReducer
})

const store = createStore(reducer)


ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);