import request from '@/utils/request/index.js'
import config from '@/config/env.js'


export default {
    // 收款
    async cashierDeal(params) {
        const url = `${config.server.url}/cashier/deal`;
        return await request('post', url, params)
    },
}
