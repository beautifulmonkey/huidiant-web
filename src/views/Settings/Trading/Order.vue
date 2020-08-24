<template>
	<div class="m-wrap-16">

		<div class="_2Mis2rBbK_zPYBCfB921_W">
			<div class="setting-cashier-setting-row ui-title">
				<span class="setting-cashier-setting-label">
					抹零
					<span class="setting-cashier-setting-tip">开启后，开单收款时订单合计金额如不为整数，则抹除角分金额</span>
				</span>
				<div class="g-group">
					<el-switch name="moling" @change="switchChangeMoling" v-model="moling"></el-switch>
				</div>
			</div>
		</div>


		<div class="_2Mis2rBbK_zPYBCfB921_W">
			<div class="setting-cashier-setting-row ui-title">
				<span class="setting-cashier-setting-label">
					手动改价
					<span class="setting-cashier-setting-tip">开启后，开单时可修改商品价格</span>
				</span>
				<div class="g-group">
					<el-switch name="gaijia" @change="switchChangeGaijia" v-model="gaijia"></el-switch>
				</div>
			</div>
		</div>

		<div class="_2Mis2rBbK_zPYBCfB921_W">
			<div class="setting-cashier-setting-row ui-title">
				<span class="setting-cashier-setting-label">
					升卡
					<span class="setting-cashier-setting-tip">开启后，会员充值卡可升级为更高面值的充值卡</span>
				</span>
				<div class="g-group">
					<el-switch name="shengka" @change="switchChangeShengka" v-model="shengka"></el-switch>
				</div>
			</div>
		</div>


	</div>
</template>

<script>
    import storeSettingApi from '@/service/storeSetting.js'

    export default {
        name: "Order",
	    data(){
            return {
                moling: false,
                gaijia: false,
                shengka: false,
            }
	    },
	    methods: {
            switchChangeMoling(status){
                this.updateOrderConfig("moling", status)
            },
            switchChangeGaijia(status){
                this.updateOrderConfig("gaijia", status)
            },
            switchChangeShengka(status){
                this.updateOrderConfig("shengka", status)
            },

            async getOrderConfig(){
                try {
                    const res = await storeSettingApi.getOrderConfig();
                    if (res.status >= 200 && res.status < 300) {
                        this.moling = Boolean(res.data.moling);
                        this.gaijia = Boolean(res.data.gaijia);
                        this.shengka = Boolean(res.data.shengka);
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            async updateOrderConfig(key, status){
                try {
                    const res = await storeSettingApi.updateOrderConfig(key, Number(status));
                    if (res.status >= 200 && res.status < 300) {

                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            }


        },
	    mounted() {
            this.getOrderConfig()
        }
    }
</script>

<style scoped>
	.m-wrap-16 {
		margin: 7px;
		margin-bottom: 20px;
		padding: 24px;
		background: #fff;
		text-align: left;
	}

	._2Mis2rBbK_zPYBCfB921_W .setting-cashier-setting-row {
		height: 50px;
		line-height: 50px;
		color: #000;
		padding: 0 18px 0 20px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		margin-bottom: 16px;
	}
	.ui-title {
		height: 48px;
		line-height: 48px;
		background: #f7f8fa;
		font-size: 16px;
		font-weight: 400;
		position: relative;
		padding: 0 16px;
	}
	.ui-title:before {
		content: "";
		position: absolute;
		width: 4px;
		height: 16px;
		left: 6px;
		top: 16px;
		background: #8558fa
	}
	._2Mis2rBbK_zPYBCfB921_W .setting-cashier-setting-label {
		font-size: 16px;
		font-weight: 400;
	}
	._2Mis2rBbK_zPYBCfB921_W .setting-cashier-setting-tip {
		color: #969799;
		height: 18px;
		line-height: 18px;
		margin-left: 18px;
		display: inline-block;
		font-size: 12px;
	}
	.g-group {
		display: -webkit-inline-box;
		display: -ms-inline-flexbox;
		display: inline-flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}

</style>
