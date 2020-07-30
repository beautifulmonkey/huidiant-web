import request from '@/utils/request/index.js'
import config from '@/config/env.js'


export default {

    // 修改密码
    async changePassword(params) {
        const url = `${config.server.url}/auth/password`;
        return await request('patch', url, params)
    },

    // 发送验证码
    async sendVerificationCode(tel, mode) {
        const url = `${config.server.url}/sms/verification_code/send`;
        return await request('post', url, {tel: tel, mode: mode})
    },

}
