import axios from 'axios'
import qs from 'qs'
import './interceptor'

export default (
  type = 'GET',
  url,
  data = null,
  progress = null,
  credentials = false
) => {
  // 大写
  type = type.toUpperCase()
  const requestConfig = {
    url: url,
    method: type,
    withCredentials: credentials
  }
  switch (type) {
    case 'GET':
      Object.assign(requestConfig, {
        paramsSerializer: function(params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        },
        params: data
      })
      break
    case 'PATCH':
    case 'POST':
      Object.assign(requestConfig, {
        data: data
      })
      break
    case 'PUT':
      Object.assign(requestConfig, {
        data: data
      })
      break
    case 'DELETE':
      Object.assign(requestConfig, {
        data: data
      })
      break
    // 自定义请求类型，为了修改 headers 头
    case 'UPLOAD':
      Object.assign(requestConfig, {
        url: url,
        method: 'POST',
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: false
      })
      if (progress && typeof progress === 'function') {
        Object.assign(requestConfig, {
          onUploadProgress: progressEvent => {
            // 进度
            progress(progressEvent)
          }
        })
      }
      break
    default:
      break
  }
  return axios(requestConfig)
}
