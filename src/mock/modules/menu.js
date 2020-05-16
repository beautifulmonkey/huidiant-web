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


      {
        "name": "数据",
        "menuIndex": "/analysis",
        "children": [
          {
            "id": "/analysis/today",
            "name": "今日概览",
            "url": "/analysis/today",
            "icon": "el-icon-data-line",
            "children": []
          }
        ]
      },
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
            "name": "编辑次卡",
            "url": "/goods/card/counting/edit/:id",
            "component": "/goods/card/counting/edit",
            "icon": "el-icon-edit",
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
            "id": "/customer/guest",
            "name": "客户管理",
            "url": "/customer/guest",
            "icon": "el-icon-user",
            "children": []
          },
          {
            "id": "/customer/vip",
            "name": "会员管理(开发中)",
            "url": "/customer/vip",
            "icon": "el-icon-s-opportunity",
            "disabled": true,
            "children": []
          },
          {
            "id": "/customer/analysis",
            "name": "客户分析(开发中)",
            "url": "/customer/analysis",
            "icon": "el-icon-data-analysis",
            "disabled": true,
            "children": []
          },
          {
            "id": "/customer/guest",
            "name": "客户详情",
            "url": "/customer/guest/details/:id",
            "component": "/customer/guest/details",
            "icon": "el-icon-info",
            "hidden": true,
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
            "id": "/orders/list",
            "name": "订单详情",
            "url": "/orders/details/:id",
            "component": "/orders/details",
            "icon": "el-icon-info",
            "hidden": true,
            "children": []
          },
          {
            "id": "/orders/refund",
            "name": "退款列表(开发中)",
            "url": "/orders/refund",
            "icon": "el-icon-s-finance",
            "disabled": true,
            "children": []
          },
          {
            "id": "/orders/debt",
            "name": "欠款列表(开发中)",
            "url": "/orders/debt",
            "icon": "el-icon-s-claim",
            "disabled": true,
            "children": []
          }
        ]
      },
      {
        "name": "设置",
        "menuIndex": "/settings",
        "children": [
          {
            "id": "/settings/stores",
            "name": "店铺设置",
            "url": "/settings/stores",
            "icon": "el-icon-s-shop",
            "children": [
              {
                "id": "/settings/stores/info",
                "name": "店铺信息",
                "url": "/settings/stores/info",
                "icon": "el-icon-s-shop",
              }
            ]
          },
          {
            "id": "/settings/trading",
            "name": "交易设置",
            "url": "/settings/trading",
            "icon": "el-icon-money",
            "children": [
              {
                "id": "/settings/trading/order",
                "name": "开单设置(开发中)",
                "url": "/settings/trading/order",
                "icon": "el-icon-money",
                "disabled": true,
              },
              {
                "id": "/settings/trading/pay",
                "name": "支付设置(开发中)",
                "url": "/settings/trading/pay",
                "icon": "el-icon-money",
                "disabled": true,
              },
            ]
          },
          {
            "id": "/settings/customer",
            "name": "客户设置",
            "url": "/settings/customer",
            "icon": "el-icon-s-custom",
            "children": [
              {
                "id":"/settings/customer/vip",
                "name": "自动入会",
                "url": "/settings/customer/vip",
                "icon": "el-icon-star-off",
              },
              {
                "id": "/settings/customer/tag",
                "name": "标签设置(开发中)",
                "url": "/settings/customer/tag",
                "icon": "el-icon-price-tag",
                "disabled": true,
              },
              {
                "id": "/settings/customer/source",
                "name": "来源管理",
                "url": "/settings/customer/source",
                "icon": "el-icon-s-custom",
              },
            ]
          },
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

