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
}
