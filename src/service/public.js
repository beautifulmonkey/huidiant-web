import request from '@/utils/request/index.js'
import config from '@/config/env.js'


export default {

    async customerCenterMe(openId) {
        const url = `${config.server.url}/wechat/customer/${openId}/me`;
        return await request('get', url)
    },

    async customerCenterOrder(openId, filter) {
        const url = `${config.server.url}/wechat/customer/${openId}/order`;
        return await request('get', url, filter)
    },

    async customerCenterCounting(openId) {
        const url = `${config.server.url}/wechat/customer/${openId}/counting`;
        return await request('get', url)
    },

    async customerCenterPrepaidRights(openId, cardId) {
        const url = `${config.server.url}/wechat/customer/${openId}/prepaid_rights`;
        return await request('get', url, {card_id: cardId})
    }

}
