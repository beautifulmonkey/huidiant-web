<template>
	<div>
		<div @click="details=!details" class="card-box recharge_card" style="background-image: url(https://b.yzcdn.cn/beauty/card/bgimg/timesCard.png);">
			<div  class="card-box__header">
				<span  class="dept-info">
					<img  src="https://img.yzcdn.cn/upload_files/2017/04/06/FkzPke7UiK-QgqA0_KFby82u6KV7.png?imageView2/1/w/48/h/48" alt="" class="card-box__header__face">
					<span  class="card-box__header__name filter">才子美肤</span>
				</span><span  class="card-box__header__type">次数卡</span>
			</div>
			<div  class="card-box__name">剪发卡10次</div>
			<div  class="card-box__footer">
				<span  class="filter">有效期：永久有效</span>
				<span  class="card-box__footer__info">
					<span>剩余</span>
<!--					<span  class="card-box__footer__info&#45;&#45;white">￥</span>-->
					<span  class="card-box__footer__info__name">
						<span >3</span>
					</span>
					<span >次</span>
				</span>
			</div>
		</div>
		<el-card v-show="details" style="border-radius: 12px;margin-top: -40px;margin-bottom: 20px;">
			<div>
<!--				<el-divider>卡项权益</el-divider>-->

				<div style="display: flex;margin-top: 20px;justify-content: space-between;padding: 0 30px;font-weight: 500">
					<div style="font-size: 13px;">适用内容</div>
					<div style="font-size: 13px;">剩余次数</div>
				</div>

				<!--				<el-divider></el-divider>-->

				<div style="display: flex;margin-top: 20px;justify-content: space-between;padding: 0 30px;">
					<div style="font-size: 13px;">剪发</div>
					<div style="font-size: 13px;">剩余9次</div>
				</div>
				<!--				<div style="display: flex;margin-top: 20px;justify-content: space-between;padding: 0 30px;">-->
				<!--					<div style="font-size: 13px;">烫发</div>-->
				<!--					<div style="font-size: 13px;">10折</div>-->
				<!--				</div>-->
			</div>
		</el-card>


		<div class="card-box recharge_card" style="background-image: url(https://b.yzcdn.cn/beauty/card/bgimg/timesCard.png);">
			<div  class="card-box__header">
				<span  class="dept-info">
					<img  src="https://img.yzcdn.cn/upload_files/2017/04/06/FkzPke7UiK-QgqA0_KFby82u6KV7.png?imageView2/1/w/48/h/48" alt="" class="card-box__header__face">
					<span  class="card-box__header__name filter">才子美肤</span>
				</span><span  class="card-box__header__type">次数卡</span>
			</div>
			<div  class="card-box__name">剪发卡10次</div>
			<div  class="card-box__footer">
				<span  class="filter">有效期：永久有效</span>
				<span  class="card-box__footer__info">
					<span>剩余</span>
					<!--					<span  class="card-box__footer__info&#45;&#45;white">￥</span>-->
					<span  class="card-box__footer__info__name">
						<span >3</span>
					</span>
					<span >次</span>
				</span>
			</div>
		</div>

	</div>
</template>

<script>
    export default {
        name: "SubCounting",
	    data() {
            return {
                details: false
            }
	    }
    }
</script>

<style scoped>
	.card-box {
		height: 165px;
		border-radius: 12px;
		position: relative;
		overflow: hidden;
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;
		margin-bottom: 20px;
	}

	.card-box__header {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-justify-content: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-align-items: flex-start;
		-ms-flex-align: start;
		align-items: flex-start;
		height: 24px;
		margin: 16px 0 0 20px;
	}
	.dept-info {
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
	}

	.card-box .card-box__header .card-box__header__face {
		border-radius: 50%;
		width: 24px;
		height: 24px;
		margin-right: 8px;
	}
	.card-box .card-box__header .card-box__header__name {
		padding-right: 12px;
		line-height: 24px;
		font-size: 12px;
		color: #FFFFFF;
	}
	.card-box .card-box__header .card-box__header__type {
		margin-left: auto;
		white-space: nowrap;
		margin-right: 20px;
		border-radius: 2px;
		opacity: 0.6;
		border: 1px solid #FFF;
		color: #FFF;
		font-size: 10px;
		padding: 2px 4px;
	}
	.card-box .card-box__name {
		position: absolute;
		top: 50%;
		-webkit-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		transform: translateY(-50%);
		left: 20px;
		font-size: 20px;
		font-weight: 500;
		line-height: 28px;
		max-width: 300px;
		font-family: 'PingFangSC-Medium,PingFang SC';
		color: #FFF;
	}
	.card-box .card-box__footer {
		width: 100%;
		height: 22px;
		line-height: 22px;
		position: absolute;
		bottom: 16px;
		left: 0;
		box-sizing: border-box;
		padding: 0 20px;
		font-size: 12px;
		font-weight: 400;
		color: #FFF;
		vertical-align: bottom;
	}
	.card-box .filter {
		opacity: 0.6;
	}
	.card-box .card-box__footer .card-box__footer__info {
		float: right;
		position: relative;
		bottom: 2.5px;
	}
	.card-box .card-box__footer .card-box__footer__info > span {
		opacity: 0.6;
	}
	.card-box .card-box__footer .card-box__footer__info .card-box__footer__info--white {
		position: relative;
		top: 1px;
		opacity: 1;
		font-size: 14px;
		font-weight: 700;
	}
	.card-box .card-box__footer .card-box__footer__info .card-box__footer__info__name {
		opacity: 1;
		font-size: 22px;
		font-family: 'Avenir Heavy';
		font-weight: 800;
	}
</style>
