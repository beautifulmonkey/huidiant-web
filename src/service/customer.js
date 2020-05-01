import request from '@/utils/request/index.js'
import config from '@/config/env.js'


export default {
    // 获取客户列表
    async getCustomerList(filter) {
        const url = `${config.server.url}/customer/customer`;
        return await request('get', url, filter)
    },

    // 获取客户详情
    async getCustomerDetails(id) {
        const url = `${config.server.url}/customer/customer/${id}/details`;
        return await request('get', url)
    },

    // 获取单个客户
    async getCustomerOne(id) {
        const url = `${config.server.url}/customer/customer/${id}`;
        return await request('get', url)
    },

    // 获取客户来源列表
    async getCustomerSourceList() {
        const url = `${config.server.url}/customer/source`;
        return await request('get', url)
    },

    // 修改客户信息
    async updateCustomer(id, params) {
        const url = `${config.server.url}/customer/customer/${id}`;
        return await request('put', url, params)
    },

    // 添加客户
    async addCustomer(params) {
        const url = `${config.server.url}/customer/customer`;
        return await request('post', url, params)
    },

    // 删除客户
    async delCustomer(id) {
        const url = `${config.server.url}/customer/customer/${id}`;
        return await request('delete', url)
    }
}
