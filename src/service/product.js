import request from '@/utils/request/index.js'
import config from '@/config/env.js'


export default {
    // 获取产品列表
    async getProductList(filter) {
        const url = `${config.server.url}/goods/product`
        return await request('get', url, filter)
    },
    // 获取单个产品
    async getProductOne(id) {
        const url = `${config.server.url}/goods/product/${id}`;
        return await request('get', url)
    },
    // 添加产品
    async addProduct(params) {
        const url = `${config.server.url}/goods/product`;
        return await request('post', url, params)
    },
    // 删除产品
    async delProduct(id) {
        const url = `${config.server.url}/goods/product/${id}`;
        return await request('delete', url)
    },
    // 产品上下架
    async updateProductStatus(id, disable) {
        const url = `${config.server.url}/goods/product/${id}/disable/${disable}`;
        return await request('patch', url)
    },
    // 修改产品
    async updateProduct(id, params) {
        const url = `${config.server.url}/goods/product/${id}`;
        return await request('put', url, params)
    }
}
