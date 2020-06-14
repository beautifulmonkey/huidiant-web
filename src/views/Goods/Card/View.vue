<template>
	<div>
		<div class="m-wrap-8">
			<el-page-header @back="$router.push('/goods/card')" content="卡项详情"></el-page-header>
		</div>

		<div class="m-wrap-16">
			<el-row>
				<el-col :span="24"><div style="float: left">
					<el-button v-if="cardData.type === 1" @click="$router.push('/goods/card/prepaid/edit/' + $route.params.id)" size="small" type="primary">编辑</el-button>
					<el-button v-if="cardData.type === 2" @click="$router.push('/goods/card/counting/edit/' + $route.params.id)" size="small" type="primary">编辑</el-button>

					<el-button v-if="cardData.disable === 1" @click="cardStatusChange($route.params.id, 0)" size="small">上架</el-button>
					<el-button type="danger" v-if="cardData.disable === 0" @click="cardStatusChange($route.params.id, 1)" size="small">下架</el-button>

				</div></el-col>
			</el-row>
		</div>


		<div class="m-wrap-16">
			<div style="display: flex">
				<div class="preview">
					<div class="elLnRK" :class="'bgi_' + cardData.type">
						<header><span>{{user.stores_name}}</span></header>
						<p>{{cardData.name}}</p>
						<section>
							<p class="prepaid-value"><span>¥ </span>{{cardData.price}}</p>
						</section>
						<footer>{{cardData.validity}}</footer>
					</div>


					<div class="card-grid">
						<div class="grid-item"><span class="grid-key">创建日期：</span><pre class="grid-value break-all">{{cardData.created_at}}</pre></div>
						<div class="grid-item"><span class="grid-key">卡名称：</span><pre class="grid-value break-all">{{cardData.name}}</pre></div>
						<div class="grid-item"><span class="grid-key">卡类型：</span><pre class="grid-value break-all">{{cardData.type_details}}</pre></div>
						<div class="grid-item"><span class="grid-key">卡状态：</span>
							<pre v-if="cardData.disable===0" class="grid-value break-all">在售</pre>
							<pre v-if="cardData.disable===1" class="grid-value break-all">下架中</pre>
						</div>

						<div class="grid-item">
							<span v-if="cardData.type===1" class="grid-key">充值金额：</span>
							<span v-if="cardData.type===2" class="grid-key">售价：</span>
							<pre class="grid-value break-all">¥{{cardData.price}}</pre>
						</div>
						<div class="grid-item"><span class="grid-key">有效期：</span><pre class="grid-value break-all">{{cardData.validity}}</pre></div>
						<div class="grid-item"><span class="grid-key">描述：</span><pre class="grid-value break-all">{{cardData.description || '-'}}</pre></div>

					</div>
				</div>


				<div class="rights">
					<el-tabs type="card" value="rights">
						<el-tab-pane label="卡项权益" name="rights">
							<el-table
								:data="cardData.card_rights"
								style="width: 100%">
								<el-table-column
									prop="content"
									label="适用内容">
								</el-table-column>
								<el-table-column
									prop="rule"
									label="优惠规则">
								</el-table-column>
								<el-table-column
									prop="validity"
									label="有效期">
								</el-table-column>
							</el-table>
						</el-tab-pane>

<!--						<el-tab-pane label="赠送权益" name="send">-->
<!--						</el-tab-pane>-->
					</el-tabs>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

    import cardApi from '@/service/card.js'

    export default {
        name: "View",
	    data() {
            return {
                user: {},
                cardData: {},
            }
	    },
	    methods: {
            // 获取单个详情
            async getCardDetails(){
                try {
                    const res = await cardApi.getCardDetails(this.$route.params.id);
                    if (res.status >= 200 && res.status < 300) {
                        this.cardData = res.data;
                        debugger
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取卡项失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 卡项上下架
            cardStatusChange(card_id, disable) {
                if (disable === 0){
                    this.updateCardStatus(card_id, disable)
                } else {

                    this.$confirm('下架后无法在收银界面看到该卡项, 可通过上架还原。是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                        .then(() => {
                            this.updateCardStatus(card_id, disable)
                        })
                        .catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消操作'
                            })
                        })

                }
            },

            // 上下架卡项
            async updateCardStatus(card_id, disable){
                const disable_map = {1: "下架", 0: "上架"};
                try {
                    const res = await cardApi.updateCardStatus(card_id, disable);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '卡项' + disable_map[disable] + '成功!'
                        });
                        this.getCardDetails();
                    } else {
                        console.error('error', res.status)
                    }
                } catch (error) {
                    console.error('error', error)
                }
            },

	    },
        mounted() {
            this.getCardDetails();
            if (localStorage.userInfo) {
                const userInfo = JSON.parse(localStorage.userInfo);
                if (userInfo) {
                    this.user = userInfo
                }
            }
        }
    }
</script>

<style scoped>
	.m-wrap-16 {
		margin: 16px;
	}

	.m-wrap-8 {
		margin: 8px;
	}

	.preview {
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		padding: 20px 35px;
		width: 425px;
		height: auto;
		margin-bottom: 30px;
		background-color: #f6f6f6;
	}

	.rights {
		margin-left: 30px;
		width: 100%
	}

	.bgi_1{
		background: url(https://b.yzcdn.cn/beauty/card/bgimg/rechargeCard.png) center center / cover no-repeat;
	}
	.bgi_2{
		background: url(https://b.yzcdn.cn/beauty/card/bgimg/timesCard.png) center center / cover no-repeat;
	}
	.elLnRK {
		text-shadow: rgba(0, 0, 0, 0.5) 0px 1px 3px;
		width: 355px;
		height: 164px;
		position: relative;
		color: rgb(255, 255, 255);
		cursor: default;
		overflow: hidden;
		border-radius: 8px;
	}
	.elLnRK > header {
		position: absolute;
		z-index: 10;
		left: 14px;
		top: 12px;
		font-size: 14px;
		line-height: 20px;
	}
	.elLnRK > header img {
		vertical-align: middle;
		width: 20px;
		height: 20px;
		font-size: 14px;
		margin-right: 6px;
		border-radius: 50%;
		overflow: hidden;
		border-width: 1px;
		border-style: solid;
		border-color: rgb(255, 255, 255);
		border-image: initial;
	}

	.elLnRK > p {
		position: absolute;
		z-index: 10;
		font-size: 20px;
		font-weight: bold;
		line-height: 28px;
		left: 21px;
		top: 50px;
	}

	.elLnRK > section {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 20px;
		text-align: center;
		z-index: 10;
		color: rgb(255, 255, 255);
	}

	.elLnRK .prepaid-value {
		font-weight: bold;
		font-size: 30px;
	}

	.elLnRK .prepaid-value span {
		font-size: 14px;
		font-weight: normal;
	}

	.elLnRK > footer {
		z-index: 10;
		position: absolute;
		left: 21px;
		bottom: 11px;
		font-size: 12px;
		line-height: 17px;
	}

	.card-grid {
		margin-top: 15px;
	}

	.card-grid .grid-item {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		padding: 5px 0;
		font-size: 14px;
		line-height: 20px;
	}

	.card-grid .grid-item .grid-key {
		width: 70px;
		text-align: right;
		margin-right: 10px;
		color: #999;
	}

	.card-grid .grid-item .grid-value {
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		color: #202020;
		white-space: pre-wrap;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		font-family: Helvetica Neue,Helvetica,Roboto,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,-apple-system,BlinkMacSystemFont,SimSun,sans-serif!important;
	}
	.break-all {
		word-break: break-all;
		margin: 0;
		text-align: left;
	}
</style>
