<template>
	<div class="box-rolling" :style="calcHeight()">

		<div v-for="card in countingList">
			<div class="card-box" :style="ck_bgi_style">
				<div  class="card-box__header">
					<span class="dept-info">
						<img  :src="require('@/assets/img/public_stores_logo.jpeg')" alt="" class="card-box__header__face">
						<span class="card-box__header__name filter">{{stores_name}}</span>
					</span><span class="card-box__header__type">次数卡</span>
				</div>
				<div class="card-box__name">{{card.name}}</div>
				<div class="card-box__footer">
					<span class="filter">有效期：{{card.expiry_date || '永久有效'}}</span>

					<span class="card-box__footer__info" v-if="card.counting !== -1">
						<span>剩余</span>
						<span class="card-box__footer__info__name">
							<span >{{card.counting}}</span>
						</span>
						<span >次</span>
					</span>
					<span class="card-box__footer__info" v-else>
						<span class="card-box__footer__info__name" style="font-size: 16px">
							<span >无限次</span>
						</span>
					</span>


				</div>
			</div>

			<el-card class="right-card">
				<div>

					<div class="right-card-title">
						<div>适用内容</div>
						<div>剩余次数</div>
					</div>

					<div class="right-card-value" v-for="item in card.items">
						<div>{{item.name}}</div>
						<div>{{item.counting_info}}</div>
					</div>
				</div>
			</el-card>

		</div>
	</div>
</template>

<script>

    import publicApi from '@/service/public.js'

    export default {
        name: "SubCounting",
	    data() {
            return {
                stores_name: '',
                czk_bgi_style: {
                    backgroundImage:`url(${require('@/assets/img/czk_bgi.png')})`
                },
                ck_bgi_style: {
                    backgroundImage:`url(${require('@/assets/img/ck_bgi.png')})`
                },
	            countingList: []
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

            async customerCenterCounting(){
                try {
                    const res = await publicApi.customerCenterCounting(this.$route.params.openId);
                    if (res.status >= 200 && res.status < 300) {
                        this.stores_name = res.data.stores_name;
                        this.countingList = res.data.counting;
                        // this.countingList = this.countingList.concat(this.countingList);

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
            this.customerCenterCounting()
        }
    }
</script>

<style scoped>
	.box-rolling {
		overflow-y: auto;
		overflow-x: hidden;
	}
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

	.right-card{
		border-radius: 12px;
		margin-top: -40px;
		margin-bottom: 20px;
	}
	.right-card-title {
		display: flex;
		margin-top: 20px;
		justify-content: space-between;
		padding: 0 30px;
		font-weight: 500;
		font-size: 13px;
	}

	.right-card-value {
		display: flex;
		margin-top: 20px;
		justify-content: space-between;
		padding: 0 30px;
		font-size: 13px;
	}
</style>
