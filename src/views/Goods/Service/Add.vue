<template>
    <div>


        <div class="m-wrap-8">
            <el-page-header @back="$router.push('/goods/service')" content="添加服务"></el-page-header>
        </div>

        <div class="m-wrap-from" style="width: 40%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="ruleForm.name" class="from-item-input"></el-input>
                </el-form-item>

                <el-form-item label="售价" prop="name">
                    <el-input v-model="ruleForm.name" class="from-item-input"></el-input>
                </el-form-item>

                <el-form-item label="分类" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域"  class="from-item-input">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="标签" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域" class="from-item-input">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="服务时长" prop="time">
                    <el-select v-model="ruleForm.time" placeholder="请选择活动区域" class="from-item-input">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>


<!--                todo: 保存时关闭当前标签页-->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>        </div>

    </div>
</template>

<script>
    export default {
        name: "Add",
        data() {
            return {
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    time: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped>

    .m-wrap-from {
        margin: 64px;
    }
    .m-wrap-8 {
        margin: 8px;
    }
    /*.from-item-input {*/
    /*    width: 200px;*/
    /*}*/
    .p-wrap-16-top {
        padding-top: 16px;
    }
</style>
