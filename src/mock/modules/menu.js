/*
 * 菜单管理模块
 */

// 获取导航菜单树
export function findNavTree() {
  const navTreeData = {
    "code": 200,
    "msg": null,
    "data": [
      {
        "name": "首页",
        "menuIndex": "/cashier",
        "children": [
          {
            "id": "/cashier/sys",
            "name": "系统管理",
            "url": null,
            "icon": "el-icon-setting",
            "children": [{
              "id": "/cashier/sys/user",
              "name": "用户管理",
              "url": "/cashier/sys/user",
              "icon": "el-icon-service",
              "children": []
            }, {
              "id": "/cashier/sys/dept",
              "name": "机构管理",
              "url": "/cashier/sys/dept",
              "icon": "el-icon-news",
              "children": []
            }, {
              "id": "/cashier/sys/role",
              "name": "角色管理",
              "url": "/cashier/sys/role",
              "icon": "el-icon-view",
              "children": []
            }, {
              "id": "/cashier/sys/menu",
              "name": "菜单管理",
              "url": "/cashier/sys/menu",
              "icon": "el-icon-menu",
              "children": []
            }, {
              "id": "/cashier/sys/dict",
              "name": "字典管理",
              "url": "/cashier/sys/dict",
              "icon": "el-icon-edit-outline",
              "children": []
            }, {
              "id": "/cashier/sys/log",
              "name": "系统日志",
              "url": "/cashier/sys/log",
              "icon": "el-icon-info",
              "children": []
            }]
          },
          {
            "id": "/cashier/service",
            "name": "服务治理",
            "url": "",
            "icon": "el-icon-service",
            "children": [{
              "id": "/cashier/service/deal",
              "name": "注册中心",
              "url": "/cashier/service/deal",
              "icon": " el-icon-user",
              "children": []
            }]
          },
  ]
      },
      {
        "name": "商品",
        "menuIndex": "/goods",
        "children": [
          {
            "id": "/goods/service",
            "name": "服务管理",
            "url": "/goods/service",
            "icon": "el-icon-info",
            "children": []
          },
          {
            "id": "/goods/product",
            "name": "产品管理",
            "url": "/goods/product",
            "icon": "el-icon-info",
            "children": []
          }
        ]
      },
      {
        "name": "客户",
        "menuIndex": "/customer"
      },
      {
        "name": "订单",
        "menuIndex": "/orders"
      },
      {
        "name": "数据",
        "menuIndex": "/summary"
      },
      {
        "name": "设置",
        "menuIndex": "/settings"
      }
    ]
  }
  return {
    url: 'menu/findNavTree',
    type: 'get',
    data: navTreeData
  }
}

