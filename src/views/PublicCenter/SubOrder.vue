<template>
	<div class="box-rolling" :style="calcHeight()">

		<el-card v-for="n in LLL" shadow="never">
			<div class="head-wrap">
				<span>2020.08.08 21.40</span>
				<span>成功{{n}}</span>
			</div>
			<el-divider></el-divider>
			<div class="goods-wrap">
				<div><el-tag type="warning" size="mini">品项</el-tag>&nbsp;<span>首席剪发</span></div>
				<div><el-tag type="warning" size="mini">品项</el-tag>&nbsp;<span>欧莱雅烫发</span></div>
			</div>

			<div class="amount-wrap">
				<span>订单金额: 58.00元</span><br>
				<span style="font-size: 13px;color: #878787">余额: 194元</span>
			</div>
		</el-card>

		<el-button style="margin-bottom: 100px;" @click="LLL=LLL+2">加载更多</el-button>

	</div>
</template>

<script>
    export default {
        name: "SubOrder",
	    data(){
            return {
                LLL: 10
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
	    }
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

</style>
