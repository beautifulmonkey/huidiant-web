<template>
	<div>
		<div class="m-wrap-16" style="display: flex; justify-content: flex-end">
<!--			<el-button :type="item.id == menuActive ? 'primary': 'info'" size="mini">今日</el-button>-->
			<el-button :type="timeMode == 'day7' ? 'primary': 'info'" size="mini" @click="timeModeClick('day7')">近7天</el-button>
			<el-button :type="timeMode == 'thisMonth' ? 'primary': 'info'" size="mini" @click="timeModeClick('thisMonth')">本月</el-button>
			<el-button :type="timeMode == 'day100' ? 'primary': 'info'" size="mini" @click="timeModeClick('day100')">近100天</el-button>

			<el-date-picker
				@change="datePickerChange"
				:clearable="false"
				style="margin-left: 30px;"
				v-model="dateRange"
				size="small"
				value-format="timestamp"
				type="daterange"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				:picker-options="pickerOptions">

			</el-date-picker>
		</div>


		<div>
			<el-card class="card-items" v-loading="dataLoading" shadow="always">
				<div class="g-start">
					<span style="font-size: 100%; font-weight: 500;">整体看板</span>
				</div>

				<el-divider style="margin: 0"></el-divider>

				<div class="mei-components-data-overview__row">
					<div class="mei-components-data-overview__item" style="width: 25%;" v-for="item in indicators.slice(0,4)"
					     @click="indicatorsChange(item.key)"
					     :style="{'--color': themeColor}"
					     v-bind:class="{ 'active': indicators_key_active===item.key}">
						<div class="mei-components-data-overview__item-wrap">
							<div class="mei-components-data-overview__item-title">
								<span class="mei-components-data-overview__item-title">{{item.label}}({{item.unit}})</span>

								<div class="zent-popover-wrapper zent-pop-wrapper" style="display: inline-block;">
<!--									<svg-icon slot="reference" icon-class="dashboard_question" width="20" height="20" />-->

									<el-popover
										placement="bottom"
										trigger="hover">
										<span class="sub-text" v-for="desc in item.description">{{desc}}<br></span>
										<svg-icon slot="reference" icon-class="dashboard_question" width="20" height="20" />
									</el-popover>
								</div>
							</div>
							<div class="mei-components-data-overview__item-value">{{summaryData[item.key].sum}}</div>
						</div>


						<div v-if="indicators_key_active===item.key">
							<svg-icon slot="reference" icon-class="check_mark" class="icon"
							          :style="{'--color': themeColor}"/>
						</div>

					</div>
				</div>

				<div class="mei-components-data-overview__row">
					<div class="mei-components-data-overview__item" style="width: 25%;" v-for="item in indicators.slice(4, 8)"
					     @click="indicatorsChange(item.key)"
					     :style="{'--color': themeColor}"
					     v-bind:class="{ 'active': indicators_key_active===item.key}">
						<div class="mei-components-data-overview__item-wrap">
							<div class="mei-components-data-overview__item-title">
								<span class="mei-components-data-overview__item-title">{{item.label}}({{item.unit}})</span>

								<div class="zent-popover-wrapper zent-pop-wrapper" style="display: inline-block;">
									<!--									<svg-icon slot="reference" icon-class="dashboard_question" width="20" height="20" />-->

									<el-popover
										placement="bottom"
										trigger="hover">
										<span class="sub-text" v-for="desc in item.description">{{desc}}<br></span>
										<svg-icon slot="reference" icon-class="dashboard_question" width="20" height="20" />
									</el-popover>
								</div>
							</div>
							<div class="mei-components-data-overview__item-value">{{summaryData[item.key].sum}}</div>
						</div>


						<div v-if="indicators_key_active===item.key">
							<svg-icon slot="reference" icon-class="check_mark" class="icon"
							          :style="{'--color': themeColor}"/>
						</div>

					</div>
				</div>


				<div class="echarts-for-vue-7" ref="chartIndicators"></div>

			</el-card>

			<el-card class="card-items" shadow="always">
				<div class="g-start">
					<span style="font-size: 100%; font-weight: 500;">交易看板</span>
					<el-radio-group v-model="tradingRadio" size="small" style="margin-right: 50px;" @change="tradingRadioChange">
						<el-radio-button label="pay_way">实收方式</el-radio-button>
						<el-radio-button label="constitute">实收构成</el-radio-button>
					</el-radio-group>
				</div>

				<el-divider style="margin: 0"></el-divider>


				<div class="zent-card-body" style="display: flex; padding-bottom: 0px;">
					<div class="body-box">
						<p v-if="tradingRadio==='pay_way'" class="title">实收方式按金额排行</p>
						<p v-if="tradingRadio==='constitute'" class="title">实收构成按金额排行</p>
						<div class="zent-table-container">
							<el-table
								v-if="tradingRadio==='pay_way'"
								:data="summaryData.pay_way"
								style="width: 100%">
								<el-table-column type="index" label="排名" width="70"></el-table-column>
								<el-table-column prop="name" label="实收方式"></el-table-column>
								<el-table-column prop="value" label="实际收款金额"></el-table-column>
							</el-table>

							<el-table
								v-if="tradingRadio==='constitute'"
								:data="summaryData.constitute"
								style="width: 100%">
								<el-table-column type="index" label="排名" width="70"></el-table-column>
								<el-table-column prop="name" label="实收构成"></el-table-column>
								<el-table-column prop="value" label="实际收款金额"></el-table-column>
							</el-table>
						</div>
					</div>
					<div class="body-box">
						<p v-if="tradingRadio==='pay_way'" class="title">实收方式按金额占比</p>
						<p v-if="tradingRadio==='constitute'" class="title">实收构成按金额占比</p>
						<div class="zent-table-container">
							<div class="echarts-for-vue-7" style="height: 250px;" ref="chartPie"></div>
						</div>
					</div>
				</div>

			</el-card>
		</div>



	</div>
</template>

<script>
    import {mapState} from "vuex";
    import analysisApi from '@/service/analysis.js'
    // echarts相关
    let echarts = require('echarts');

    // let echarts = require('echarts/lib/echarts');
    // require('echarts/lib/chart/pie');
    // require('echarts/lib/chart/line');
    // require('echarts/lib/component/tooltip');
    // require('echarts/lib/component/toolbox');
    // require('echarts/lib/component/legend');
    // require('echarts/lib/component/markLine');

    export default {
        name: "Summary",
        computed:{
            ...mapState({
                themeColor: state=>state.app.themeColor
            })
        },
	    data() {
            return {
                dataLoading: false,
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
	            timeMode: 'day7',
                dateRange: [
                    new Date(new Date().toLocaleDateString()).getTime() - 3600 * 1000 * 24 * 6,
                    new Date(new Date().toLocaleDateString()).getTime()
                ],
                tradingRadio: 'pay_way',
                summaryData: {
                    income: {sum: 0},
                    consumption_card: {sum: 0},
                    income_card: {sum: 0},
                    guest_avg_consume: {sum: 0},
                    passenger_flow: {sum: 0},
                    vip_add_count: {sum: 0},
                    card_create_count: {sum: 0},
                    order_count: {sum: 0},
                },
                indicators_key_active: 'income',
                indicators: [
                    {"label": '实际收款金额', "key": 'income', 'unit': '元', 'description': [
                            "1.实际收款金额是指现金类收款的金额总和；",
                            "2.现金类包含：现金、微信、支付宝、刷卡、自定义记账。"]},
                    {"label": '客户耗卡金额', "key": 'consumption_card', 'unit': '元', 'description': [
                            "1.客户耗卡金额指客户消耗充值卡余额的金额总和；"]},
                    {"label": '开卡充值金额', "key": 'income_card', 'unit': '元', 'description':[
                            '1.开卡充值金额指开卡（充值卡、次卡)或充值的实际收款金额总和；',
		                    '2.消耗会员余额进行开卡的金额不计入开卡充值金额。']},
                    {"label": '客单价', "key": 'guest_avg_consume', 'unit': '元', 'description': [
                            '1.即消费客单价，成交金额和成交客户数均不包括开卡充值的数据；',
		                    '2.客单价 = 品项订单的实际收款金额+客户耗卡金额 / 客户数']},
                    {"label": '总客流', "key": 'passenger_flow', 'unit': '人', 'description': [
                            "1.总客流是指消费付款的客户人数；",
                            "2.一个客户多订单算一个人，散客订单按订单数统计。"]},
                    {"label": '新增会员数', "key": 'vip_add_count', 'unit': '人', 'description': [
                            "1.成为会员的数量"]},
                    {"label": '办卡张数', "key": 'card_create_count', 'unit': '张', 'description': [
                            "1.指售充值卡, 次卡的总张数"]},
                    {"label": '订单数量', "key": 'order_count', 'unit': '个', 'description': [
                            "1.包含 消费,充值,售卡的订单数量。"]}
                ],
            }
	    },

	    methods: {
            // 指标切换
            indicatorsChange(key){
                this.indicators_key_active=key;
	            this.drawHistoryData()
            },

		    // 快捷时间窗切换
            timeModeClick(key){
                this.timeMode = key;
                let today_start = new Date(new Date().toLocaleDateString()).getTime();
	            if (key === 'day7'){
		            this.dateRange = [today_start-86400*1000*6, today_start]
	            }else if (key === 'thisMonth'){
                    let nowdate= new Date();
                    nowdate.setDate(1);
                    this.dateRange = [new Date(nowdate.toLocaleDateString()).getTime(), today_start]
	            }else if (key === 'day100'){
                    this.dateRange = [today_start-86400*1000*99, today_start]
	            }
                this.getAnalysisHistory()

            },

		    // 交易看板切换
            tradingRadioChange(){
                this.drawPieData()
            },

		    // 日期选择切换
            datePickerChange(val){
                let start = val[0]/1000;
                let end = val[1]/1000;
                if ((end - start) / 86400 > 99){
                    this.$message.error('最大区间为100天');
                    return
                }
                this.getAnalysisHistory()
            },
            drawHistoryData(){
                // 基于准备好的dom，初始化echarts实例
                // let myChart = this.$echarts.init(document.getElementById('myChart'))
                var bar_dv = this.$refs.chartIndicators;
                this.chartIndicators = echarts.init(bar_dv);

                let label_name = this.indicators.filter(item => item.key === this.indicators_key_active)[0].label;

                let x = this.summaryData.x;
                let y = this.summaryData[this.indicators_key_active].y;

                var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1E90FF"></span>'
                // 绘制图表
                this.chartIndicators.setOption({

                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b0} <br />' + dotHtml + label_name + ': <strong>{c0}</strong>',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: [label_name],
                        left: '10%',
	                    top: 10
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: x,
                    },
                    yAxis: {
                        type: 'value',
                        axisLine:{       //y轴
                            show:false
                        },
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
                        name: label_name,
                        data: y,
                        type: 'line',
                        symbol: 'circle',
                        // symbolSize:8,   //拐点圆的大小

                        smooth: true,
                        lineStyle: {
                            color: "#1E90FF",
                            width: 4
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
            drawPieData(){
                // 基于准备好的dom，初始化echarts实例
                // let myChart = this.$echarts.init(document.getElementById('myChart'))
                var bar_dv = this.$refs.chartPie;
                this.chartPie = echarts.init(bar_dv);

                let data = this.summaryData[this.tradingRadio];

                let color = ['#e9264c','#410ADF','#F6A93B','#7ED321','#282828','#F9D858','#4CD0DD','#DF86F0','#F5A7C1']
                if (this.tradingRadio === 'constitute'){
                    color = ['#410ADF', '#F9D858', '#7ED321', '#F6A93B']
                }

                let dataName = [];
                let total = 0;
                data.forEach((res) => {
                    dataName.push(res.name);
                    total += parseFloat(res.value) * 10000;
                });

                // 绘制图表
                this.chartPie.setOption({
                    title: {
                        zlevel: 0,
                        text: [
                            '{value|' + this.summaryData.income.sum + '}',
                            '{name|实际收款金额}',
                        ].join('\n'),

                        top: 'center',
                        left: '145',
                        textAlign: 'center',
                        textStyle: {
                            rich: {
                                value: {
                                    color: '#303133',
                                    fontSize: 22,
                                    fontWeight: 'bold',
                                    lineHeight: 20,
                                },
                                name: {
                                    color: '#909399',
                                    lineHeight: 20
                                },
                            },
                        },
                    },
                    tooltip: { // 悬停指示
                        trigger: 'item',
                        formatter: "{b}: {c} <br>占比: {d}%"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        data: dataName,
                        itemGap: 30,
                        top: 'middle',
                        align: 'left',
                        icon: 'circle',
                        formatter: function (name) {
                            return name;
                        }
                    },
                    series: [
                        {
                            name: '占比',
                            type: 'pie',
                            radius: ['65%', '78%'],
                            center: [150, '50%'],
                            label: {
                                normal: {
                                    show: false,
                                },
                            },
                            data: data
                        }
                    ],
                    color: color
                });
            },

            // 获取汇总数据
            async getAnalysisHistory(){
                this.dataLoading = true;
                let start_ts = (new Date()).getTime();

                let params = {
                    start: parseInt(this.dateRange[0] / 1000),
	                end: parseInt(this.dateRange[1] / 1000 + 86399)
                };

                try {
                    const res = await analysisApi.getAnalysisHistory(params);
                    if (res.status >= 200 && res.status < 300) {
                        let tc = (new Date()).getTime() - start_ts;

                        setTimeout(() => {
                            console.log((new Date()).getTime() - start_ts);
                            this.dataLoading = false;
                            this.summaryData = res.data;
                            this.drawHistoryData();
                            this.drawPieData();
                        }, 500 - tc)

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
	    },

        mounted() {
            this.getAnalysisHistory();

        },
    }
</script>

<style scoped>
	.m-wrap-16 {
		margin: 16px;
	}

	.card-items {
		margin: 20px;
		text-align: left;
		padding: 0 16px;
	}

	.g-start {
		margin-left: 20px;
		height: 35px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.el-divider--horizontal{
		margin-top: 8px;
		margin-bottom: 20px;
		/*border-top: 1px dashed #e8eaec;*/
	}

	.mei-components-data-overview__row{
		display: -webkit-box;
		flex-wrap: wrap;
	}

	.mei-components-data-overview__item {
		position: relative;
		height: 120px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		padding: 0 25px;
		margin-top: -1px;
		margin-left: -1px;
		border: 1px solid #eee;
		-webkit-box-align: center;
		-ms-flex-align: center;
		display: flex;
		align-items: center;
		-webkit-box-flex: 1;
		-ms-flex-positive: 1;
		flex-grow: 1;
		position: relative;

	}
	.mei-components-data-overview__item-wrap {
		width: 100%;
	}

	.mei-components-data-overview__item-title {
		font-size: 12px;
		color: #555;
		font-weight: 700;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
	}

	.mei-components-data-overview__item-value {
		font-size: 20px;
		font-weight: 500;
		color: #333;
		padding-top: 10px;
	}
	.active {
		border: 1px solid var(--color) !important;
		z-index: 1;
	}

	.echarts-for-vue-7 {
		height: 300px;
		/*margin: -30px 0 -30px 0;*/
		width: 100%;
	}
	.svg-icon {
		width: 15px;
		height: 15px;
	}

	.icon {
		position: absolute;
		right: -1px;
		bottom: -1px;
		width: 20px;
		height: 20px;
		display: block;
		fill: var(--color) !important;
	}

	.body-box {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		padding: 0 20px;
	}

	.body-box .title {
		margin-bottom: 20px;
		font-weight: 900;
	}
	.zent-table-container {
		margin-bottom: 20px;
	}
</style>
