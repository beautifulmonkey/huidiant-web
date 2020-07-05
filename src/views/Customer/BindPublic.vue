<template>
	<div class="main-box">
		<div class="from-box">
			<h4>欢迎使用</h4>
			<el-input type="text" placeholder="请输入您的手机号" v-model="tel" maxlength="11" ></el-input>
			<el-button type="primary" class="bind-btn" :disabled="disabled" @click="bindSubmit">绑定</el-button>
		</div>
	</div>
</template>

<script>

    import customerApi from '@/service/customer.js'

    export default {
        name: "BindPublic",
	    data() {
            return {
                tel: null,
                disabled: false
            }
	    },
	    methods: {
            bindSubmit(){
                const tel = this.tel;
                const openId = this.$route.params.openId;
                if (!tel){
                    this.$message.error('请输入手机号');
                    return
                }
                if((/^1(3|4|5|6|7|8|9)\d{9}$/.test(tel)) == false){
                    this.$message.error('请输入正确的手机号');
                    return
                }
                if(openId.length !== 28){
                    this.$message.error('openId不合法!');
                    return
                }

                this.CustomerPubBind(tel, openId)
            },



            // 绑定公众号
            async CustomerPubBind(tel, openId){
                try {
                    const res = await customerApi.CustomerPubBind({
	                    tel: tel,
                        openId: openId
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

	.bind-btn {
		margin-top: 25px;
		width: 100%;
	}


	/deep/ .el-input__inner{
		background: rgba(255,255,255,.1);
		border: 1px solid #cc2817;
		border-radius: 0px;
	}


	.from-box /deep/ .el-button{
		background: linear-gradient(to right,#cd203d,#ff617c);
		border: none;
		border-radius: 1px;
	}


</style>
