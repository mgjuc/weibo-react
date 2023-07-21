import React, { useState, useEffect } from 'react'
import './index.scss'
import headpicUrl from '../../resources/headpic.jpg'
import getDate from '../../utils/date'
import articleApi from '../../services/articles'
import { useDispatch, useSelector } from 'react-redux'
import { addArticleCreater, setArticles, deleteArticlebyId } from '../../reducers/weiboReducer'
import { setAlarm } from '../../reducers/alarmReducer'

const Articles = () => {
    // const [articleList, setarticleList] = useState([])
    const [page, setPage] = useState(0)
    const [inputStatus, setinputStatus] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const dispatch = useDispatch()
    const articleList = useSelector(state => state.weibo)
    const user = useSelector(state => state.user)

    useEffect(() => {
        updateList()
    }, [page])

    //发送
    const handleSend = (e) => {
        if (inputStatus) {
            if (inputValue.length > 0) {
                const newArticle = {
                    content: inputValue,
                    time: new Date().toString(),
                }
                addArticle(newArticle);
            }
        }
        else {
            setInputValue('')
        }
        setinputStatus(!inputStatus)
    }

    //查询
    const updateList = () => {
        articleApi.getAll(page)
            .then(
                data => {
                    console.log('updateList', page, data)
                    dispatch(setArticles(data.sort((b, a) => new Date(a.time) - new Date(b.time))))
                    // setarticleList(data.sort((b, a) => new Date(a.time) - new Date(b.time)))
                },
                response => {
                    Alarm('initList reject' + response)
                }
            )
    }
    //增
    const addArticle = (para) => {
        articleApi.addOne(para)
            .then(data => {
                console.log('addArticle', data)
                //const newlist = [...articleList, data].sort((b, a) => new Date(a.time) - new Date(b.time))
                // setarticleList(newlist)
                dispatch(addArticleCreater(data))
            })
            .catch(error => {
                // console.log(error.response)
                Alarm('addArticle reject ' + (error.response.data.error))
            })
    }
    //删
    const deleteArticle = article => {
        if(user !== article.auther) return
        console.log('delete id', article.id)
        articleApi.deletebyId(article.id)
            .then(resp => {
                if (resp.status === 204) {
                    // updateList()
                    // setarticleList(articleList.filter(p => p.id !== id))    //本地过滤实现删除，没有API请求快束响应
                    dispatch(deleteArticlebyId(article.id))
                }
            },
                reject => {
                    Alarm('delete rejetc:' + reject)
                }).catch(
                    err => {
                        Alarm('catch err:' + err)
                    })
    }


    //Alarm
    const Alarm = msg => {
        dispatch(setAlarm(msg))
    }
    return (
        <div className='Articles'>
            <div className='Articles__creatNew'>
                <h2>记录你的生活吧</h2>
                <button type='submit' onClick={handleSend}>{inputStatus ? '发送' : '新建'}</button>
            </div>
            {inputStatus &&
                <form>
                    <textarea autoFocus={true} required={true}
                        value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                        name='inputText' placeholder="想说些什么..." maxLength="500"
                    />
                </form>
            }
            {articleList.length > 0 ?
                <ul>
                    {articleList.map(p =>
                        <li key={p.id}>
                            <img className='Articles__headpic' src={headpicUrl} alt='头像' />
                            <div className='Articles__container'>
                                <div className='Articles__title'>
                                    <h4>
                                        <a href='#!'>{p.auther}</a>
                                        <span className='Articles__title-time'>{getDate(p.time)}</span>
                                        <a href='#!' className='Articles__title-deleate' onClick={() => deleteArticle(p)}>删除</a>
                                    </h4>
                                </div>
                                {p.content}
                            </div>
                        </li>
                    )}

                </ul>
                : '写点什么吧...'
            }
            {!(articleList.length < 15 && page === 0) &&
                <div className='Articles__nextpage'>
                    <a href='#!' onClick={() => page > 0 ? setPage(page - 1) : null}>{'<前页'}</a>
                    <a href='#!'>第{page}页</a>
                    <a href='#!' onClick={() => articleList.length >= 15 ? setPage(page + 1) : null}>{'后页>'}</a>
                </div>
            }
        </div>
    )
}

export default Articles