import request from '@/utils/request/index.js'
import config from '@/config/env.js'


export default {
    // 获取客户列表
    async getCustomerList(filter) {
        const url = `${config.server.url}/customer/customer`;
        return await request('get', url, filter)
    },

    // 获取客户来源列表
    async getCustomerSourceList(filter) {
        const url = `${config.server.url}/customer/source`;
        return await request('get', url, filter)
    }
}
