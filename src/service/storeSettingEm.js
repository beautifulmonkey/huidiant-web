import request from '@/utils/request/index.js'
import config from '@/config/env.js'


export default {
    // 获取员工列表
    async getEMList() {
        const url = `${config.server.url}/setting/employees/em`;
        return await request('get', url)
    },

    // 获取单个员工
    async getEMOne(id) {
        const url = `${config.server.url}/setting/employees/em/${id}`;
        return await request('get', url)
    },

    // 修改员工
    async updateEM(id, params) {
        const url = `${config.server.url}/setting/employees/em/${id}`;
        return await request('put', url, params)
    },

    // 添加员工
    async addEM(params) {
        const url = `${config.server.url}/setting/employees/em`;
        return await request('post', url, params)
    },

    // 删除员工
    async delEM(id) {
        const url = `${config.server.url}/setting/employees/em/${id}`;
        return await request('delete', url)
    },

    // ------------------------------------------

    // 获取职称列表
    async getPTList() {
        const url = `${config.server.url}/setting/employees/pt`;
        return await request('get', url)
    },

    // 添加职称
    async addPT(params) {
        const url = `${config.server.url}/setting/employees/pt`;
        return await request('post', url, params)
    },

    // 修改职称
    async updatePT(id, params) {
        const url = `${config.server.url}/setting/employees/pt/${id}`;
        return await request('put', url, params)
    },

    // 删除职称
    async delPT(id) {
        const url = `${config.server.url}/setting/employees/pt/${id}`;
        return await request('delete', url)
    },
}
