<template>
    <div>
        <div v-if="customerData.prepaid_card">
            <div class="prepaid-card-info">
                <div style="padding: 30px;text-align: left">
                    <div class="justify-between" style="font-size: 0.9rem;">
                        <span>{{customerData.identity}}</span>
                        <span>永久有效</span>
                    </div>
                    <div style="margin-top: 20px;">
                        <span style="font-size: 0.8rem;">余额:&nbsp;</span>
                        <strong>¥{{customerData.card_balance}}</strong>
                    </div>
                </div>
            </div>

            <div style="text-align: left;margin-top: 50px;color: #969799">选择充值类型</div>
            <div style="float: left;margin-top: 20px;">
                <el-button style="width: 120px;" @click="addRecharge('recharge')"
                           :type=" activeBt == 'recharge' ? 'primary': '' ">仅充值</el-button>
                <el-button style="width: 120px;" @click="addRecharge('rechargeUpgrade')"
                           :type=" activeBt == 'rechargeUpgrade' ? 'primary': '' ">升卡充值</el-button>
            </div>
        </div>

        <div v-if="!customerData.prepaid_card" class="align-justify-center" style="height: 50vh;">
            <div v-if="customerData.prepaid_card===0"><span style="color: #969799">该客户无充值卡, 请先办理</span></div>
            <div v-if="customerData.prepaid_card!==0"><span style="color: #969799">无可选项目，请输入客户信息</span></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "rechargeSub",
        props: {
            customerData: {
                type: Object
            },
        },
        data() {
            return {
                activeBt: ''
            }
        },
        methods: {
            addRecharge(type){
                this.activeBt = type;
                this.$emit("addShoppingCart", type)
            }
        }
    }
</script>

<style scoped>
    .prepaid-card-info {
        width: 300px;
        height: 120px;
        background: linear-gradient(137deg,#3387df, #4acfe4);
        border-radius:5px;
        color: white;
    }

    .justify-between {
        display: flex;
        justify-content: space-between
    }

    .align-justify-center{
        display: flex;
        align-items:center;
        justify-content:center;
    }
</style>
