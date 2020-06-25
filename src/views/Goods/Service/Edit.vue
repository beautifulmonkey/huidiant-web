<template>
    <div style="width: 40%">

        <div class="m-wrap-8">
            <el-page-header @back="$router.push('/goods/service')" content="编辑产品"></el-page-header>
        </div>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名称" prop="name">
                <el-input v-model="ruleForm.name" class="from-item-input" size="mini"></el-input>
            </el-form-item>

            <el-form-item label="售价" prop="price">
                <el-input v-model="ruleForm.price" class="from-item-input" size="mini">
                    <template slot="prepend">￥</template>
                </el-input>
            </el-form-item>

            <el-form-item label="分类" prop="category_id">
                <el-select v-model="ruleForm.category_id" placeholder="选择服务分类" size="mini" class="from-item-input">
                    <el-option
                            v-for="item in categoryList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="标签" prop="tag_id_list">
                <el-select v-model="ruleForm.tag_id_list" multiple placeholder="选择服务标签" size="mini" class="from-item-input">
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


            <!--                todo: 保存时关闭当前标签页-->
            <el-form-item>
                <div style="float: left">
                    <el-button type="primary" @click="submitForm('ruleForm')" size="mini">保存</el-button>
<!--                    <el-button @click="resetForm('ruleForm')" size="mini">重置</el-button>-->
                </div>
            </el-form-item>
        </el-form>        </div>

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
                        this.updateService()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
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
            this.getTagList()
            this.getServiceOne()
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
