/*
 * 菜单管理模块
 */

// 获取导航菜单树
export function findNavTree() {
  const navTreeData = {
    "code": 200,
    "msg": null,
    "data": [
  //     {
  //       "name": "首页",
  //       "menuIndex": "/cashier",
  //       "children": [
  //         {
  //           "id": "/cashier/sys",
  //           "name": "系统管理",
  //           "url": null,
  //           "icon": "el-icon-setting",
  //           "children": [{
  //             "id": "/cashier/sys/user",
  //             "name": "用户管理",
  //             "url": "/cashier/sys/user",
  //             "icon": "el-icon-service",
  //             "children": []
  //           }, {
  //             "id": "/cashier/sys/dept",
  //             "name": "机构管理",
  //             "url": "/cashier/sys/dept",
  //             "icon": "el-icon-news",
  //             "children": []
  //           }, {
  //             "id": "/cashier/sys/role",
  //             "name": "角色管理",
  //             "url": "/cashier/sys/role",
  //             "icon": "el-icon-view",
  //             "children": []
  //           }, {
  //             "id": "/cashier/sys/menu",
  //             "name": "菜单管理",
  //             "url": "/cashier/sys/menu",
  //             "icon": "el-icon-menu",
  //             "children": []
  //           }, {
  //             "id": "/cashier/sys/dict",
  //             "name": "字典管理",
  //             "url": "/cashier/sys/dict",
  //             "icon": "el-icon-edit-outline",
  //             "children": []
  //           }, {
  //             "id": "/cashier/sys/log",
  //             "name": "系统日志",
  //             "url": "/cashier/sys/log",
  //             "icon": "el-icon-info",
  //             "children": []
  //           }]
  //         },
  //         {
  //           "id": "/cashier/service",
  //           "name": "服务治理",
  //           "url": "",
  //           "icon": "el-icon-service",
  //           "children": [{
  //             "id": "/cashier/service/deal",
  //             "name": "注册中心",
  //             "url": "/cashier/service/deal",
  //             "icon": " el-icon-user",
  //             "children": []
  //           }]
  //         },
  // ]
  //     },


      // {
      //   "name": "首页",
      //   "menuIndex": "/dashboard",
      //   "children": [
      //     {
      //       "id": "/dashboard/summary",
      //       "name": "今日数据",
      //       "url": "/dashboard/summary",
      //       "icon": "el-icon-data-line",
      //       "children": []
      //     }
      //   ]
      // },
      {
        "name": "商品",
        "menuIndex": "/goods",
        "children": [

            // 服务
          {
            "id": "/goods/service",
            "name": "服务管理",
            "url": "/goods/service",
            "icon": "el-icon-bell",
            "children": []
          },
          {
            "id": "/goods/service",
            "name": "添加服务",
            "url": "/goods/service/add",
            "icon": "el-icon-plus",
            "hidden": true,
            "children": [
            ]
          },
          {
            "id": "/goods/service",
            "name": "编辑服务",
            "url": "/goods/service/edit/:id",
            "component": "/goods/service/edit",
            "icon": "el-icon-edit",
            "hidden": true,
            "children": [
            ]
          },

            // 产品
          {
            "id": "/goods/product",
            "name": "产品管理",
            "url": "/goods/product",
            "icon": "el-icon-shopping-bag-2",
            "children": []
          },
          {
            "id": "/goods/product",
            "name": "添加产品",
            "url": "/goods/product/add",
            "icon": "el-icon-plus",
            "hidden": true,
            "children": []
          },
          {
            "id": "/goods/product",
            "name": "编辑产品",
            "url": "/goods/product/edit/:id",
            "component": "/goods/product/edit",
            "icon": "el-icon-edit",
            "hidden": true,
            "children": []
          },

            // 卡项
          {
            "id": "/goods/card",
            "name": "卡项管理",
            "url": "/goods/card",
            "icon": "el-icon-bank-card",
            "children": []
          },
          {
            "id": "/goods/card",
            "name": "添加次卡",
            "url": "/goods/card/counting/add",
            "icon": "el-icon-plus",
            "hidden": true,
            "children": []
          },
          {
            "id": "/goods/card",
            "name": "添加充值卡",
            "url": "/goods/card/prepaid/add",
            "icon": "el-icon-plus",
            "hidden": true,
            "children": []
          },
          {
            "id": "/goods/card",
            "name": "编辑充值卡",
            "url": "/goods/card/prepaid/edit/:id",
            "component": "/goods/card/prepaid/edit",
            "icon": "el-icon-edit",
            "hidden": true,
            "children": []
          }
        ]
      },
      {
        "name": "客户",
        "menuIndex": "/customer",
        "children": [
          {
            "id": "/customer/vip",
            "name": "会员管理",
            "url": "/customer/vip",
            "icon": "el-icon-s-opportunity",
            "children": []
          },
          {
            "id": "/customer/guest",
            "name": "客户管理",
            "url": "/customer/guest",
            "icon": "el-icon-user",
            "children": []
          }
        ]
      },
      {
        "name": "订单",
        "menuIndex": "/orders",
        "children": [
          {
            "id": "/orders/list",
            "name": "订单列表",
            "url": "/orders/list",
            "icon": "el-icon-s-order",
            "children": []
          },
          {
            "id": "/orders/refund",
            "name": "退款列表",
            "url": "/orders/refund",
            "icon": "el-icon-s-finance",
            "children": []
          },
          {
            "id": "/orders/debt",
            "name": "欠款列表",
            "url": "/orders/debt",
            "icon": "el-icon-s-claim",
            "children": []
          }
        ]
      },
      {
        "name": "数据",
        "menuIndex": "/analysis",
        "children": [
          {
            "id": "/analysis/summary",
            "name": "数据概览",
            "url": "/analysis/summary",
            "icon": "el-icon-s-data",
            "children": []
          }
        ]
      },
      {
        "name": "设置",
        "menuIndex": "/settings",
        "children": [
          {
            "id": "/settings/cashier",
            "name": "交易设置",
            "url": "/settings/cashier",
            "icon": "el-icon-setting",
            "children": []
          }
        ]
      }
    ]
  }
  return {
    url: 'menu/findNavTree',
    type: 'get',
    data: navTreeData
  }
}

