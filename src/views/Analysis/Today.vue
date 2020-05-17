<template>
    <div>

        <div class="justify-between">
            <el-card class="card-items" shadow="always" style="width: 70%">

                <div class="g-start">
                        <span style="font-size: 120%; font-weight: 500;">今日数据</span>
                </div>

                <div class="content">
                    <div class="flex-box">
                        <div class="overview" v-for="item in analysisFlag1">
                            <div class="text-unit small column">
                                <div>
                                    <span class="g-widget">
                                        <svg-icon :icon-class="item.iconClass" width="10" height="10" /><span style="font-size: 90%">{{item.title}}</span>
                                    </span>
                                    <el-popover
                                        placement="bottom"
                                        trigger="hover">
                                        <span class="sub-text" v-for="desc in item.description">{{desc}}<br></span>
                                        <svg-icon slot="reference" icon-class="dashboard_question" width="10" height="10" />
                                    </el-popover>
                                </div>
                                <span class="value">{{summaryData.today[item.key]}}</span>
                            </div>
                            <p class="sub-text">昨日全天<span>{{summaryData.yesterday[item.key]}}</span></p>
                        </div>
                    </div>

                    <div class="flex-box">
                        <div class="overview" v-for="item in analysisFlag2">
                            <div class="text-unit small column">
                                <div>
                                    <span class="g-widget">
                                        <svg-icon :icon-class="item.iconClass" width="10" height="10" /><span style="font-size: 90%">{{item.title}}</span>
                                    </span>
                                    <el-popover
                                        placement="bottom"
                                        trigger="hover">
                                        <span class="sub-text" v-for="desc in item.description">{{desc}}<br></span>
                                        <svg-icon slot="reference" icon-class="dashboard_question" width="10" height="10" />
                                    </el-popover>

                                </div>
                                <span class="value">{{summaryData.today[item.key]}}</span>
                            </div>
                            <p class="sub-text">昨日全天<span>{{summaryData.yesterday[item.key]}}</span></p>
                        </div>
                    </div>
                </div>
            </el-card>




            <el-card class="card-items" shadow="always" style="width: 28%;height: 200px">
            </el-card>


        </div>



    </div>
</template>

<script>
    import analysisApi from '@/service/analysis.js'

    export default {
        name: "Today",
        data() {
            return {
                analysisFlag1: [
                    {title: "实际收款金额", iconClass: "dashboard_wallet", key: "income",
                        description: [
                            "1.实际收款金额是指现金类收款的金额总和；",
                            "2.现金类包含：现金、微信、支付宝、刷卡、自定义记账。"
                        ]},
                    {title: "客户耗卡金额", iconClass: "dashboard_money", key: "consumption_card",
                        description: [
                            "1.客户耗卡金额指客户消耗充值卡余额的金额总和；",

                            // "1.客户耗卡金额指客户消耗类收款的金额总和；",
                            // "2.客户消耗类包含：客户余额、权益次数消耗，其中权益次数消耗取折算后的单次金额计算客户消耗金额。"
                        ]},
                    {title: "总客流", iconClass: "dashboard_user", key: "passenger_flow",
                        description: [
                            "1.总客流是指消费付款的客户人数；",
                            "2.一个客户多订单算一个人，散客订单按订单数统计。"
                        ]},
                    {title: "新增会员数", iconClass: "dashboard_user_add", key: "vip_add_count",
                        description: [
                            "成为会员的数量"
                        ]}
                ],

                analysisFlag2: [
                    {title: "订单数量", iconClass: "dashboard_order", key: "order_count",
                        description: [
                            "包含 消费,充值,售卡的订单数量。"
                        ]},
                    {title: "办卡张数", iconClass: "dashboard_delivery", key: "card_create_count",
                        description: [
                            "指售充值卡, 次卡的总张数"
                        ]}
                ],

                summaryData: {}
            }
        },
        methods: {
            // 获取今日数据
            async getAnalysisToday(){
                try {
                    const res = await analysisApi.getAnalysisToday();
                    if (res.status >= 200 && res.status < 300) {
                        this.summaryData = res.data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取数据失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        },
        mounted() {
            this.getAnalysisToday();
        }
    }
</script>

<style scoped>
    .justify-between {
        display: flex;
        justify-content: space-between
    }

    .card-items {
        margin: 20px;
        text-align: left;
    }

    .flex-box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-bottom: 50px;
    }

    .overview {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-align: left;
    }

    .content {
        padding: 24px 24px 0;
    }

    .sub-text {
        font-size: 12px;
        color: #646566;
        margin-top: 0;
    }

    .overview .sub-text span {
        margin-left: 8px;
        color: #323232;
    }

    .text-unit.column {
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
    }

    .overview .text-unit .value {
        color: #323232;
        font-size: 30px;
        font-weight: 500;
    }

    .g-widget>*+* {
        margin-left: 8px;
    }

    .g-widget svg {
        color: #8558fa;
    }
</style>
