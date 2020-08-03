import request from '@/utils/request/index.js'
import config from '@/config/env.js'


export default {

    // 获取短信模板列表
    async getTempList(filter) {
        const url = `${config.server.url}/sms/temp`;
        return await request('get', url, filter)
    },

    // 申请模板
    async addTemp(data) {
        const url = `${config.server.url}/sms/temp`;
        return await request('post', url, data)
    },

    // 删除模板
    async delTemp(id) {
        const url = `${config.server.url}/sms/temp/${id}`;
        return await request('delete', url)
    }


}
