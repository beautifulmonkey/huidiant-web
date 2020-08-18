<template>
	<div>
		<div class="m-wrap-16">

			<div class="title">
				<span>自动入会设置</span>
				<span class="sub">客户通过消费以下项目, 系统自动升级为会员</span>
			</div>

			<div style="display: flex; margin-top: 20px;">
				<div style="width: 150px;text-align: right">自动入会设置：</div>
				<div>
					<div class="radio-items"><el-radio v-model="FormData.type" :label=0>不使用自动入会功能</el-radio></div>

					<div class="radio-items">
						<el-radio v-model="FormData.type" :label=1>办理指定卡类型</el-radio>
						<el-checkbox-group v-model="FormData.card_type_list" style="margin-left: 30px;" v-if="FormData.type===1">
							<el-checkbox label="prepaid_card">充值卡</el-checkbox><br>
							<el-checkbox label="counting_card">次卡</el-checkbox>
						</el-checkbox-group>
					</div>

					<el-button type="primary" plain @click="submit" size="small">保存</el-button>

				</div>
			</div>


		</div>
	</div>
</template>

<script>

    import storeSettingApi from '@/service/storeSetting.js'

    export default {
        name: "Vip",
	    data () {
            return {

	            FormData: {
                    type: '',
                    card_type_list: []
	            }
            }
	    },
	    methods: {
            // 保存
            submit (){
                if (this.FormData.type ===1){
                    if(!this.FormData.card_type_list.length){
                        this.$message.error('至少选择一个卡类型!');
						return
                    }
                }
                this.setAutoVipSetting()
            },

            // 获取入会配置详情
            async setAutoVipSetting(){
                try {
                    const res = await storeSettingApi.setAutoVipSetting(this.FormData);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '规则设置成功!',
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取数据失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }

                this.getAutoVipSetting()
            },

            // 获取入会配置详情
            async getAutoVipSetting(){
                try {
                    const res = await storeSettingApi.getAutoVipSetting();
                    if (res.status >= 200 && res.status < 300) {
                        this.FormData = res.data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取数据失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            }
	    },
        mounted() {
            this.getAutoVipSetting();
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
		height: 100%;
	}

	.title{
		background: #f8f8f8;
		height: 24px;
		padding: 12px 16px;
		font-family: PingFangSC-Semibold Helvetica,Arial,Verdana,Tahoma,sans-serif;
		color: #323232;
		letter-spacing: 0;
		line-height: 24px;
		position: relative;
	}

	.title:after{
		content: "";
		position: absolute;
		left: 6px;
		top: 16px;
		width: 4px;
		height: 16px;
		background: #8558fa;
	}

	.sub {
		font-size: 12px;
		color: #646566;
		margin-left: 30px;
	}

	.radio-items {
		margin-bottom: 20px;
		margin-left: 10px;
	}
</style>
