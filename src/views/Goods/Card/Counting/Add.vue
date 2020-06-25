<template>
    <div>
        <div class="m-wrap-8">
            <el-page-header @back="$router.push('/goods/card')" content="添加次卡"></el-page-header>
        </div>

        <div style="display: flex;margin-left: 50px; margin-top: 30px;">
            <label class="zent-radio-wrap" @click="ruleForm.counting_card_type='1'"
                   :style="{'--color': themeColor}"
                   v-bind:class="{ 'zent-radio-checked': ruleForm.counting_card_type==='1'}">
                <span>
                    <div class="title">有限次卡</div>
                    <p class="desc">支持创建多个服务集合有限次数的次卡</p>

                    <div v-if="ruleForm.counting_card_type==='1'">
							<svg-icon slot="reference" icon-class="check_mark" class="icon" :style="{'--color': themeColor}"/>
                    </div>

                </span>
            </label>


            <label class="zent-radio-wrap" @click="ruleForm.counting_card_type='2'"
                   :style="{'--color': themeColor}"
                   v-bind:class="{ 'zent-radio-checked': ruleForm.counting_card_type==='2'}">
                <span>
                    <div class="title">不限次卡</div>
                    <p class="desc">支持创建多个服务集合且不限次数的次卡，月卡、年卡等</p>

                    <div v-if="ruleForm.counting_card_type==='2'">
							<svg-icon slot="reference" icon-class="check_mark" class="icon" :style="{'--color': themeColor}"/>
                    </div>
                </span>
            </label>

            <label class="zent-radio-wrap" @click="ruleForm.counting_card_type='3'"
                   :style="{'--color': themeColor}"
                   v-bind:class="{ 'zent-radio-checked': ruleForm.counting_card_type==='3'}">
                <span>
                    <div class="title">通卡</div>
                    <p class="desc">设定一个总次数，会员可在次数内消费卡中任意项目</p>

                    <div v-if="ruleForm.counting_card_type==='3'">
                        <svg-icon slot="reference" icon-class="check_mark" class="icon" :style="{'--color': themeColor}"/>
                    </div>
                </span>
            </label>
        </div>

        <div class="m-wrap-from" style="width: 40%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                <el-form-item label="名称" prop="name">
                    <el-input v-model="ruleForm.name" class="from-item-input" size="mini"></el-input>
                </el-form-item>

                <el-form-item label="售价" prop="price">
                    <div class="item-align-center">
                        <el-input v-model="ruleForm.price" class="from-item-input" size="mini">
                            <template slot="prepend">￥</template>
                        </el-input>
                    </div>
                </el-form-item>

                <el-form-item label="权益" prop="rule" style="width: 100vh;">
                    <service-choose-component @return-value="setRights"></service-choose-component>
                    <el-table
                            border
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

<!--                    <div style="text-align: left">-->
<!--                        <span v-if="ruleForm.counting_card_type==='3'&&ruleForm.rule.service.length>0" >以上{{ruleForm.rule.service.length}}个服务总次数： 共-->
<!--                            <el-input style="width: 50px;" size="mini" v-model="ruleForm.rule.count"></el-input> 次-->
<!--                            <span style="font-size: 80%;color: #646566">每次划卡时可以从以上项目中任选一个，并划扣总次数1次</span>-->
<!--                        </span>-->
<!--                    </div>-->


                    <div style="text-align: left;margin-top: 10px" class="batch-box"
                         v-if="ruleForm.counting_card_type==='3'&&ruleForm.rule.service.length>0" >
                        <span class="set-span">以上{{ruleForm.rule.service.length}}个服务总次数：</span>
                        <span class="batch-input"><span>共&nbsp;</span>
                            <el-input style="width: 50px;" size="mini" v-model="ruleForm.rule.count"></el-input>
                            <span>&nbsp;次</span></span>
                        <span class="input-tip">&nbsp;每次划卡时可以从以上项目中任选一个，并划扣总次数1次</span>
                    </div>

                </el-form-item>

                <el-form-item label="有效时间" prop="valid_days">
                    <div class="item-align-center" style="width: 300px">
                        <el-radio-group v-model="valid_days_type" @change="ruleForm.valid_days=null">
                            <el-radio label="-1" >永久有效</el-radio>
                            <el-radio label="1">&nbsp;</el-radio>
                        </el-radio-group>
                        <el-input style="width: 150px;" v-model="ruleForm.valid_days" size="mini" :disabled="valid_days_type==='-1'">
                            <template slot="append">天</template>
                        </el-input>
                    </div>
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
    import {mapState} from "vuex";

    export default {
        name: "Numbers",
        components: {
            serviceChooseComponent
        },
        computed:{
            ...mapState({
                themeColor: state=>state.app.themeColor
            })
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


    .icon {
        position: absolute;
        right: -1px;
        bottom: -1px;
        width: 20px;
        height: 20px;
        display: block;
        fill: var(--color) !important;
    }

    .zent-radio-wrap {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 300px;
        margin-left: 5px;
        margin-right: 5px;
        border: 1px solid #e5e5e5;
        padding: 20px 0;
        position: relative;
    }

    .title {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        text-align: center;
        margin-bottom: 3px;
    }
    .desc {
        text-align: center;
        color: #969799;
        font-size: 12px;
        line-height: 18px;
        margin-bottom: 5px;
        margin-left: 5px;
    }

    .zent-radio-checked {
        border: 1px solid var(--color) !important;
    }

    .batch-box {
        background-color: #f8f8f8;
        border-left: 5px solid #e5e5e5!important;
        padding: 10px;
        border: 1px solid #ebedf0;
        display: flex;
        align-items: center;
    }

    .set-span {
        width: auto!important;
        color: #555;
    }

    .batch-input {
        display: flex;
    }

    .input-tip {
        line-height: 32px;
        color: #9b9b9b;
    }

    .item-align-center {
        display: flex;
        align-items: center;
        height: 40px;
    }
</style>
