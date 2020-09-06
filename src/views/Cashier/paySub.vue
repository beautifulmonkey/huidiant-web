<template>
    <div>
        <el-button style="margin-right: 70px;width: 100px;height: 45px;" type="primary" @click="payDialogOpen">收款</el-button>

        <el-dialog title="结算"
                   :visible.sync="dialogFormVisible"
                   :append-to-body="true"
                   :close-on-click-modal="false"
                   :before-close="handleClose">

            <!--支付页面-->
            <el-form v-if="!showPaySuccess" ref="form" :model="form" size="mini" :rules="rules" label-width="150px">

<!--                todo: 效仿美盈易自动checkbox补全-->
                <el-divider>金额相关</el-divider>
                <el-form-item label="消费总额">
                    <strong style="color: #d40000; font-size: 20px;">¥ {{payAmount}}</strong>
                </el-form-item>

                <el-form-item label="减免金额" prop="reduce_amount" v-if="!((menuActive==='createCard' && createType===1) || menuActive==='recharge')">
                    <el-input v-model="form.reduce_amount" placeholder="减免金额" clearable>
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="还需支付">
                    <strong>¥ {{getNeedPay()}}</strong>
                </el-form-item>

                <el-divider>支付相关</el-divider>
                <el-form-item label="现金支付" prop="cash_pay_amount">
                    <el-input v-model="form.cash_pay_amount" placeholder="现金支付" clearable>
                        <template slot="append">元</template>
                    </el-input>
                    <el-button type="text" @click="fillAmount('cash_pay_amount')">补全</el-button>
                </el-form-item>

                <el-form-item label="储值支付" prop="balance_pay_amount" v-if="cardBalance && menuActive!=='recharge'">
                    <el-input v-model="form.balance_pay_amount" placeholder="储值支付" clearable>
                        <template slot="append">元</template>
                    </el-input>
                    <el-button type="text" @click="fillAmount('balance_pay_amount')">补全</el-button>
                    <br>
                    余额: ¥{{cardBalance}}
                </el-form-item>

                <el-form-item label="其他支付" prop="custom_pay_amount">
                    <el-select v-model="form.custom_pay" placeholder="请选择" style="width: 100px;" @change="customPayChange">
                        <el-option :value='null' label="请选择"></el-option>
                        <el-option
                            v-for="item in customPayList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>

                    <el-input v-model="form.custom_pay_amount" placeholder="自定义支付" :disabled="!form.custom_pay" clearable>
                        <template slot="append">元</template>
                    </el-input>
<!--                    <el-button type="text" @click="fillAmount('custom_pay_amount')">补全</el-button>-->

                </el-form-item>

                <el-form-item label="实际支付">
                    <strong style="color: #d40000; font-size: 20px;">¥ {{getRealPay()}}</strong>
                </el-form-item>

                <el-divider></el-divider>

                <el-form-item label="找零">
                    <strong style="color: #d40000; font-size: 20px;">¥{{(getRealPay() - getNeedPay()).toFixed(2)}}</strong>
                </el-form-item>
            </el-form>
            <div v-if="!showPaySuccess" slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit('form')">结 算</el-button>
            </div>

            <!--支付成功页面-->
            <div v-if="showPaySuccess" class="align-justify-center" style="margin-bottom: 70px;margin-top: 70px;">
                <div>
                    <div :style="paySuccessStyle"></div>
                    <br>
                    <div style="width: 96px;color: #999;text-align: center">收款完成</div>
                    <br><br>
                    <receipts-component ref="ReceiptsComponent" :orderData="orderData"></receipts-component>

                </div>
            </div>
            <div v-if="showPaySuccess" slot="footer" class="dialog-footer">
                <el-button @click="handleClose" type="primary">返回开单</el-button>
            </div>

        </el-dialog>


    </div>
</template>

<script>

    import storeSettingApi from '@/service/storeSetting.js'
    import ReceiptsComponent from '@/components/Receipts/Receipts.vue'
    import orderApi from '@/service/order.js'

    export default {
        name: "paySub",
        components: {
            ReceiptsComponent
        },
        props: {
            payAmount: {
                type: Number
            },
            cardBalance: {
                type: Number
            },
            createType: {
                type: Number
            },
            menuActive: {
                type: String
            }
        },
        data(){
          return {
              dialogFormVisible: false,
              showPaySuccess: false,
              customPayList: [],
              form: {
                  reduce_amount: null,
                  cash_pay_amount: null,
                  balance_pay_amount: null,
                  custom_pay: null,
                  custom_pay_amount: null
              },
              rules: {
                  reduce_amount: [
                      {
                          validator:(rule,value,callback)=>{
                              if(value){
                                  if((/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/).test(value) == false){
                                      callback(new Error("金额为数字且不能小于0!"));
                                  }else if(parseFloat(value) > this.payAmount){
                                      callback(new Error("减免金额不能大于消费总额!"));
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
                  balance_pay_amount: [
                      {
                          validator:(rule,value,callback)=>{
                              if(value){
                                  if((/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/).test(value) == false){
                                      callback(new Error("金额为数字且不能小于0!"));
                                  }else if(parseFloat(value)>this.payAmount){
                                      callback(new Error("必须小于等于应收金额!"));
                                  }else if(this.cardBalance && parseFloat(value)>this.cardBalance){
                                      callback(new Error("储值余额不足!"));
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
                  custom_pay_amount: [
                      {
                          validator:(rule,value,callback)=>{
                              if(value){
                                  if((/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/).test(value) == false){
                                      callback(new Error("金额为数字且不能小于0!"));
                                  }else if(parseFloat(value)>this.payAmount){
                                      callback(new Error("必须小于等于应收金额!"));
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
                  cash_pay_amount: [
                      {
                          validator:(rule,value,callback)=>{
                              if(value){
                                  if((/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/).test(value) == false){
                                      callback(new Error("金额为数字且不能小于0!"));
                                  }else{
                                      callback();
                                  }
                              }else{
                                  callback();
                              }

                          },
                          trigger: 'blur'
                      }
                  ]
              },

              paySuccessStyle: {
                  background: `url(${require('@/assets/img/paySuccess.png')}) no-repeat 50%`,
                  backgroundSize: '96px',
                  width: '96px',
                  height: '96px'
              },
              orderData: {}
          }
        },
        methods: {
            // 支付金额补全
            fillAmount(mode){
                if (mode === 'balance_pay_amount'){
                    let val = this.getNeedPay() - this.form.custom_pay_amount - this. form.cash_pay_amount;
                    if (val < 0){val=0}
                    this.form.balance_pay_amount = val
                }else if (mode === 'cash_pay_amount'){
                    let val = this.getNeedPay() - this.form.custom_pay_amount - this. form.balance_pay_amount;
                    if (val < 0){val=0}
                    this.form.cash_pay_amount = val
                }else if (mode === 'custom_pay_amount'){
                    let val = this.getNeedPay() - this.form.cash_pay_amount - this. form.balance_pay_amount;
                    if (val < 0){val=0}
                    this.form.custom_pay_amount = val
                }
            },

            customPayChange(val) {
                if (!val){
                    this.form.custom_pay_amount = null
                }else {
                    this.fillAmount('custom_pay_amount')
                }
            },

            // 获取支付方式列表
            async getCustomPayList(){
                try {
                    const res = await storeSettingApi.getCustomPayList();
                    if (res.status >= 200 && res.status < 300) {
                        this.customPayList = res.data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取支付方式失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            payDialogOpen() {
                this.dialogFormVisible = true;
                this.form = {
                    reduce_amount: null,
                    cash_pay_amount: null,
                    balance_pay_amount: null,
                    custom_pay: null,
                    custom_pay_amount: null

                };
                this.$nextTick(() => {
                    this.$refs['form'].resetFields();
                })
            },
            onSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //todo 注意: toFixed输出string,注意转换
                        let realPay = parseFloat(this.getRealPay());
                        let needPay = parseFloat(this.getNeedPay());

                        let cash_pay_amount = parseFloat((this.form.cash_pay_amount - (realPay - needPay)).toFixed(2)) || 0;
                        let balance_pay_amount = parseFloat(this.form.balance_pay_amount) || 0;
                        let custom_pay_amount = parseFloat(this.form.custom_pay_amount) || 0;

                        if (realPay < needPay || (balance_pay_amount + custom_pay_amount) > needPay){
                            this.$message({
                                showClose: true,
                                message: '支付金额有误，请输入正确的支付金额',
                                type: 'error'
                            });
                            return false;
                        }

                        let result = {
                            amount: {
                                consume_amount: this.payAmount,
                                reduce_amount: parseFloat(this.form.reduce_amount) || 0,
                                paid_amount: needPay
                            },
                            pay: {
                                pay_type: 3,
                                cash_pay_amount: cash_pay_amount,
                                balance_pay_amount: balance_pay_amount,
                                custom_pay: this.form.custom_pay,
                                custom_pay_amount: custom_pay_amount
                            }
                        };

                        if (!needPay){result.pay.pay_type=2}  // 消耗次数为0元, 所以扣余额
                        if (result.pay.cash_pay_amount && !result.pay.balance_pay_amount && !result.pay.custom_pay_amount){result.pay.pay_type=1}
                        if (!result.pay.cash_pay_amount && !result.pay.custom_pay_amount && result.pay.balance_pay_amount){result.pay.pay_type=2}
                        if (result.pay.custom_pay_amount && !result.pay.cash_pay_amount && !result.pay.balance_pay_amount){result.pay.pay_type=4}

                        if (!result.pay.custom_pay_amount){result.pay.custom_pay=null}
                        if (result.pay.custom_pay_amount && !result.pay.custom_pay){
                            this.$message({
                                showClose: true,
                                message: '请选择支付方式!',
                                type: 'error'
                            });
                            return false;
                        }

                        this.$emit(
                            'settlement',
                            result
                        )
                    } else {
                        return false;
                    }
                });
            },

            // 还需支付
            getNeedPay(){
                return (parseFloat(this.payAmount - this.form.reduce_amount) || this.payAmount).toFixed(2);
            },

            // 实际支付
            getRealPay() {
                return (
                    (parseFloat(this.form.balance_pay_amount) || 0) +
                    (parseFloat(this.form.cash_pay_amount) || 0) +
                    (parseFloat(this.form.custom_pay_amount) || 0)
                ).toFixed(2);
            },

            // 支付成功页面显示
            setPaySuccess(loadingObj, order_number) {
                this.getOrderDetails(order_number);

                setTimeout(() => {
                    loadingObj.close();
                    this.showPaySuccess = true
                }, 1500);
            },

            // 关闭弹框
            handleClose(done) {
                if (this.showPaySuccess){
                    window.location.href = "/#/cashier";
                    window.location.reload()
                }else {
                    done();
                }
            },

            // 获取订单详情
            async getOrderDetails(order_number){
                try {
                    const res = await orderApi.getOrderDetails(order_number);
                    if (res.status >= 200 && res.status < 300) {
                        this.orderData = res.data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取订单失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        },

        mounted() {
            this.getCustomPayList();
        }
    }
</script>

<style scoped>
    .el-input {
        width: 200px;
    }

    .align-justify-center{
        display: flex;
        align-items:center;
        justify-content:center;
    }

</style>
