<template>
    <div>
        <el-button style="margin-right: 70px;width: 100px;border-radius: 2px;" type="primary" @click="payDialogOpen">收款</el-button>

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
                    <el-input v-model="form.reduce_amount" placeholder="减免金额">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="还需支付">
                    <strong>¥ {{getNeedPay()}}</strong>
                </el-form-item>

                <el-divider>支付相关</el-divider>
                <el-form-item label="现金支付" prop="cash_pay_amount">
                    <el-input v-model="form.cash_pay_amount" placeholder="现金支付">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="储值支付" prop="balance_pay_amount" v-if="cardBalance && menuActive!=='recharge'">
                    <el-input v-model="form.balance_pay_amount" placeholder="储值支付">
                        <template slot="append">元</template>
                    </el-input> 储值余额: ¥{{cardBalance}}
                </el-form-item>

                <el-form-item label="其他支付">
                    <el-input v-model="form.name" placeholder="功能开发中..." disabled></el-input>
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
                </div>
            </div>
            <div v-if="showPaySuccess" slot="footer" class="dialog-footer">
                <el-button @click="handleClose" type="primary">返回开单</el-button>
            </div>

        </el-dialog>


    </div>
</template>

<script>
    export default {
        name: "paySub",
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
              form: {
                  reduce_amount: null,
                  cash_pay_amount: null,
                  balance_pay_amount: null
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
          }
        },
        methods: {
            payDialogOpen() {
                this.dialogFormVisible = true;
                this.form = {
                    reduce_amount: null,
                    cash_pay_amount: null,
                    balance_pay_amount: null
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

                        if (realPay < needPay){
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
                                pay_type: 2,  // 防止为0元
                                custom_pay_amount: 0,
                                cash_pay_amount: this.form.cash_pay_amount - (realPay - needPay),
                                balance_pay_amount: parseFloat(this.form.balance_pay_amount) || 0
                            }
                        };

                        if (result.pay.cash_pay_amount && !result.pay.balance_pay_amount){result.pay.pay_type=1}
                        if (!result.pay.cash_pay_amount && result.pay.balance_pay_amount){result.pay.pay_type=2}
                        if (result.pay.cash_pay_amount && result.pay.balance_pay_amount){result.pay.pay_type=3}

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
                return ((parseFloat(this.form.balance_pay_amount) || 0) + (parseFloat(this.form.cash_pay_amount) || 0)).toFixed(2);
            },

            // 支付成功页面显示
            setPaySuccess() {
                const loading = this.$loading({
                    lock: true,
                    text: '正在保存订单信息...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    loading.close();
                    this.showPaySuccess = true
                }, 1500);
            },

            // 关闭弹框
            handleClose(done) {
                if (this.showPaySuccess){
                    this.$router.go(0)
                }else {
                    done();
                }
            }
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
