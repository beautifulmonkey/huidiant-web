/*
 * 本机开发环境配置
 * */
export default {
  server: {
    url: 'http://127.0.0.1:2918',
    loginUrl: 'http://ucapi.dev1.org/api/v1',
    cmdUrl: 'http://sensorcmdapi.sb2.org/api/v1',
    CLIENT_ID: '52820878-97c3-11e9-abe1-0242ac1e0002',
    CLIENT_SECRET: '5282099a-97c3-11e9-abe1-0242ac1e0002'
  },
  // 用于控制开发阶段和发布阶段的一些调用控制，可以无缝接入
  setting: {
    // 是否引入axios启自定义请求头
    customHttpHeader: false,
    // Vue的history模式
    historyMode: 'hash'
  },
  layoutSettings: {
    // 系统名称
    title: '运维管理系统',
    // 是否显示右侧的设置面板
    showSettings: false,
    // 是否显示 tagsView
    tagsView: false,
    // 是否固定Header
    fixedHeader: true,
    // 是否显示侧边栏Logo
    sidebarLogo: true
  },
  // 额外的功能菜单是否显示
  externalMenu: false
}
