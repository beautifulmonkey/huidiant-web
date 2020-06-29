<template>
	<div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="m-wrap-from">
			<el-form-item label="名称" prop="name">
				<el-input v-model="ruleForm.name" class="from-item-input" size="mini"></el-input>
			</el-form-item>

			<el-form-item label="售价" prop="price">
				<el-input v-model="ruleForm.price" class="from-item-input" size="mini">
					<template slot="prepend">￥</template>
				</el-input>
			</el-form-item>

			<el-form-item label="分类" prop="category_id">
				<el-select v-model="ruleForm.category_id" placeholder="选择产品分类" size="mini" class="from-item-input">
					<el-option
						v-for="item in categoryList"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="标签" prop="tag_id_list">
				<el-select v-model="ruleForm.tag_id_list" multiple placeholder="选择产品标签" size="mini" class="from-item-input">
					<el-option
						v-for="item in tagList"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="单位" prop="unit">
				<el-select v-model="ruleForm.unit" filterable placeholder="选择单位" size="mini" class="from-item-input">
					<el-option
						v-for="item in unitList"
						:key="item"
						:label="item"
						:value="item">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="描述" prop="time">
				<el-input type="textarea" v-model="ruleForm.description"></el-input>
			</el-form-item>


			<!--                todo: 保存时关闭当前标签页-->
			<el-form-item>
				<div style="float: left" v-if="this.$route.params.id">
					<el-button type="primary" @click="submitForm('ruleForm')" size="mini">保存</el-button>
				</div>
				<div style="float: left" v-else>
					<el-button type="primary" @click="submitForm('ruleForm')" size="mini">立即创建</el-button>
					<el-button @click="resetForm('ruleForm')" size="mini">重置</el-button>
				</div>
			</el-form-item>
		</el-form>
	</div>

</template>

<script>
    import categoryTagApi from '@/service/categoryTag.js'
    import productApi from '@/service/product.js'

    export default {
        name: "Edit",
        data() {
            return {
                unitList: ["个","只","瓶","盒","袋","片","桶","件","包","套","对","张","本","条","根","箱"],
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
                        { required: true, message: '请输入产品名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请输入产品价格', trigger: 'blur' },
                        {
                            validator:(rule,value,callback)=>{
                                if(value != ""){
                                    if((/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/).test(value) == false){
                                        callback(new Error("产品售价格式不正确"));
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
                    unit: [
                        {required: true, message: '请选择单位', trigger: 'change' }
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
                            this.updateProduct()
                        }else {
                            this.addProduct()
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

	        // 修改产品
            async updateProduct() {
                try {
                    const res = await productApi.updateProduct(this.$route.params.id, this.ruleForm);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '修改产品成功!',
                            offset: 60
                        })
                        this.$router.push("/goods/product")
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改产品失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 添加产品
            async addProduct() {
                try {
                    const res = await productApi.addProduct(this.ruleForm);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '添加产品成功!',
                            offset: 60
                        })
                        this.$router.push("/goods/product")
                    } else {
                        this.$message({
                            type: 'error',
                            message: '添加产品失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 获取分类
            async getCategoryList(){
                try {
                    const res = await categoryTagApi.getCategoryList(2);
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
                    const res = await categoryTagApi.getTagList(2);
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

            async getProductOne(){
                try {
                    const res = await productApi.getProductOne(this.$route.params.id)
                    if (res.status >= 200 && res.status < 300) {
                        this.ruleForm = res.data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取产品失败!'
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
            if (this.$route.params.id) {
                this.getProductOne()
            }
        }
    }
</script>

<style scoped>
	.from-item-input {
		/*width: 400px;*/
		width: 100%;
	}
	.el-form-item {
		font-weight: 700
	}
	.m-wrap-8 {
		margin: 8px;
	}

	.m-wrap-from {
		margin: 40px;
	}
</style>
