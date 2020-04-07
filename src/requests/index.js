import axios from 'axios'
import { message } from 'antd'

const isDev = process.env.NODE_ENV === 'development' // 什么是env

const service = axios.create({
    baseURL: isDev ? 'http://rap2.taobao.org:38080/app/mock/249663' : ''
})

service.interceptors.request.use((config) => {
    config.data = Object.assign({},config.data,{
        // authToken: window.localStorage.getItem('authToken')
        authToken: 'itisatokenplaceholder'
    })
    return config
})

service.interceptors.response.use((resp)=>{
    console.log(resp)
    if(resp.data.code === 200) {
        return resp.data
    } else {
        //全局处理错误
        message.error(resp.data.errorMsg)
    }
})

export const getArticles = (offset = 0, limited = 10) => {
    return service.post('/api/vi/articleList', {
        offset,
        limited
    })
}