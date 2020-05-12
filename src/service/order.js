import request from '@/utils/request/index.js'
import config from '@/config/env.js'


export default {
    // 获取订单列表
    async getOrderList(filter) {
        const url = `${config.server.url}/order`;
        return await request('get', url, filter)
    },
}
