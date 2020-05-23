<template>
    <div>
        <div class="m-wrap-8">
            <el-page-header @back="$router.push('/goods/card')" content="添加次卡"></el-page-header>
        </div>


        <div class="m-wrap-from" style="width: 40%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                <el-form-item>
                    <!--            todo: 如何做成有赞的效果?-->
                    <el-radio-group v-model="ruleForm.counting_card_type" style="float: left">
                        <el-radio-button label="1">有限次卡</el-radio-button>
                        <el-radio-button label="2">不限次卡</el-radio-button>
                        <el-radio-button label="3">通卡</el-radio-button>
                    </el-radio-group><br>

                    <div style="text-align: left; font-size: 80%;color: #666; line-height: 20px;">
                        <span v-if="ruleForm.counting_card_type==='1'">有限次卡: 支持创建多个服务集合有限次数的次卡</span>
                        <span v-if="ruleForm.counting_card_type==='2'">不限次卡: 支持创建多个服务集合且不限次数的次卡，月卡、年卡等</span>
                        <span v-if="ruleForm.counting_card_type==='3'">通卡: 设定一个总次数，会员可在次数内消费卡中任意项目</span>
                    </div>
                </el-form-item>

                <el-form-item label="名称" prop="name">
                    <el-input v-model="ruleForm.name" class="from-item-input" size="mini"></el-input>
                </el-form-item>

                <el-form-item label="售价" prop="price">
                    <el-input v-model="ruleForm.price" class="from-item-input" size="mini">
                        <template slot="prepend">￥</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="权益" prop="rule" style="width: 100vh;">
                    <service-choose-component @return-value="setRights"></service-choose-component>
                    <el-table
                            v-if="this.ruleForm.rule.service.length"
                            size="mini"
                            :data="ruleForm.rule.service">
                        <el-table-column
                                prop="name"
                                label="已选服务"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                label="次数">
                            <template slot-scope="scope">
                                <el-input style="width: 20vh" size="mini" v-if="ruleForm.counting_card_type==='1'" v-model="scope.row.count"></el-input>
                                <el-input style="width: 20vh" size="mini" v-if="ruleForm.counting_card_type==='2'" disabled value="无限次"></el-input>
                                <span v-if="ruleForm.counting_card_type==='3'">-</span>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div style="text-align: left">
                        <span v-if="ruleForm.counting_card_type==='3'&&ruleForm.rule.service.length>0" >以上{{ruleForm.rule.service.length}}个服务总次数： 共
                            <el-input style="width: 50px;" size="mini" v-model="ruleForm.rule.count"></el-input> 次
                            <span style="font-size: 80%;color: #646566">每次划卡时可以从以上项目中任选一个，并划扣总次数1次</span>
                        </span>
                    </div>

                </el-form-item>

                <el-form-item label="有效时间" prop="valid_days">
                    <el-radio-group v-model="valid_days_type">
                        <el-radio label="-1" >永久有效</el-radio>
                        <el-radio label="1">
                            <el-input v-model="ruleForm.valid_days" size="mini" :disabled="valid_days_type==='-1'">
                                <template slot="append">天</template>
                            </el-input>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" v-model="ruleForm.description"></el-input>
                </el-form-item>

                <el-form-item>
                    <div style="float: left">
                        <el-button type="primary" @click="countingSubmitForm('ruleForm')" size="mini">立即创建</el-button>
<!--                        <el-button @click="resetForm('ruleForm')" size="mini">重置</el-button>-->
                    </div>
                </el-form-item>

            </el-form>
        </div>

    </div>
</template>

<script>
    import serviceChooseComponent from '@/views/Goods/servcieChoose.vue'
    import cardApi from '@/service/card.js'

    export default {
        name: "Numbers",
        components: {
            serviceChooseComponent
        },
        data () {
            return {
                valid_days_type: "-1",
                ruleForm: {
                    counting_card_type: '1',
                    type: 2,
                    name: '',
                    price: null,
                    valid_days: null,
                    description: '',
                    rule: {'service':[]}
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请输入售价', trigger: 'blur' },
                        {
                            validator:(rule,value,callback)=>{
                                if(value != ""){
                                    if((/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/).test(value) == false){
                                        callback(new Error("售价为数字且不能小于0"));
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
                    rule: [
                        {
                            validator:(rule,value,callback)=>{
                                let frule = this.ruleForm.rule;
                                if(!frule.service.length){
                                    callback(new Error("至少添加一项卡权益"));
                                }else if (frule.service.length){

                                    if(this.ruleForm.counting_card_type==='1'){
                                        frule.service.forEach((item,index,array)=>{
                                            if(!item.count){
                                                callback(new Error("次数不能为空!"));
                                            }
                                        });
                                    }else if(this.ruleForm.counting_card_type==='3' && !frule.count){
                                        callback(new Error("次数不能为空!"));
                                    }
                                    callback();
                                }else{
                                    callback();
                                }

                            },
                            trigger: 'blur',
                            required: true
                        }
                    ],
                    valid_days: [
                        {
                            validator:(rule,value,callback)=>{
                                if(this.valid_days_type !== '-1'){
                                    if((/^(([1-9]{1}\d*)|(0{1}))?$/).test(value) == false || value>3650){
                                        callback(new Error("有效时间需为大于0，小于3650的整数"));
                                    }else{
                                        callback();
                                    }
                                }else{
                                    callback();
                                }

                            },
                            trigger: 'blur',
                            required: true
                        }
                    ]
                },
            }
        },
        methods: {
            setRights(val){
                this.ruleForm.rule.service = [];
                val.forEach((item,index,array)=>{
                    let tab = this.ruleForm.rule.service.filter(itemone => itemone.service_id === item.id)
                    if (tab.length === 0) {
                        this.ruleForm.rule.service.push({
                            service_id: item.id,
                            name: item.name
                        })
                    }
                });
            },

            // 添加次卡
            async addCountingCard() {
                try {
                    const res = await cardApi.addCard(this.ruleForm);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '添加次卡成功!',
                            offset: 60
                        });
                        this.$router.push("/goods/card")
                    } else {
                        this.$message({
                            type: 'error',
                            message: '添加次卡失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 立即创建
            countingSubmitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    debugger
                    if (valid) {
                        this.ruleForm.rule.service.forEach((right_item,index,array)=>{
                            if (this.ruleForm.counting_card_type!=='1'){
                                delete right_item.count
                            }else {
                                right_item.count = parseInt(right_item.count)
                            }
                        });
                        if (this.ruleForm.counting_card_type!=='3'){
                            delete this.ruleForm.rule.count
                        }else {
                            this.ruleForm.rule.count = parseInt(this.ruleForm.rule.count)
                        }

                        if (this.valid_days_type === '-1'){
                            this.ruleForm.valid_days = -1
                        }
                        console.log(this.ruleForm)
                        this.addCountingCard()
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .m-wrap-8 {
        margin: 8px;
    }
    .m-wrap-from {
        margin: 40px;
    }
    .el-form-item {
        font-weight: 700
    }
    .from-item-input {
        /*width: 400px;*/
        width: 100%;
    }

</style>
