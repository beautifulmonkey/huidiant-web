<template>
	<div class="box-rolling" :style="calcHeight()">

		<div v-if="orderList.length">
			<el-card v-for="order in orderList" shadow="never">
				<div class="head-wrap">
					<span>{{order.created_at}}</span>
					<span>成功</span>
				</div>
				<el-divider></el-divider>
				<div class="goods-wrap">
					<div v-for="goodsItem in order.goods">
						<el-tag type="warning" size="mini">{{order.order_type_info}}</el-tag>&nbsp;
						<span>{{goodsItem.goods_name}}</span>
						<span v-if="goodsItem.type === 3" style="font-size: 12px;color: rgb(153, 153, 153);">{{goodsItem.reduce_text}}</span>
					</div>
				</div>

				<div class="amount-wrap" v-if="order.paid_amount">
					<span>订单金额:{{order.paid_amount}}元</span><br>
					<span style="font-size: 13px;color: #878787">余额: {{order.total_balance_after}}元</span>
				</div>
			</el-card>

			<el-button :disabled="btnDisabled" v-show="btnShow" style="width: 100%;margin-bottom: 100px" type="primary" @click="viewMore">{{!btnDisabled ? '加载更多': '没有更多了...'}}</el-button>
		</div>

		<div v-if="this.filter.total===0" class="no-data">
			暂无消费记录
		</div>

	</div>
</template>

<script>
    import publicApi from '@/service/public.js'

    export default {
        name: "SubOrder",
	    data(){
            return {
                filter: {
                    page_index: 1,
                    page_size: 10
                },
	            btnShow: false,
                btnDisabled: false,
	            orderList: []
            }
	    },
	    methods: {
            calcHeight(){
                const container = window.document.getElementById('main-box');
                if(container){
                    return "height: " +  (container.clientHeight - 75).toString() + "px"
                }
                return "height: 300px";
            },

		    viewMore(){
			    this.customerCenterOrder()
		    },

            async customerCenterOrder(){
                try {
                    const res = await publicApi.customerCenterOrder(this.$route.params.openId, this.filter);
                    if (res.status >= 200 && res.status < 300) {
                        this.orderList = this.orderList.concat(res.data.data);
                        this.filter.total = res.data.page.total;

                        this.btnShow = true;

                        if (this.filter.total === this.orderList.length){
                            this.btnDisabled = true
                        }else {
                            this.filter.page_index += 1
                        }

                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取订单信息失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

	    },
        mounted() {
            this.customerCenterOrder()
        },
        created () {
            document.title = '消费记录'
        },
    }
</script>

<style scoped>
	.box-rolling {
		overflow-y: auto;
		overflow-x: hidden;
		padding: 2px;
	}
	.el-card {
		width: 100%;
		margin-bottom: 20px;
		border-radius: 10px
	}
	.el-divider{
		margin: 10px 0;
	}
	/deep/ .el-card__body {
		padding: 13px 15px;
	}

	.head-wrap{
		display: flex;
		justify-content: space-between;
		color: #878787;
		font-size: 12px;
	}
	.goods-wrap{
		font-size: 13px;
		color: #5a5a5a;
	}
	.goods-wrap div{
		margin-bottom: 5px;
	}
	.amount-wrap {
		font-size: 15px;
		text-align: right
	}
	.no-data{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgb(150, 151, 153);
	}

</style>
