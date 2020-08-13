<template>
	<div>
		<div class="store-info">
			<div class="logo">
				<img :src="require('@/assets/img/public_stores_logo.jpeg')">
			</div>
			<span style="font-size: 12px;">才子造型</span>
		</div>

		<div>
			<div class="card-bg" :style="cardBgStyle">
				<div class="head-wrap">
					<div class="avatar-wrap">
						<img :src="require('@/assets/img/user_smile.png')" class="avatar">
						<i class="el-icon-male sex-icon" style="color: #409df3"></i>
					</div>

					<div class="info-wrap flex-item">
						<div class="username">李运峰</div>
						<div class="version">
							<img :src="require('@/assets/img/public_level.png')" class="ver-icon">
							<div class="version-text is-levelundefined">才子造型金卡</div>
						</div>
					</div>
				</div>
				<div class="member-num-wrap"><span>NO.17610162918</span></div>
			</div>

			<div class="level-info-wrap">
				<div class="level-text">
					尊享更多等级权益
				</div>
				<div class="level-btn" @click="redirect('prepaid')">
					了解详情
				</div>
			</div>
		</div>

		<div>
			<div class="card-info">
				<el-card v-for="item in vip_card" @click.native="redirect(item.menu)">
					<div class="vip-card-box">
						<svg-icon :icon-class="item.icon" style="font-size: 35px;color: #fbae11" />
						<div style="margin-left: 10px;">
							<span style="font-size: 12px;color: #555555">{{item.name}}</span><br>
							<span style="font-weight: 500;">{{item.val}}</span>
						</div>
					</div>
				</el-card>
			</div>

		</div>

	</div>
</template>

<script>
    export default {
        name: "SubMe",
	    data(){
            return {
                cardBgStyle: {
                    "background": "url(" + require('@/assets/img/public_me.jpg') +  ") center center / cover no-repeat"
                },
	            vip_card: [
                    {icon: "dashboard_wallet", name: "余额", menu: "prepaid", val: 0},
                    {icon: "dashboard_card", name: "套餐", menu: "counting", val: 2}
	            ],
            }
	    },
	    methods:{
            redirect(menu){
                this.$emit('redirect', menu)
            }
	    }
    }
</script>

<style scoped>

	.card-bg{
		width: 100%;
		height: 140px;
		/*position: absolute;*/
		position: relative;
		z-index: 111;
		border-radius: 10px;
	}

	.level-info-wrap{
		width: 100%;
		height: 50px;
		background: linear-gradient(90deg,#dca87b,#e4c29f);
		margin-top: -15px;
		z-index: 11;
		border-radius: 10px;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}
	.store-info{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		height: 37px;
		color: #000;
	}
	.store-info .logo{
		margin-right: 10px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: 1px solid #b2b2b2;
		background: #fff;
		display: inline-block;
		overflow: hidden;
	}

	.store-info .logo img {
		width: 100%;
		height: 100%;
		vertical-align: unset;
	}

	.card-info {
		display: flex;
		margin-top: 20px;
		justify-content: space-between
	}
	.card-info div{
		/*height: 70px;*/
		width: 48%
	}
	.card-func {
		margin-top: 20px;
	}


	.head-wrap {
		display: flex;
		position: absolute;
		top: 20px;
		left: 20px;
	}
	.avatar-wrap{
		position: relative;
		width: 40px;
		height: 40px;
	}
	.avatar{
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: #fff;
		display: inline-block;
	}
	.sex-icon{
		position: absolute;
		z-index: 1;
		right: -8px;
		bottom: -8px;
		display: block;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: #fff;
		font-size: 23px;
		text-align: center;
		line-height: 32px;
		-webkit-transform: scale(.5);
		transform: scale(.5);
	}

	.info-wrap{
		display: inline-block;
		padding-left: 1em;
	}
	/*.flex-item {*/
	/*	-webkit-box-flex: 1;*/
	/*	-ms-flex: 1 0 0px;*/
	/*	flex: 1 0 0;*/
	/*}*/
	.username {
		color: #fdebd9;
		font-weight: 700;
		line-height: 1em;
	}

	.version{
		margin-top: 8px;
		line-height: 1;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.version-text {
		display: block;
		z-index: 1;
		min-width: 66px;
		font-weight: 700;
		padding-left: 12px;
		padding-right: 8px;
		font-size: 12px;
		color: #fafafa;
		border-radius: 0 6px 6px 0;
		margin-left: -9px;
		height: 16px;
		line-height: 16px;
		background-color: #fbae11;
		-webkit-transform: scale(.82) translate(-9%);
		transform: scale(.82) translate(-9%);
	}
	.ver-icon{
		display: block;
		width: 19px;
		height: 16px;
		z-index: 2;
	}

	.member-num-wrap {
		position: absolute;
		bottom: 20px;
		left: 20px;
		font-size: 14px;
		font-weight: 700;
		line-height: 1;
		color: #fdebd9;
	}

	.level-text {
		font-size: 13px;
		color: #26201d;
		font-weight: 700;
		margin:10px;
	}

	.level-btn {
		width: 72px;
		height: 23px;
		line-height: 23px;
		background: #221c19;
		color: #ffedda;
		border-radius: 12px;
		padding: 0;
		margin: 8px;
		font-size: 12px;
		text-align: center;
	}
	/deep/ .el-card__body {
		padding: 15px 20px;
	}

	.vip-card-box {
		display: flex;
		width: 100%;
		align-items: center
	}
</style>
