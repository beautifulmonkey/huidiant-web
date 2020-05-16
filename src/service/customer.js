import request from '@/utils/request/index.js'
import config from '@/config/env.js'
import axios from 'axios'


export default {
    // 账号登录
    async userLogin(username, pwd){
        const url = `${config.server.url}/login/access-token`;
        const loginData = {
            username: username,
            password: pwd
        };

        const requestConfig = {
            url,
            method: 'post',
            withCredentials: false,
            data: new URLSearchParams(loginData)
        };
        return await axios(requestConfig)
    },
    // 获取客户列表
    async getCustomerList(filter) {
        const url = `${config.server.url}/customer/customer`;
        return await request('get', url, filter)
    },

    // 获取客户详情
    async getCustomerDetails(id) {
        const url = `${config.server.url}/customer/customer/${id}/details`;
        return await request('get', url)
    },

    // 获取单个客户
    async getCustomerOne(id) {
        const url = `${config.server.url}/customer/customer/${id}`;
        return await request('get', url)
    },

    // 获取客户来源列表
    async getCustomerSourceList() {
        const url = `${config.server.url}/customer/source`;
        return await request('get', url)
    },

    // 修改客户来源
    async updateCustomerSource(id, params) {
        const url = `${config.server.url}/customer/source/${id}`;
        return await request('put', url, params)
    },

    // 添加客户来源
    async addCustomerSource(params) {
        const url = `${config.server.url}/customer/source`;
        return await request('post', url, params)
    },

    // 删除客户来源
    async delCustomerSource(id) {
        const url = `${config.server.url}/customer/source/${id}`;
        return await request('delete', url)
    },

    // 修改客户信息
    async updateCustomer(id, params) {
        const url = `${config.server.url}/customer/customer/${id}`;
        return await request('put', url, params)
    },

    // 添加客户
    async addCustomer(params) {
        const url = `${config.server.url}/customer/customer`;
        return await request('post', url, params)
    },

    // 删除客户
    async delCustomer(id) {
        const url = `${config.server.url}/customer/customer/${id}`;
        return await request('delete', url)
    },

    // 模糊搜索客户
    async SearchCustomer(query) {
        const url = `${config.server.url}/customer/search`;
        return await request('get', url, {query: query})
    },

    // 获取客户次卡次数和赠送服务
    async getCustomerCounting(id) {
        const url = `${config.server.url}/customer/data/counting/${id}`;
        return await request('get', url)
    }
}
