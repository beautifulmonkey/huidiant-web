<template>
	<div class="sub-comp">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
			<el-form-item label="名称" prop="name">
				<el-input v-model="ruleForm.name" class="from-item-input" size="small"></el-input>
			</el-form-item>

			<el-form-item label="售价" prop="price">
				<el-input v-model="ruleForm.price" class="from-item-input" size="small">
					<template slot="prepend">￥</template>
				</el-input>
			</el-form-item>

			<el-form-item label="分类" prop="category_id">
				<el-select v-model="ruleForm.category_id" placeholder="选择服务分类" size="small" class="from-item-input">
					<el-option
						v-for="item in categoryList"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="标签" prop="tag_id_list">
				<el-select v-model="ruleForm.tag_id_list" multiple placeholder="选择服务标签" size="small" class="from-item-input">
					<el-option
						v-for="item in tagList"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="描述" prop="time">
				<el-input type="textarea" v-model="ruleForm.description"></el-input>
			</el-form-item>

			<el-form-item>
				<div style="float: left" v-if="this.$route.params.id">
					<el-button type="primary" @click="submitForm('ruleForm')" size="medium">保存</el-button>
				</div>
				<div style="float: left" v-else>
					<el-button type="primary" @click="submitForm('ruleForm')" size="medium">立即创建</el-button>
					<el-button @click="resetForm('ruleForm')" size="medium">重置</el-button>
				</div>
			</el-form-item>
		</el-form>
	</div>

</template>

<script>
    import categoryTagApi from '@/service/categoryTag.js'
    import serviceApi from '@/service/service.js'
    export default {
        name: "Edit",
        data() {
            return {
                categoryList: [],
                tagList: [],
                ruleForm: {
                    name: '',
                    category_id: '',
                    tag_id_list: [],
                    price: '',
                    description: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入服务名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请输入服务价格', trigger: 'blur' },
                        {
                            validator:(rule,value,callback)=>{
                                if(value != ""){
                                    if((/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/).test(value) == false){
                                        callback(new Error("服务售价格式不正确"));
                                    }else{
                                        callback();
                                    }
                                }else{
                                    callback();
                                }

                            },
                            trigger: 'blur'
                        }
                    ],
                    category_id: [
                        {required: true, message: '请选择分类', trigger: 'change' }
                    ],
                    tag_id_list: [
                        { type: 'array', required: true, message: '请至少选择一个标签', trigger: 'change' }
                    ]
                }

            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.$route.params.id){
                            this.updateService()
                        }else {
                            this.addService()
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            // 修改服务
            async updateService() {
                try {
                    const res = await serviceApi.updateService(this.$route.params.id, this.ruleForm);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '修改服务成功!',
                            offset: 60
                        })
                        this.$router.push("/goods/service")
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改服务失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 添加服务
            async addService() {
                try {
                    const res = await serviceApi.addService(this.ruleForm);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '添加服务成功!',
                            offset: 60
                        })
                        this.$router.push("/goods/service")
                    } else {
                        this.$message({
                            type: 'error',
                            message: '添加服务失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 获取分类
            async getCategoryList(){
                try {
                    const res = await categoryTagApi.getCategoryList(1);
                    if (res.status >= 200 && res.status < 300) {
                        this.categoryList = res.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取分类列表失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 获取标签
            async getTagList(){
                try {
                    const res = await categoryTagApi.getTagList(1);
                    if (res.status >= 200 && res.status < 300) {
                        this.tagList = res.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取标签列表失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            async getServiceOne(){
                try {
                    const res = await serviceApi.getServiceOne(this.$route.params.id)
                    if (res.status >= 200 && res.status < 300) {
                        this.ruleForm = res.data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取服务失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        },
        mounted() {
            this.getCategoryList();
            this.getTagList();
            if (this.$route.params.id){
                this.getServiceOne()
            }
        }
    }
</script>

<style scoped>

	.el-form-item {
		font-weight: 700
	}
	.el-input {
		width: 300px;
	}
	.el-select {
		width: 300px;
	}
	.el-textarea {
		width: 400px;
	}
	.sub-comp {
		margin-top: 40px;
	}
</style>
