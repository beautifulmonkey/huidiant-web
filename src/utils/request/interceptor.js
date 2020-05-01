/*
 * @Author: 石国庆
 * @Desc: axios的请求头，用于添加网关需要的userId和token自定义请求头
 * @Date: 2017.11.14
 * */
import axios from 'axios'
import { Notification } from 'element-ui'
// 创建axios实例
// const service = axios.create({
//   baseURL: process.env.BASE_API, // api的base_url
//   timeout: 5000 // 请求超时时间
// })
const requestInterceptorFunc = function(config) {
  // todo
  config.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEsImNvZGVfbmFtZSI6ImN6engiLCJ0ZWwiOiIxNzYxMDE2MjkxOCIsInNjb3BlcyI6WyJzdHJpbmciXSwiZXhwaXJ5X3RpbWUiOjEuMCwiZXhwIjoxNTg4MzUzNTc0fQ.IannnomZci6b1BDzTN4saJCbTy3O5zghP4EneNwcR6I`
  return config
}
const requestInterceptorError = function(error) {
  return Promise.reject(error)
}

const reponseInterceptorFunc = function(response) {
  return response
}

// 读取相应错误信息
const errorDetail = function(error) {
  if (error && error.response) {
    const status = error.response.status || 0
    let detail = ''
    switch (status) {
      case 400:
        detail = '请求错误(400)!'
        break
      case 401:
        detail = '无效授权, 请重新登录(401)!'
        break
      case 403:
        detail = '禁止访问, 登录授权失效, 请重新登录获取授权(403)!'
        break
      case 404:
        detail = 'Not Found, 请求链接不存在(404)!'
        break
      case 408:
        detail = '数据请求超时, 请检查您的网络并重试(408)!'
        break
      case 409:
        detail = '请求参数有误(409)!'
        break
      case 500:
        detail = 'Internal Server Error, 服务器内部错误, 请联系开发人员(500)!'
        break
      case 502:
        detail = 'Bad Gateway, 服务器端口号错误(502)!'
        break
      case 503:
        detail = '服务器升级中(503)!'
        break
      case 504:
        detail = 'Gateway Timeout(504)!'
        break
      default:
        detail = `未知网络异常, 请求失败(${status})!`
        break
    }
    console.log(error.response)
    const resData = error.response.data
    if (resData) {
      const resDetail = resData.detail
      detail = `${detail}--${resDetail}`
    }
    return { code: status, detail: detail }
  } else {
    return { code: 0, detail: '发生未知错误, 网络请求失败(0)!' }
  }
}

const reponseInterceptorError = function(error) {
  // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  const { code, detail } = errorDetail(error)
  console.error('数据请求报错了 ----> 出错了!', code)

  Notification({
    title: '请求发生错误!',
    message: detail,
    type: 'error'
  })
  return Promise.reject(error)
}

// request拦截器
axios.interceptors.request.use(requestInterceptorFunc, requestInterceptorError)

// respone拦截器
axios.interceptors.response.use(reponseInterceptorFunc, reponseInterceptorError)

// 之前的通用组件的请求是自己封装的，为了兼容通用组件的请求的使用，需要导出去一个方法体让其他引用这个拦截器，历史遗留问题产生的方案
export default {
  requestInterceptorFunc,
  reponseInterceptorFunc
}
