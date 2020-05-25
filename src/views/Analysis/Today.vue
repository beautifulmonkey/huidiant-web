<template>
    <div>

        <div class="justify-between">
            <div style="width: 75%">
                <el-card class="card-items" shadow="always">

                    <div class="g-start">
                        <span style="font-size: 120%; font-weight: 500;">今日数据</span>
                    </div>

                    <div class="content">
                        <div class="flex-box">
                            <div class="overview" v-for="item in analysisFlag1">
                                <div class="text-unit small column">
                                    <div>
                                    <span class="g-widget">
                                        <svg-icon :style="{'--color': themeColor}" :icon-class="item.iconClass" width="10" height="10" /><span style="font-size: 90%">{{item.title}}</span>
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
                            <div class="echarts-for-vue" id="myChart" ref="myChart"></div>

                            <div class="overview" v-for="item in analysisFlag2">
                                <div class="text-unit small column">
                                    <div>
                                    <span class="g-widget">
                                        <svg-icon :style="{'--color': themeColor}" :icon-class="item.iconClass" width="10" height="10" /><span style="font-size: 90%">{{item.title}}</span>
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
                <el-card class="card-items" shadow="always">

                    <div class="g-start">
                        <span style="font-size: 120%; font-weight: 500;">常用功能</span>
                    </div>

                    <div class="nav-box">

                        <el-card shadow="hover" @click.native="$router.push('/cashier')">
                            <div class="data-center"><span>开单收银</span></div>
                        </el-card>

                        <el-card shadow="hover" @click.native="$router.push('/customer/guest')">
                            <div class="data-center"><span>添加客户</span></div>
                        </el-card>

                        <el-card shadow="hover" @click.native="$router.push('/orders/list')">
                            <div class="data-center"><span>订单列表</span></div>
                        </el-card>

                    </div>
                </el-card>
            </div>



            <div class="card-items" style="width: 25%;padding: 0px;">
                <div style="display: flex; justify-content: center">
                    <img class="init_widget" src="@/assets/guide.png" @click="guidePage">
                </div>

                <el-card class="right-bar">
                    <div style="display: flex">
                        <div><svg-icon icon-class="nav_service" style="height: 44px;width: 44px" /></div>
                        <div class="info">
                            <p>技术支持</p>
                            <p class="sub-text">提供 7*12 小时的技术服务</p>
                        </div>
                    </div>
                </el-card>

                <el-card class="right-bar">
                    <div style="display: flex">
                        <div><svg-icon icon-class="nav_ipad" style="height: 44px;width: 44px" /></div>
                        <div class="info">
                            <p>兼容 平板/ipad收银</p>
                            <p class="sub-text">在平板/ipad中输入网址即可使用</p>
                        </div>
                    </div>
                </el-card>


            </div>


        </div>



    </div>
</template>

<script>
    import analysisApi from '@/service/analysis.js'
    import {mapState} from "vuex";

    export default {
        name: "Today",
        computed:{
            ...mapState({
                themeColor: state=>state.app.themeColor
            })
        },
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

                summaryData: {
                    today: {
                        income: 0,
                        consumption_card: 0,
                        passenger_flow:  0,
                        vip_add_count: 0,
                        order_count: 0,
                        card_create_count: 0,
                    },
                    yesterday: {
                        income: 0,
                        consumption_card: 0,
                        passenger_flow:  0,
                        vip_add_count: 0,
                        order_count: 0,
                        card_create_count: 0,
                    },
                }
            }
        },
        methods: {
            // 获取今日数据
            async getAnalysisToday(){
                try {
                    const res = await analysisApi.getAnalysisToday();
                    if (res.status >= 200 && res.status < 300) {
                        this.summaryData = res.data;
                        this.drawLine();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取数据失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            guidePage(){
                this.$router.push("/guide")
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                // let myChart = this.$echarts.init(document.getElementById('myChart'))
                var bar_dv = this.$refs.myChart;
                let myChart = this.$echarts.init(bar_dv);

                // 绘制图表
                myChart.setOption({
                    tooltip: {},
                    xAxis: {
                        data: ["产品销售","服务销售","开卡充值"],
                        axisTick:{       //y轴
                            show:false
                        },
                    },
                    yAxis: {
                        name: "示例",
                        splitNumber : 3,
                        axisLine:{       //y轴
                            show:false
                        },
                        axisLabel: {
                            show:false
                        },
                        axisTick:{       //y轴刻度线
                            show:false
                        },
                        splitLine: {     //网格线
                            show:true,
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['#ddd'],
                                type: 'dotted'
                            }
                        }

                    },
                    series: [{
                        name: '现金类业绩',
                        type: 'bar',
                        data: [500, 1680, 6850],
                        barWidth : 40,//柱图宽度,
                        itemStyle:{
                            normal:{
                                color: this.themeColor,
                                label : {show: true, position: 'top', color: 'black'}
                            },
                        },
                    }]
                });
            }

        },
        mounted() {
            this.getAnalysisToday();
        },
        watch: {
            themeColor: {
                immediate: true,
                handler(val) {
                    // this.drawLine();
                }
            }
        }
    }
</script>

<style scoped>
    .justify-between {
        display: flex;
        justify-content: space-between
    }

    .data-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .nav-box{
        padding: 20px;
        display: flex;
    }

    .nav-box .el-card{
        margin-right: 20px;
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
        /*margin-bottom: 50px;*/
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
        color: var(--color);
    }

    .init_widget {
        display: block;
        width: 316px;
        height: 248px;
        cursor: pointer;
    }

    .right-bar {
        margin-top: 20px;
    }
    .info {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -ms-flex-pack: distribute;
        justify-content: space-around;
        margin-left: 16px;
    }

    .info p{
        margin: 0;
    }

    .echarts-for-vue {
        height: 235px;
        margin: -30px 35px -30px -35px;
        min-width: 200px;
        width: 100%;
        flex: 2 1 0%;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
    }

</style>
