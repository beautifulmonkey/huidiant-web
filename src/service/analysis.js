import request from '@/utils/request/index.js'
import config from '@/config/env.js'


export default {
    // 获取今日汇总数据
    async getAnalysisToday() {
        const url = `${config.server.url}/analysis/today`;
        return await request('get', url)
    },

    // 获取营业汇总数据
    async getAnalysisHistory(params) {
        const url = `${config.server.url}/analysis/history`;
        return await request('get', url, params)
    }
}
