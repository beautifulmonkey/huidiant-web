import request from '@/utils/request/index.js'
import config from '@/config/env.js'


export default {
    // 获取服务列表
    async getServiceList(filter) {
        const url = `${config.server.url}/goods/service`
        return await request('get', url, filter)
    },
    // 添加服务
    async addService(params) {
        const url = `${config.server.url}/goods/service`;
        return await request('post', url, params)
    }
}
