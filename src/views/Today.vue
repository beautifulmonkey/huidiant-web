<template>
    <div class="base-box">

        <div class="main-box">
                <div class="card-items">

                    <div class="g-start">
                        <span>今日数据</span>

                        <el-button style="margin-left: 10px;" type="text" size="mini"
                                @click="$router.push('/analysis/summary')">更多数据</el-button>

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
                            <div class="echarts-for-vue" ref="chartToday"></div>

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
                </div>

                <div class="card-items">
                    <div class="g-start">
                        <span>近7日实收</span>
                    </div>
                    <div class="echarts-for-vue-7" ref="chartWeeK"></div>
                </div>

                <div class="card-items">

                    <div class="g-start">
                        <span>常用功能</span>&nbsp;
                        <el-button type="text" @click="guidePage()" size="mini">新手引导<i class="el-icon-right"></i></el-button>
                    </div>

                    <div class="row-7 shortcut-wrap card-content">
                        <div class="col" v-for="item in functionGuide">
                            <a class="shortcut-item" @click="$router.push(item.router)">
                                <span class="icon el-avatar el-avatar--square" :class="item.className">
                                    <img :src="item.imgSrc" class="shortcut-icon">
                                </span>
                                <span class="text">{{item.funcName}}</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

        <div class="right-box" v-if="!isMobile()" >
                <div>
                    <img class="init_widget" src="@/assets/guide.png" @click="guidePage">
                </div>


                <el-popover
                    placement="left-start"
                    trigger="hover">
                    <div class="right-card" slot="reference">
                        <div slot="reference">
                                <div><svg-icon icon-class="nav_public" style="height: 44px;width: 44px" /></div>
                            <div class="info">
                                <p>客户端公众号</p>
                                <p class="sub-text">客户接收消费通知 余额 消费记录</p>
                            </div>
                        </div>
                    </div>
                    <div class="qrcode">
                        <span>客户扫码关注</span>
                        <img src="@/assets/img/yxkj_public.jpg">
                        <el-button type="text" size="mini" @click="downloadCodeImg('公众号二维码')"><i class="el-icon-download"></i>下载二维码</el-button>
                    </div>
                </el-popover>

                <el-popover
                    placement="left-start"
                    trigger="hover">
                    <div class="right-card" slot="reference">
                        <div>
                            <div><svg-icon icon-class="nav_service" style="height: 44px;width: 44px" /></div>
                            <div class="info">
                                <p>云逍客服支持</p>
                                <p class="sub-text">一对一指导您营销和使用</p>
                            </div>
                        </div>
                    </div>
                    <div class="qrcode">
                        <span>添加您的专属营销专家<br>一对一指导您使用和营销玩法</span>
                        <img src="@/assets/img/kefu_qrcode.png">
                    </div>
                </el-popover>


                <div class="right-card" style="padding: 16px;">
                    <span style="font-size: 14px;font-weight: 700">产品动态</span>
                    <div class="product-version">
                        <p>08/22 订单列表、客户列表 UI优化</p>
                        <p>08/22 店铺信息支持上传店铺Logo</p>
                        <p>08/19 界面UI细节优化</p>
                        <p>08/15 短信发送功能上线</p>
                        <p>08/15 微信公众号客户中心上线</p>
                    </div>
                </div>


            </div>

    </div>
</template>

<script>
    import analysisApi from '@/service/analysis.js'
    import {mapState} from "vuex";
    // echarts相关
    let echarts = require('echarts');

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
                            "1.成为会员的数量"
                        ]}
                ],

                analysisFlag2: [
                    {title: "订单数量", iconClass: "dashboard_order", key: "order_count",
                        description: [
                            "1.包含 消费,充值,售卡的订单数量。"
                        ]},
                    {title: "办卡张数", iconClass: "dashboard_card", key: "card_create_count",
                        description: [
                            "1.指售充值卡, 次卡的总张数"
                        ]}
                ],

                functionGuide: [
                    {funcName: "开单收银", imgSrc: require("@/assets/img/today_kaidan.png"), className: "icon1", router:"/cashier"},
                    {funcName: "订单列表", imgSrc: require("@/assets/img/today_dingdan.png"), className: "icon2", router: "/orders/list"},
                    {funcName: "客户查询", imgSrc: require("@/assets/img/today_kehu.png"), className: "icon3", router: "/customer/guest"},
                    {funcName: "快捷开卡", imgSrc: require("@/assets/img/today_kaika.png"), className: "icon4", router: {path: '/cashier', query: {cType: 'createCard'}}},
                    {funcName: "快捷划卡", imgSrc: require("@/assets/img/today_huaka.png"), className: "icon5", router: {path: '/cashier', query: {cType: 'counting'}}},
                    {funcName: "余额充值", imgSrc: require("@/assets/img/today_chongzhi.png"), className: "icon6", router: {path: '/cashier', query: {cType: 'recharge'}}},
                    {funcName: "余额消费", imgSrc: require("@/assets/img/today_xiaofei.png"), className: "icon7", router: "/cashier"},
                ],

                summaryData: {
                    today: {
                        income: 0,
                        consumption_card: 0,
                        passenger_flow:  0,
                        vip_add_count: 0,
                        order_count: 0,
                        card_create_count: 0,
                        chart: {
                            cash_product_service: 0,
                            cash_counting: 0,
                            cash_prepaid: 0,
                            cash_recharge: 0
                        }
                    },
                    yesterday: {
                        income: 0,
                        consumption_card: 0,
                        passenger_flow:  0,
                        vip_add_count: 0,
                        order_count: 0,
                        card_create_count: 0,
                    },
                    week: {
                        x: [],
                        y: []
                    }
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
                        this.drawTodayData();
                        this.drawWeekData()
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

            isMobile(){
                let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
                return flag;
            },

            drawTodayData(){
                // 基于准备好的dom，初始化echarts实例
                // let myChart = this.$echarts.init(document.getElementById('myChart'))
                var bar_dv = this.$refs.chartToday;
                let chartToday = echarts.init(bar_dv);

                let chartData = [
                    this.summaryData.today.chart.cash_product_service,
                    this.summaryData.today.chart.cash_counting,
                    this.summaryData.today.chart.cash_prepaid,
                    this.summaryData.today.chart.cash_recharge
                ];
                // 绘制图表
                chartToday.setOption({
                    tooltip: {},
                    xAxis: {
                        data: ["产品服务","办次卡","办充值卡", "充值"],
                        axisTick:{       //y轴
                            show:false
                        },
                    },
                    yAxis: {
                        // name: "现金业绩",
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
                                type: 'dashed'
                            }
                        }

                    },
                    series: [{
                        name: '现金类业绩',
                        type: 'bar',
                        data: chartData,
                        barWidth : 40,//柱图宽度,
                        itemStyle:{
                            normal:{
                                color: this.themeColor,
                                label : {show: true, position: 'top', color: 'black'}
                            },
                        },
                    }]
                });
            },

            drawWeekData(){
                // 基于准备好的dom，初始化echarts实例
                // let myChart = this.$echarts.init(document.getElementById('myChart'))
                var bar_dv = this.$refs.chartWeeK;
                let chartWeeK = echarts.init(bar_dv);

                var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1E90FF"></span>'

                // 绘制图表
                chartWeeK.setOption({
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b0} <br />' + dotHtml + '实际收款金额: <strong>{c0}</strong>元'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.summaryData.week.x
                    },
                    yAxis: {
                        type: 'value',
                        axisLine:{       //y轴
                            show:false
                        },
                        splitNumber : 4,

                        // axisLabel: {
                        //     show:false
                        // },
                        axisTick:{       //y轴刻度线
                            show:false
                        },

                        splitLine: {     //网格线
                            show:true,
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['#ddd'],
                                type: 'dashed',
                            }
                        }
                    },
                    series: [{
                        data: this.summaryData.week.y,
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            color: "#1E90FF",
                            width: 5
                        },
                        areaStyle: {
                            color: "#1E90FF",
                            opacity: 0.2
                        },
                        itemStyle: {
                            color: "#1E90FF",
                        }

                    }]

                });
            },


            downloadCodeImg(name){
                var a = document.createElement('a')
                a.download =  name;
                // 设置图片地址
                a.href = require('@/assets/img/yxkj_public.jpg');
                a.click();
            },


        },
        // mounted() {
        //     this.getAnalysisToday();
        // },
        watch: {
            themeColor: {
                immediate: true,
                handler(val) {
                    this.getAnalysisToday();
                }
            }
        }
    }
</script>

<style scoped>
    .base-box {
        margin: 10px;
        display: flex;

    }
    .main-box{
        width: 100%;
        margin-right: 20px
    }
    .right-box {
        width: 340px;
    }

    .main-box .card-items {
        margin-bottom: 20px;
        text-align: left;
        background: white;
        padding: 20px;
    }

    .main-box .card-items .g-start span{
        font-size: 120%; font-weight: 500;
    }

    .right-box .right-card {
        margin-top: 20px;
        padding: 20px;
        background: white;
        text-align: left;
    }
    .right-box .right-card div {
        display: flex;
    }


    .main-box .card-items .flex-box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        /*margin-bottom: 50px;*/
    }

    .main-box .card-items .overview {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-align: left;
    }

    .main-box .card-items .content {
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

    .echarts-for-vue-7 {
        height: 235px;
        margin: -30px 0 -30px 0;
        width: 100%;
    }

    .card-content {
        text-align: center;
        padding-left: 24px;
        padding-right: 24px;
    }

    .row-7 {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }
    .col {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 140px;
        width: 20%;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .shortcut-item {
        display: block;
        margin: auto;
        cursor: pointer;
    }

    .shortcut-item .icon.icon1 {
        -webkit-box-shadow: 0 2px 8px 0 rgba(203, 101, 237, .5);
        box-shadow: 0 2px 8px 0 rgba(203, 101, 237, .5);
    }
    .shortcut-item:hover .icon.icon1 {
        -webkit-box-shadow: 0 6px 15px 0 rgba(203,101,237,.5);
        box-shadow: 0 6px 15px 0 rgba(203,101,237,.5);
    }


    .shortcut-item .icon.icon2 {
        -webkit-box-shadow: 0 2px 8px 0 rgba(161,105,255,.5);
        box-shadow: 0 2px 8px 0 rgba(161,105,255,.5);
    }
    .shortcut-item:hover .icon.icon2 {
        -webkit-box-shadow: 0 6px 15px 0 rgba(161,105,255,.5);
        box-shadow: 0 6px 15px 0 rgba(161,105,255,.5);
    }


    .shortcut-item .icon.icon3 {
        -webkit-box-shadow: 0 2px 8px 0 rgba(161,105,255,.5);
        box-shadow: 0 2px 8px 0 rgba(161,105,255,.5);
    }
    .shortcut-item:hover .icon.icon3 {
        -webkit-box-shadow: 0 6px 15px 0 rgba(161,105,255,.5);
        box-shadow: 0 6px 15px 0 rgba(161,105,255,.5);
    }


    .shortcut-item .icon.icon4 {
        -webkit-box-shadow: 0 2px 8px 0 rgba(35,190,177,.5);
        box-shadow: 0 2px 8px 0 rgba(35,190,177,.5);
    }
    .shortcut-item:hover .icon.icon4 {
        -webkit-box-shadow: 0 6px 15px 0 rgba(35,190,177,.5);
        box-shadow: 0 6px 15px 0 rgba(35,190,177,.5);
    }


    .shortcut-item .icon.icon5 {
        -webkit-box-shadow: 0 2px 8px 0 rgba(50,200,228,.5);
        box-shadow: 0 2px 8px 0 rgba(50,200,228,.5);
    }
    .shortcut-item:hover .icon.icon5 {
        -webkit-box-shadow: 0 6px 15px 0 rgba(50,200,228,.5);
        box-shadow: 0 6px 15px 0 rgba(50,200,228,.5);
    }


    .shortcut-item .icon.icon6 {
        -webkit-box-shadow: 0 2px 8px 0 rgba(255,180,63,.5);
        box-shadow: 0 2px 8px 0 rgba(255,180,63,.5);
    }
    .shortcut-item:hover .icon.icon6 {
        -webkit-box-shadow: 0 6px 15px 0 rgba(255,180,63,.5);
        box-shadow: 0 6px 15px 0 rgba(255,180,63,.5);
    }


    .shortcut-item .icon.icon7 {
        -webkit-box-shadow: 0 2px 8px 0 rgba(255,180,63,.5);
        box-shadow: 0 2px 8px 0 rgba(255,180,63,.5);
    }
    .shortcut-item:hover .icon.icon7 {
        -webkit-box-shadow: 0 6px 15px 0 rgba(255,180,63,.5);
        box-shadow: 0 6px 15px 0 rgba(255,180,63,.5);
    }

    .shortcut-item:hover .el-avatar{
        transform:translateY(-5px);
    }

    .shortcut-wrap .icon {
        -webkit-transition: transform .3s cubic-bezier(.075,.82,.165,1);
        transition: transform .3s cubic-bezier(.075,.82,.165,1);
    }
    .shortcut-wrap .el-avatar--square {
        border-radius: 8px;
    }

    .shortcut-wrap .el-avatar {
        width: 56px;
        height: 56px;
        line-height: 56px;
    }
    .el-avatar {
        display: inline-block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-align: center;
        overflow: hidden;
        color: #fff;
        background: #c0c4cc;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }

    .card-content .text {
        display: block;
        color: #505050;
        font-size: 15px;
    }

    .qrcode {
        text-align: center;
    }
    .qrcode span {
        font-size: 12px;
        color: rgb(178, 178, 178);
    }
    .qrcode img {
        display: block;
        width: 200px;
        height: 200px;
        cursor: pointer;
    }
    .product-version {
        display: block !important;
        font-size: 12px !important;
    }
    .product-version p {
        margin: 12px 0;
    }
</style>
