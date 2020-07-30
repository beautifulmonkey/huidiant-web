<template>
	<div class="main-box">
		<div class="from-box">
			<h4>欢迎使用</h4>
			<el-input type="text" placeholder="请输入您的手机号" v-model="tel" maxlength="11" ></el-input>

			<div class="input-box">
				<el-input type="text" placeholder="请输入验证码" v-model="vcode" maxlength="4" ></el-input>

				<el-button class="text" type="button" @click="sendCode" :disabled="disabledCode" v-if="disabledCode===false">发送验证码</el-button>
				<el-button class="text" type="button" @click="sendCode" :disabled="disabledCode" v-if="disabledCode===true">{{btntxt}}</el-button>
			</div>

			<el-button type="primary" class="bind-btn" :disabled="disabled" @click="bindSubmit">绑定</el-button>
		</div>
	</div>
</template>

<script>

    import customerApi from '@/service/customer.js'
    import authApi from '@/service/auth.js'

    export default {
        name: "BindPublic",
	    data() {
            return {
                tel: null,
                vcode: null,
	            issend: false,
                disabled: false,
                disabledCode: false,
                time: 0,
                btntxt: "重新发送",
            }
	    },
	    methods: {
            sendCode(){
                const tel = this.tel;
                if (this.disabled){
                    return
                }
                if (!tel){
                    return this.$message.error('请输入手机号');
                }
                if((/^1(3|4|5|6|7|8|9)\d{9}$/.test(tel)) == false){
                    return this.$message.error('请输入正确的手机号');
                }

                this.issend = true;
                this.time = 60;
                this.disabledCode = true;
                this.sendVerificationCode();
                this.timer();
            },
            //60S倒计时
            timer() {
                if (this.time > 0) {
                    this.time--;
                    this.btntxt = this.time + "秒重发";
                    setTimeout(this.timer, 1000);
                } else {
                    this.time = 0;
                    this.disabledCode = false;
                }
            },
            bindSubmit(){
                const tel = this.tel;
                const openId = this.$route.params.openId;
                const vcode = this.vcode;

                if (!tel){
                    return this.$message.error('请输入手机号');
                }
                if((/^1(3|4|5|6|7|8|9)\d{9}$/.test(tel)) == false){
                    return this.$message.error('请输入正确的手机号');
                }
                if(openId.length !== 28){
                    return this.$message.error('openId不合法!');
                }
                if (!this.issend){
                    return this.$message.error('您还未获取验证码!');
                }
                if (!this.issend){
                    return this.$message.error('您还未获取验证码!');
                }
                if (!vcode){
                    return this.$message.error('验证码不能为空!');
                }
                if (vcode.length !== 4){
                    return this.$message.error('验证码最少为4位!');
                }

                this.CustomerPubBind(tel, openId, vcode)
            },

            // 发送验证码
            async sendVerificationCode(){
                try {
                    const res = await authApi.sendVerificationCode(this.tel, 'wechat_bind');
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            message: '验证码发送成功',
                            type: 'success',
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '验证码发送失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },


            // 绑定公众号
            async CustomerPubBind(tel, openId, vcode){
                try {
                    const res = await customerApi.CustomerPubBind({
	                    tel: tel,
                        openId: openId,
                        verification_code: vcode
                    });
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            message: '绑定成功',
                            type: 'success',
                            duration: 0
                        });
                        this.disabled = true
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取客户来源失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

	    }
    }
</script>

<style scoped>
	.main-box{
		width: 100%;
		height: 100%;
		background-color: black;
		display: flex;
		justify-content: center;
	}
	.from-box{
		margin-top: 80px;
		width: 295px;
	}

	.from-box h4 {
		color: #fffefe;
	}

	/deep/ .el-input__inner{
		background: rgba(255,255,255,.1);
		border: 1px solid rgba(255,255,255,.3);;
		border-radius: 0px;
		margin-bottom: 10px;
		color: #fff;
	}
	/deep/ .el-input__inner:focus {
		border-color: #754edc;
		outline: 0;
	}

	.input-box {
		position: relative;
	}
	.input-box .text {
		display: inline-block;
		line-height: 18px;
		font-size: 11px;
		padding: 4px 15px;
		margin-bottom: 0;
		font-weight: 400;
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;
		cursor: pointer;
		user-select: none;
		-webkit-user-select: none;
		background-image: none;
		border: none;
		outline: 0;
		border-radius: 3px;
		box-sizing: border-box;
		width: 100px;
		height: 40px;
		font-size: 13px;
		border: none;
		background: 0 0;
		color: #b2b2b2;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
	}

	.text:before {
		content: '';
		display: block;
		width: 1px;
		height: 15px;
		margin: -8px 0 0;
		background: rgba(255,255,255,.5);
		position: absolute;
		top: 50%;
		left: 0;
	}


	.from-box /deep/ .bind-btn{
		background: linear-gradient(to right, #754edc, #8558FA);
		border: none;
		border-radius: 1px;
		margin-top: 15px;
		width: 100%;
	}


</style>
