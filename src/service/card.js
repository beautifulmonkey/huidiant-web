import request from '@/utils/request/index.js'
import config from '@/config/env.js'


export default {
    // 获取卡项列表
    async getCardList(filter) {
        const url = `${config.server.url}/goods/card`;
        return await request('get', url, filter)
    },
    // 卡项上下架
    async updateCardStatus(id, disable) {
        const url = `${config.server.url}/goods/card/${id}/disable/${disable}`;
        return await request('patch', url)
    },
    // 充值卡权益-获取树结构
    async getGoodsTree() {
        const url = `${config.server.url}/goods/tree`;
        return await request('get', url)
    },

    // 添加充值卡
    async addPrepaidCard(params) {
        const url = `${config.server.url}/goods/card`;
        return await request('post', url, params)
    },
}
