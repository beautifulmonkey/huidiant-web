<template>
    <div>
        <div v-show="BtnShow">
            <el-button v-if="!this.$route.params.id" size="small" icon="el-icon-plus" type="primary" @click="btnClick(null)">添加客户</el-button>
            <el-button v-if="this.$route.params.id" type="text" @click="btnClick(null)">编辑</el-button>
        </div>

        <el-dialog title="客户基本信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" class="from-item-input" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <div style="float:left;">
                        <el-radio v-model="ruleForm.sex" :label="2"><i class="el-icon-male" style="color: #409df3"></i>男</el-radio>
                        <el-radio v-model="ruleForm.sex" :label="1"><i class="el-icon-female" style="color: #e6419c"></i>女</el-radio>
                    </div>
                </el-form-item>
                <el-form-item label="手机号" prop="tel">
                    <el-input type="text" placeholder="请输入内容" v-model="ruleForm.tel" class="from-item-input" size="mini"
                        maxlength="11" show-word-limit>
                    </el-input>

                </el-form-item>

                <el-form-item label="客户来源" prop="source">
                    <el-select v-model="ruleForm.source" placeholder="请选择" size="mini">
                        <el-option :key="null" label="选择客户来源" :value="null"></el-option>
                        <el-option
                                v-for="item in customerSourceList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                    <el-date-picker
                            v-model="ruleForm.birthday"
                            size="mini"
                            type="date"
                            value-format="timestamp"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="微信号" prop="wechat_id">
                    <el-input v-model="ruleForm.wechat_id" class="from-item-input" size="mini"></el-input>
                </el-form-item>

                <el-form-item label="地址" prop="address">
                    <el-input style="width: 300px;" v-model="ruleForm.address" type="textarea" class="from-item-input" size="mini"></el-input>
                </el-form-item>

                <el-form-item label="备注" prop="description">
                    <el-input style="width: 300px;" v-model="ruleForm.description" type="textarea" class="from-item-input" size="mini"></el-input>
                </el-form-item>

            </el-form>
            <br>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import customerApi from '@/service/customer.js'
    export default {
        name: "upSertCustomer",
        props: {
            BtnShow: {
                type: Boolean,
                default: true
            },
        },
        data() {
            return {
                dialogFormVisible: false,
                customerSourceList: [],
                ruleForm: {
                    name: null,
                    tel: null,
                    sex: 2,
                    birthday: null,
                    source: null,
                    address: null,
                    wechat_id: null,
                    description: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入客户姓名', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, trigger: 'blur' },
                    ],
                    tel: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        {
                            validator:(rule,value,callback)=>{
                                if(value != ""){
                                    if((/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) == false){
                                        callback(new Error("请输入正确的手机号"));
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
                }

            }
        },
        methods: {
            btnClick(query) {
                let tel = null;
                let name = null;
                if(parseInt(query)) {
                    tel = parseInt(query)
                }else {
                    name = query
                }
                this.ruleForm.name = name;
                this.ruleForm.tel = tel;
                this.ruleForm.sex = 2;
                this.ruleForm.birthday = null;
                this.ruleForm.source = null;
                this.ruleForm.address = null;
                this.ruleForm.wechat_id = null;
                this.ruleForm.description = '';
                this.getCustomerOne();
                this.getCustomerSourceList();
                this.dialogFormVisible = true
            },

            // 保存客户
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.$route.params.id){
                            // 路由有客户id为修改
                            this.updateCustomer()
                        }else {
                            // 路由无id为添加
                            this.addCustomer()
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            // 添加客户
            async addCustomer() {
                try {
                    const res = await customerApi.addCustomer(this.ruleForm);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '添加客户成功!',
                            offset: 60
                        })
                        this.dialogFormVisible = false
                        this.$emit('data-save');
                    } else {
                        this.$message({
                            type: 'error',
                            message: '添加客户失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 修改客户
            async updateCustomer() {
                try {
                    const res = await customerApi.updateCustomer(this.$route.params.id, this.ruleForm);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '修改成功!',
                            offset: 60
                        })
                        this.dialogFormVisible = false
                        this.$emit('data-save');
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

                // 获取单个客户
            async getCustomerOne(){
                if (!this.$route.params.id){
                    return
                }
                try {
                    const res = await customerApi.getCustomerOne(this.$route.params.id);
                    if (res.status >= 200 && res.status < 300) {
                        this.ruleForm = res.data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取客户失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 获取客户来源列表
            async getCustomerSourceList(){
                try {
                    const res = await customerApi.getCustomerSourceList();
                    if (res.status >= 200 && res.status < 300) {
                        this.customerSourceList = res.data;
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
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .el-input {
        width: 200px;
        /*float: left;*/
    }

    .el-form-item div{
        float: left;
    }

</style>
