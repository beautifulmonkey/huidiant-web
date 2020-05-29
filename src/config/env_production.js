/*
 * 本机开发环境配置
 * */
export default {
    server: {
        url: 'http://47.111.20.15:8899'
    },
    // 用于控制开发阶段和发布阶段的一些调用控制，可以无缝接入
    setting: {
        // 是否引入axios启自定义请求头
        customHttpHeader: false,
        // Vue的history模式
        historyMode: 'hash'
    },
}
