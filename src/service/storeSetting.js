import request from '@/utils/request/index.js'
import config from '@/config/env.js'


export default {
    // 获取入会规则
    async getAutoVipSetting() {
        const url = `${config.server.url}/setting/automaticVip`;
        return await request('get', url)
    },

    // 设置入会规则
    async setAutoVipSetting(params) {
        const url = `${config.server.url}/setting/automaticVip`;
        return await request('post', url, params)
    },

    // 获取门店信息
    async getStoreInfo() {
        const url = `${config.server.url}/setting/store_info`;
        return await request('get', url)
    },

    // 修改门店信息
    async updateStoreInfo(params) {
        const url = `${config.server.url}/setting/store_info`;
        return await request('patch', url, params)
    },

    // 获取支付方式列表
    async getCustomPayList() {
        const url = `${config.server.url}/setting/pay`;
        return await request('get', url)
    },

    // 修改支付方式
    async updateCustomPay(id, name) {
        const url = `${config.server.url}/setting/pay/${id}`;
        return await request('put', url, {'name': name})
    },

    // 添加支付方式
    async addCustomPay(params) {
        const url = `${config.server.url}/setting/pay`;
        return await request('post', url, params)
    },

    // 删除支付方式
    async delCustomPay(id) {
        const url = `${config.server.url}/setting/pay/${id}`;
        return await request('delete', url)
    },
}
