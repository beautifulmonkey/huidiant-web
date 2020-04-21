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
    },
    // 删除服务
    async delService(id) {
        const url = `${config.server.url}/goods/service/${id}`;
        return await request('delete', url)
    },
    // 服务上下架
    async updateServiceStatus(id, disable) {
        const url = `${config.server.url}/goods/service/${id}/disable/${disable}`;
        return await request('patch', url)
    }
}
