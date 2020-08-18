<template>
    <div class="main-box">
        <div class="m-wrap-16">
            <div class="title">订单信息</div>
            <div class="content">
                <h2>已完成</h2>
                <div style="display: flex;font-size: 90%">
                    <div style="width: 350px">
                        <span class="label" >订单编号：</span>
                        <span class="text" >{{orderData.order_number}}</span>
                    </div>

                    <div style="width: 350px">
                        <span class="label" >收款时间：</span>
                        <span class="text" >{{orderData.created_at}}</span>
                    </div>

                    <div style="width: 350px">
                        <span class="label" >手艺人/员工：</span>
                        <span class="text" >{{orderData.employees || '-'}}</span>
                    </div>
                </div>

                <div class="order-remark" v-if="orderData.description">
                    <span style="color: rgb(85, 85, 85);">备注</span>：<span style="color: rgb(17, 17, 17);">{{orderData.description}}️</span>
                </div>

            </div>
        </div>

        <div class="m-wrap-16">
            <div class="title">客户信息</div>
            <div class="content">
                <div class="customer">
                    <div class="el-image image">
                        <img :src="orderData.customer_img ||defaultImg" class="el-image__inner" style="object-fit: cover;"><!---->
                    </div>

                    <div class="name-phone">
                        <div class="name-info">
                            <span class="name">{{orderData.customer_name}}</span>
                            <div class="member-level level1" v-show="orderData.customer_id">
                                <div class="level-icon" :style="level_style"></div>{{orderData.customer_identity}}
                            </div>
                        </div>
                        <div class="phone" >{{orderData.customer_tel || '-'}}</div>
                    </div>

                </div>

            </div>
        </div>

        <div class="m-wrap-16">
            <div class="title">消费信息</div>
            <div class="content" style="margin-top: 20px;">
                <el-table
                        border
                        :header-cell-style="'background: #f7f8fa;'"
                        :data="orderData.goods">

                    <el-table-column label="商品">
                        <template slot-scope="scope">
                            <span>{{ scope.row.goods_name }}</span>
                            <el-tag size="mini">{{ scope.row.type_info }}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column label="单价">
                        <template slot-scope="scope">
                            <span>￥{{ scope.row.original_price }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="count" label="数量">
                        <template slot-scope="scope">
                            <span>×{{ scope.row.count }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="reduce_amount" label="商品优惠">
                        <template slot-scope="scope">
                            <span v-if="scope.row.reduce_amount">- ¥ {{ scope.row.reduce_amount }}</span>
                            <span v-if="!scope.row.reduce_amount">-</span>
                            <br>
                            <span style="font-size: 12px;color: #999;">{{ scope.row.reduce_text }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="小计">
                        <template slot-scope="scope">
                            <span>￥{{ scope.row.paid_amount }}</span>
                        </template>
                    </el-table-column>

                </el-table>

                <div class="consume-sum">
                    <div style="width: 300px;">

                        <div>
                            <el-divider content-position="left">金额信息</el-divider>
                            <div class="consume-sum-item"><label>合计：</label><span>￥{{orderData.consume_amount}}</span></div>
                            <div class="consume-sum-item"><label>减免金额：</label><span>￥{{orderData.reduce_amount}}</span></div>
                            <div class="consume-sum-item"><label>实付金额：</label><span>￥{{orderData.paid_amount}}</span></div>
                        </div>

                        <div>
                            <el-divider content-position="left">支付信息</el-divider>
                            <div class="consume-sum-item"><label>现金支付：</label><span>￥{{orderData.cash_pay_amount}}</span></div>
                            <div v-if="orderData.customer_has_prepaid_card" class="consume-sum-item"><label>会员卡余额支付：</label><span>￥{{orderData.balance_pay_amount}}</span></div>
                            <div v-if="orderData.custom_pay_amount" class="consume-sum-item"><label>{{orderData.custom_pay_name}}：</label><span>￥{{orderData.custom_pay_amount}}</span></div>
                        </div>

                        <div v-if="orderData.customer_has_prepaid_card">
                            <el-divider content-position="left">余额信息</el-divider>
                            <div class="consume-sum-item"><label>消费前卡余额：</label><span>￥{{orderData.total_balance_before}}</span></div>
                            <div class="consume-sum-item"><label>消费后卡余额：</label><span>￥{{orderData.total_balance_after}}</span></div>
                        </div>

                        <receipts-component :orderData="orderData"></receipts-component>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import orderApi from '@/service/order.js'
    import ReceiptsComponent from '@/components/Receipts/Receipts.vue'

    export default {
        name: "orderDetails",
        components: {
            ReceiptsComponent
        },
        data() {
            return {
                user: {},
                orderData: {},
                defaultImg: require('@/assets/img/user_smile.png'),
                level_style: {
                    backgroundImage:`url(${require('@/assets/img/public_level.png')})`
                },
            }
        },
        methods: {
            // 获取订单详情
            async getOrderDetails(){
                try {
                    const res = await orderApi.getOrderDetails(this.$route.params.id);
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
            },
        },
        mounted() {
            this.getOrderDetails();
        }
    }
</script>

<style scoped>
    .main-box{
        margin: 7px;
        margin-bottom: 20px;
        padding: 12px;
        background: #fff;
    }
    .m-wrap-16 {
        margin-left: 16px;
        margin-right: 16px;
        margin-top: 16px;
        text-align: left;
    }


    .title{
        font-size: 15px;
        background: #f8f8f8;
        height: 24px;
        padding: 12px 16px;
        font-family: PingFangSC-Semibold Helvetica,Arial,Verdana,Tahoma,sans-serif;
        color: #323232;
        letter-spacing: 0;
        line-height: 24px;
        position: relative;
    }

    .title:after{
        content: "";
        position: absolute;
        left: 6px;
        top: 16px;
        width: 4px;
        height: 16px;
        background: #8558fa;
    }

    .content {
        padding: 12px 16px;
    }

    .order-remark{
        padding: 10px 5px;
        margin-top: 9px;
        margin-bottom: 20px;
        background: #fff7cc;
        font-size: 12px;
        line-height: 16px;
    }

    .display-center{
        display: flex;
        /*justify-content: center;*/
        align-items: center;
    }

    .consume-sum-item{
        display: flex;
        justify-content: space-between;
        color: #555;
        font-size: 95%;
    }

    .consume-sum {
        display: flex;
        flex-direction: row-reverse;
        margin: 20px;
    }

    .label {
        color: #555;
    }

    .text {
        color: #111;
    }

    .content>.customer {
        color: #111;
        position: relative;
        display: inline-block;
        padding-right: 30px;
        height: 60px;
        vertical-align: top;
        padding-top: 7px;
        font-size: 14px;
    }
    .content>.customer .image {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        margin-right: 10px;
    }
    .content>.customer .name-phone {
        display: inline-block;
        line-height: 1;
    }
    .content>.customer .name-phone .name-info {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }
    .content>.customer .name-phone .name-info .name {
        padding-right: 10px;
    }
    .member-level.level1 {
        background: #fbae11;
    }
    .member-level {
        position: relative;
        display: inline-block;
        margin-left: 11px;
        padding: 0 7px 0 15px;
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        color: #fafafa;
        background: #8169ff;
        border-radius: 0 8px 8px 0;
        white-space: nowrap;
    }
    .member-level .level-icon {
        position: absolute;
        top: 0;
        bottom: 0;
        left: -11px;
        height: 18px;
        width: 22px;
        margin: auto;
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .content>.customer .name-phone .phone {
        margin-top: 15px;
    }
</style>
