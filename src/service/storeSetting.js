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
}
