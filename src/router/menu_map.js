/**
    1.
    2.
 */

var menu_list = [
    {
        "name": "收银",
        "fullname": "收银",
        "menuIndex": "/cashier",
        "icon": "el-icon-monitor",
        // "icon": "icon iconfont icon-gaikuang",
    },
    {
        "name": "概况",
        "fullname": "概况",
        "menuIndex": "/today",
        "icon": "icon iconfont icon-gaikuang2",
        "children": [],
        "linkSelf": true
    },
    {
        "name": "客户",
        "fullname": "客户管理",
        "menuIndex": "/customer",
        // "icon": "icon iconfont icon-huiyuan2",
        "icon": "el-icon-user-solid",
        // "icon": "el-icon-s-custom",
        "redirect": "/customer/guest",
        "children": [
            {
                "id": "/customer/guest",
                "name": "客户管理",
                "url": "/customer/guest",
                "children": []
            },
            {
                "id": "/customer/sms",
                "name": "短信发送",
                "url": "/customer/sms",
                "children": []
            },
            {
                "id": "/customer/analysis",
                "name": "客户分析",
                "url": "/customer/analysis",
                "disabled": true,
                "children": []
            },
            {
                "id": "/customer/guest",
                "name": "客户详情",
                "url": "/customer/guest/details/:id",
                "component": "/customer/guest/details",
                "hidden": true,
                "children": []
            }
        ]
    },
    {
        "name": "订单",
        "fullname": "订单管理",
        "menuIndex": "/orders",
        "icon": "icon iconfont icon-dingdan2",
        "redirect": "/orders/list",
        "children": [
            {
                "id": "/orders/list",
                "name": "订单列表",
                "url": "/orders/list",
                "children": []
            },
            {
                "id": "/orders/list",
                "name": "订单详情",
                "url": "/orders/details/:id",
                "component": "/orders/details",
                "hidden": true,
                "children": []
            },
            // {
            //     "id": "/orders/refund",
            //     "name": "退款列表(开发中)",
            //     "url": "/orders/refund",
            //     "icon": "el-icon-s-finance",
            //     "disabled": true,
            //     "children": []
            // },
            // {
            //     "id": "/orders/debt",
            //     "name": "欠款列表(开发中)",
            //     "url": "/orders/debt",
            //     "icon": "el-icon-s-claim",
            //     "disabled": true,
            //     "children": []
            // }
        ]
    },
    {
        "name": "商品",
        "fullname": "商品管理",
        "menuIndex": "/goods",
        "icon": "icon iconfont icon-shangpin",
        "redirect": "/goods/service",
        "children": [

            // 服务
            {
                "id": "/goods/service",
                "name": "服务管理",
                "url": "/goods/service",
                "children": []
            },
            {
                "id": "/goods/service",
                "name": "添加服务",
                "url": "/goods/service/add",
                "hidden": true,
                "children": [
                ]
            },
            {
                "id": "/goods/service",
                "name": "编辑服务",
                "url": "/goods/service/edit/:id",
                "component": "/goods/service/edit",
                "hidden": true,
                "children": [
                ]
            },

            // 产品
            {
                "id": "/goods/product",
                "name": "产品管理",
                "url": "/goods/product",
                "children": []
            },
            {
                "id": "/goods/product",
                "name": "添加产品",
                "url": "/goods/product/add",
                "hidden": true,
                "children": []
            },
            {
                "id": "/goods/product",
                "name": "编辑产品",
                "url": "/goods/product/edit/:id",
                "component": "/goods/product/edit",
                "hidden": true,
                "children": []
            },

            // 卡项
            {
                "id": "/goods/card",
                "name": "卡项管理",
                "url": "/goods/card",
                "children": []
            },
            {
                "id": "/goods/card",
                "name": "添加次卡",
                "url": "/goods/card/counting/add",
                "hidden": true,
                "children": []
            },
            {
                "id": "/goods/card",
                "name": "编辑次卡",
                "url": "/goods/card/counting/edit/:id",
                "component": "/goods/card/counting/edit",
                "hidden": true,
                "children": []
            },
            {
                "id": "/goods/card",
                "name": "添加充值卡",
                "url": "/goods/card/prepaid/add",
                "hidden": true,
                "children": []
            },
            {
                "id": "/goods/card",
                "name": "编辑充值卡",
                "url": "/goods/card/prepaid/edit/:id",
                "component": "/goods/card/prepaid/edit",
                "hidden": true,
                "children": []
            },
            {
                "id": "/goods/card",
                "name": "卡详情",
                "url": "/goods/card/view/:id",
                "component": "/goods/card/view",
                "hidden": true,
                "children": []
            }
        ]
    },
    {
        "name": "数据",
        "fullname": "数据分析",
        "menuIndex": "/analysis",
        "icon": "icon iconfont icon-shuju2",
        "redirect": "/analysis/summary",
        "children": [

            {
                "id": "/analysis/summary",
                "name": " 营业汇总",
                "url": "/analysis/summary",
                "children": []
            }
        ]
    },

    {
        "name": "设置",
        "fullname": "设置中心",
        "menuIndex": "/settings",
        "icon": "icon iconfont icon-shezhi1",
        "redirect": "/settings/stores/info",
        "children": [
            {
                "id": "/settings/stores",
                "name": "店铺设置",
                "url": "/settings/stores",
                "children": [
                    {
                        "id": "/settings/stores/info",
                        "name": "店铺信息",
                        "url": "/settings/stores/info",
                        // "icon": "el-icon-s-shop",
                    },
                    {
                        "id": "/settings/stores/employees",
                        "name": "员工管理",
                        "url": "/settings/stores/employees",
                    },
                    {
                        "id": "/settings/stores/shops",
                        "name": "门店管理",
                        "url": "/settings/stores/shops",
                        // "icon": "el-icon-s-shop",
                    },
                    {
                        "id": "/settings/stores/pwd",
                        "name": "修改密码",
                        "url": "/settings/stores/pwd",
                        // "icon": "el-icon-s-shop",
                    }
                ]
            },
            {
                "id": "/settings/trading",
                "name": "交易设置",
                "url": "/settings/trading",
                "children": [
                    {
                        "id": "/settings/trading/order",
                        "name": "开单设置",
                        "url": "/settings/trading/order",
                        // "icon": "el-icon-money",
                        "disabled": true,
                    },
                    {
                        "id": "/settings/trading/pay",
                        "name": "支付设置",
                        "url": "/settings/trading/pay",
                        // "icon": "el-icon-money",
                    },
                ]
            },
            {
                "id": "/settings/customer",
                "name": "客户设置",
                "url": "/settings/customer",
                "children": [
                    {
                        "id":"/settings/customer/vip",
                        "name": "自动入会",
                        "url": "/settings/customer/vip",
                        // "icon": "el-icon-star-off",
                    },
                    {
                        "id": "/settings/customer/tag",
                        "name": "标签设置",
                        "url": "/settings/customer/tag",
                        // "icon": "el-icon-price-tag",
                        "disabled": true,
                    },
                    {
                        "id": "/settings/customer/source",
                        "name": "来源管理",
                        "url": "/settings/customer/source",
                        // "icon": "el-icon-s-custom",
                    },
                ]
            },
        ]
    }
]

export default menu_list
