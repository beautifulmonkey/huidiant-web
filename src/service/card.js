import request from '@/utils/request/index.js'
import config from '@/config/env.js'


export default {
    // 获取卡项列表
    async getCardList(filter) {
        const url = `${config.server.url}/goods/card`;
        return await request('get', url, filter)
    },
    // 获取单个卡
    async getCardOne(id) {
        const url = `${config.server.url}/goods/card/${id}`;
        return await request('get', url)
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

    // 修改充值卡
    async updatePrepaidCard(id, params) {
        const url = `${config.server.url}/goods/card/${id}`;
        return await request('put', url, params)
    },

    // 删除卡
    async delCard(id) {
        const url = `${config.server.url}/goods/card/${id}`;
        return await request('delete', url)
    },
}
