var menu_list = [
    {
        "name": "收银",
        "menuIndex": "/cashier",
        "svg": "cashier"
    },

    {
        "name": "数据",
        "menuIndex": "/analysis",
        "children": [
            {
                "id": "/analysis/today",
                "name": "概览",
                "url": "/analysis/today",
                "icon": "el-icon-data-line",
                "children": []
            },

            {
                "id": "/analysis/summary",
                "name": " 营业汇总",
                "url": "/analysis/summary",
                "icon": "el-icon-s-data",
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
                "icon": "el-icon-thumb",
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
            },
            {
                "id": "/goods/card",
                "name": "卡详情",
                "url": "/goods/card/view/:id",
                "component": "/goods/card/view",
                "icon": "el-icon-info",
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
                "id": "/customer/analysis",
                "name": "客户分析(开发中)",
                "url": "/customer/analysis",
                "icon": "el-icon-data-analysis",
                "disabled": true,
                "children": []
            },
            {
                "id": "/customer/sms",
                "name": "短信发送(开发中)",
                "url": "/customer/sms",
                "icon": "el-icon-message",
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
                "icon": "el-icon-money",
                "children": [
                    {
                        "id": "/settings/trading/order",
                        "name": "开单设置(开发中)",
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
                "icon": "el-icon-s-custom",
                "children": [
                    {
                        "id":"/settings/customer/vip",
                        "name": "自动入会",
                        "url": "/settings/customer/vip",
                        // "icon": "el-icon-star-off",
                    },
                    {
                        "id": "/settings/customer/tag",
                        "name": "标签设置(开发中)",
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
