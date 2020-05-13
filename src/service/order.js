import request from '@/utils/request/index.js'
import config from '@/config/env.js'


export default {
    // 获取订单列表
    async getOrderList(filter) {
        const url = `${config.server.url}/order`;
        return await request('get', url, filter)
    },

    // 获取订单详情
    async getOrderDetails(orderNo){
        const url = `${config.server.url}/order/${orderNo}`;
        return await request('get', url)
    }
}
