<template>
	<div>
		<div class="m-wrap-16" style="display: flex; justify-content: flex-end">
			<el-button type="primary" size="mini">今天</el-button>
			<el-button type="info" size="mini">近7天</el-button>
			<el-button type="info" size="mini">本月</el-button>

			<el-date-picker
				style="margin-left: 30px;"
				v-model="value1"
				size="small"
				type="daterange"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期">
			</el-date-picker>
		</div>


		<div>
			<el-card class="card-items" shadow="always">
				<div class="g-start">
					<span style="font-size: 100%; font-weight: 500;">整体看板</span>
				</div>

				<el-divider style="margin: 0"></el-divider>

				<div class="mei-components-data-overview__row">
					<div class="mei-components-data-overview__item" style="width: 25%;" v-for="item in indicators"
					     @click="indicators_key=item.key"
					     v-bind:class="{ 'active': indicators_key===item.key}">
						<div class="mei-components-data-overview__item-wrap">
							<div class="mei-components-data-overview__item-title">
								<span class="mei-components-data-overview__item-title">{{item.label}}</span>

								<div class="zent-popover-wrapper zent-pop-wrapper" style="display: inline-block;">
									<svg-icon slot="reference" icon-class="dashboard_question" width="20" height="20" />
								</div>
							</div>
							<div class="mei-components-data-overview__item-value">39955.21</div>
						</div>


						<div v-if="indicators_key===item.key">
							<svg-icon slot="reference" icon-class="check_mark" class="icon" />
						</div>

					</div>
				</div>


				<div class="echarts-for-vue-7" ref="chartWeeK"></div>

			</el-card>

			<el-card class="card-items" shadow="always">
				<div class="g-start">
					<span style="font-size: 100%; font-weight: 500;">交易看板</span>
					<el-radio-group v-model="radio" size="small" style="margin-right: 50px;">
						<el-radio-button label="1">实收方式</el-radio-button>
						<el-radio-button label="2">实收构成</el-radio-button>
					</el-radio-group>
				</div>

				<el-divider style="margin: 0"></el-divider>


				<div class="zent-card-body" style="display: flex; padding-bottom: 0px;">
					<div class="body-box"><p class="title">实收方式按金额排行</p>
						<div class="zent-table-container">
							<el-table
								:data="tableData"
								style="width: 100%">
								<el-table-column
									type="index"
									label="排名">
								</el-table-column>
								<el-table-column
									prop="name"
									label="实收方式">
								</el-table-column>
								<el-table-column
									prop="amount"
									label="实际收款金额">
								</el-table-column>
								<el-table-column
									prop="rate"
									label="占比">
								</el-table-column>
							</el-table>
						</div>
					</div>
					<div class="body-box"><p class="title">实收方式按金额占比</p>
						<div class="zent-table-container">
							<div class="echarts-for-vue-7" ref="chartPie"></div>
						</div>
					</div>
				</div>

			</el-card>
		</div>



	</div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "Summary",
        computed:{
            ...mapState({
                themeColor: state=>state.app.themeColor
            })
        },
	    data() {
            return {
                value1: '',
                radio: '1',
                indicators_key: 1,
                indicators: [
                    {"label": '实际收款金额(元)', "key": 1},
                    {"label": '客户耗卡金额(元)', "key": 2},
                    {"label": '开卡充值金额(元)', "key": 3},
                    {"label": '客单价(元)', "key": 4},
                    {"label": '总客流(人)', "key": 5},
                    {"label": '新增会员数(人)', "key": 6},
                    {"label": '办卡张数(张)', "key": 7},
                    {"label": '小兔子', "key": 8},
                ],
                tableData: [{
                    amount: '50000',
                    name: '现金',
                    rate: '50%'
                }, {
                    amount: '30000',
                    name: '支付宝',
                    rate: '20%'
                }, {
                    amount: '30000',
                    name: '微信',
                    rate: '20%'
                },{
                    amount: '10000',
                    name: '银联',
                    rate: '10%'
                }]
            }
	    },

	    methods: {
            drawWeekData(){
                // 基于准备好的dom，初始化echarts实例
                // let myChart = this.$echarts.init(document.getElementById('myChart'))
                var bar_dv = this.$refs.chartWeeK;
                let chartWeeK = this.$echarts.init(bar_dv);

                var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1197b8"></span>'
                // 绘制图表
                chartWeeK.setOption({

                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b0} <br />' + dotHtml + '实际收款金额: <strong>{c0}</strong>元',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: [1,2,3,4,5,6,7],
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
                        data: [200, 500, 100, 500, 400,111, 0],
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            color: this.themeColor,
                            width: 5
                        },
                        areaStyle: {
                            color: this.themeColor,
                            opacity: 0.2
                        },
                        itemStyle: {
                            color: this.themeColor,
                        }

                    }]

                });
            },
            drawPieData(){
                // 基于准备好的dom，初始化echarts实例
                // let myChart = this.$echarts.init(document.getElementById('myChart'))
                var bar_dv = this.$refs.chartPie;
                let chartPie = this.$echarts.init(bar_dv);

                var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1197b8"></span>'



	            let data = [
                    { value: 300, name: '现金' },
                    { value: 350, name: '微信' },
                    { value: 250, name: '支付宝' },
                    { value: 100, name: '银联' },
                    { value: 100, name: '1' },
                    { value: 100, name: '2' },
                    { value: 100, name: '3' },
                    { value: 100, name: '4' },
                    { value: 100, name: '5' },
                    { value: 100, name: '6' },
                ];
                let dataName = [];
                let total = 0;
                data.forEach((res) => {
                    dataName.push(res.name);
                    total += parseFloat(res.value) * 10000;
                });

                // 绘制图表
                chartPie.setOption({
                    title: {
                        zlevel: 0,
                        text: [
                            '{value|' + 3333 + '}',
                            '{name|实际收款金额(元)}',
                        ].join('\n'),

                        top: 'center',
                        left: '145',
                        textAlign: 'center',
                        textStyle: {
                            rich: {
                                value: {
                                    color: '#303133',
                                    fontSize: 40,
                                    fontWeight: 'bold',
                                    lineHeight: 40,
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
                        formatter: "{b}: {c} ({d}%)"
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
                            name: '访问来源',
                            type: 'pie',
                            radius: ['65%', '78%'],
                            center: [150, '50%'],
                            stillShowZeroSum: false,
                            avoidLabelOverlap: false,
                            zlevel: 1,
                            label: {
                                normal: {
                                    padding: [30, 30, 30, 30],
                                    backgroundColor: '#fff',
                                    show: false,
                                    position: 'center',
                                    formatter: [
                                        '{value|{c}}',
                                        '{name|{b}}'
                                    ].join('\n'),
                                    rich: {
                                        value: {
                                            color: '#303133',
                                            fontSize: 40,
                                            fontWeight: 'bold',
                                            lineHeight: 40,
                                        },
                                        name: {
                                            color: '#909399',
                                            lineHeight: 20
                                        },
                                    },
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '16',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            data: data
                        }
                    ],
                    color: ['#410ADF','#F42850','#F6A93B','#7ED321','#282828','#F9D858','#4CD0DD','#DF86F0','#F5A7C1']
                });
            }

	    },

        mounted() {
            this.drawWeekData();
            this.drawPieData();
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

	.mei-components-data-overview__compare-wrap {
		padding-top: 10px;
		color: #555;
		font-size: 12px;
		line-height: 20px;
	}

	.active {
		border: 1px solid #8558fa;
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
		fill: #8558fa;
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
