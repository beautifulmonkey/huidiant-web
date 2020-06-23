import request from '@/utils/request/index.js'
import config from '@/config/env.js'


export default {
    // 获取分类列表
    async getCategoryList(type) {
        const url = `${config.server.url}/goods/category`;
        return await request('get', url, {"type": type})
    },
    // 获取标签列表
    async getTagList(type) {
        const url = `${config.server.url}/goods/tag`;
        return await request('get', url, {"type": type})
    },

    // 添加标签
    async addTag(form) {
        const url = `${config.server.url}/goods/tag`;
        return await request('post', url, form)
    },

    // 添加分类
    async addCategory(form) {
        const url = `${config.server.url}/goods/category`;
        return await request('post', url, form)
    },

    // 删除标签
    async delTag(id) {
        const url = `${config.server.url}/goods/tag/${id}`;
        return await request('delete', url)
    },

    // 删除分类
    async delCategory(id) {
        const url = `${config.server.url}/goods/category/${id}`;
        return await request('delete', url)
    },

    // 修改标签
    async updateTag(id, name) {
        const url = `${config.server.url}/goods/tag/${id}`;
        return await request('patch', url, {'name': name})
    },

    // 修改分类
    async updateCategory(id, name) {
        const url = `${config.server.url}/goods/category/${id}`;
        return await request('patch', url, {'name': name})
    },
}
