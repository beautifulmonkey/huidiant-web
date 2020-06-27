import request from '@/utils/request/index.js'
import config from '@/config/env.js'


export default {

    // 修改密码
    async changePassword(params) {
        const url = `${config.server.url}/auth/password`;
        return await request('patch', url, params)
    },

}
