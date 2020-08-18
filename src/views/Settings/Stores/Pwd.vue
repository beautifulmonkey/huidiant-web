<template>
	<div class="m-wrap-16">
		<div class="title">修改密码</div>

		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="m-wrap-from">
			<el-form-item label="当前密码" prop="old_pwd">
				<el-input type="password" v-model="ruleForm.old_pwd" class="from-item-input" size="small"></el-input>
			</el-form-item>

			<el-form-item label="新密码" prop="new_pwd">
				<el-input type="password" v-model="ruleForm.new_pwd" class="from-item-input" size="small"></el-input>
			</el-form-item>

			<el-form-item label="确认密码" prop="check_pwd">
				<el-input type="password" v-model="ruleForm.check_pwd" class="from-item-input" size="small"></el-input>
			</el-form-item>

			<el-form-item>
				<div style="float: left">
					<el-button type="primary" @click="submitForm('ruleForm')" size="medium">确定修改</el-button>
				</div>
			</el-form-item>
		</el-form>

	</div>
</template>

<script>

    import authApi from '@/service/auth.js'

    export default {
        name: "Pwd",
	    data(){
            return {
                ruleForm: {
                    old_pwd: null,
	                new_pwd: null,
                    check_pwd: null
                },
                rules: {
                    old_pwd: [
                        { required: true, message: '请输入当前密码', trigger: 'blur' },
                    ],
                    new_pwd: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                        // { min: 6, max: 25, message: '6-25位的字母或数字', trigger: 'blur' },
                        {
                            validator:(rule,value,callback)=>{
                                if((/^[0-9A-Za-z]{6,25}$/).test(value) == false){
                                    callback(new Error("输入6-25位的字母或数字"));
                                }else{
                                    callback();
                                }
                            },
                            trigger: 'blur'
                        }
                    ],
                    check_pwd: [
                        { required: true, message: '请输入确认密码', trigger: 'blur' },
                        {
                            validator:(rule,value,callback)=>{
                                if(value != this.ruleForm.new_pwd){
                                    callback(new Error("确认密码和第一次不相同"));
                                }else{
                                    callback();
                                }
                            },
                            trigger: 'blur'
                        }
                    ],
                }
            }
	    },
	    methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.changePassword()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            async changePassword(){
                try {
                    const res = await authApi.changePassword({
                        old_password: this.ruleForm.old_pwd,
                        new_password: this.ruleForm.new_pwd
                    });
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '修改密码成功! 正在重新登录...'
                        });

                        setTimeout(() => {
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('userInfo');
                            localStorage.removeItem('skin');
                            this.$router.push("/login")
                        }, 2000);

                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改密码失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            }
	    }
    }
</script>

<style scoped>
	.title{
		background: #f8f8f8;
		height: 24px;
		padding: 12px 16px;
		font-family: PingFangSC-Semibold Helvetica,Arial,Verdana,Tahoma,sans-serif;
		color: #323232;
		letter-spacing: 0;
		line-height: 24px;
		position: relative;
		margin-bottom: 20px;
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
	.m-wrap-16 {
		margin: 7px;
		margin-bottom: 20px;
		padding: 24px;
		background: #fff;
		text-align: left;
	}

	.el-input {
		width: 200px;
	}
</style>
