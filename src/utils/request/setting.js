/*
 * @Author: 石国庆
 * @Desc: 所有axios的拦截器，默认配置都可以写在这里
 * @Date: 2017.11.14
 * */

import config from '@/config/env.js'
debugger
if (config.setting.customHttpHeader) {
  // 这里面没法用import
  // 添加用户id的请求头
  // 两种写法
  require('@/utils/request/interceptor.js')
  // import '@/utils/request/header.js'
}
