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
    if(resp.data.code === 200) {
        return resp.data
    } else {
        //全局处理错误
        message.error(resp.data.errorMsg)
    }
})

// get article list
export const getArticles = (offset = 0, limited = 10) => {
    return service.post('/api/v1/articleList', {
        offset,
        limited
    })
}

// delete article through id
export const deleteArticleById = (id) => {
    return service.post(`/api/v1/articleDelete/${id}`)
}

// get article through id
export const getArticleById = (id) => {
    return service.post(`/api/v1/article/${id}`)
}

// save article
export const saveArticle = (id, data) => {
    return service.post(`/api/v1/articleEdit/${id}`, data)
}
