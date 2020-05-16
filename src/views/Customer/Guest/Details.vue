<template>
    <div class="padding-20">
        <div class="box-head">
            <!--头像区域-->
            <div style="width: 120px;margin-top: 10px;">
                <el-avatar :size="70" :src="circleUrl"></el-avatar>
            </div>

            <!--内容区域-->
            <div style="margin-left: 5px">
                <div class="justify-between">
                    <div class="align-center">
                        <strong style="font-size: 30px">{{customerData.name}}</strong>&nbsp;
                        <i v-if="customerData.sex===1" class="el-icon-female" style="color: #e6419c;font-size: 20px;"></i>
                        <i v-if="customerData.sex===2" class="el-icon-male" style="color: #409df3;font-size: 20px;"></i>
                        &nbsp;&nbsp;

                        <up-sert-customer-component @data-save="reloadData"></up-sert-customer-component>
                    </div>

                    <div>
                        <el-button size="mini">开单</el-button>
                        <el-button size="mini">办卡</el-button>
                    </div>
                </div>

                <div style="float: left">
                    <i class="el-icon-medal" style="color: #f8ce87"></i>
                    <span style="font-size: 15px">{{customerData.identity}}</span>
                </div>

                <div style="margin-top: 30px">
                    <div style="display: flex">
                        <div class="head-item">
                            <span style="color: rgb(153, 153, 153)">手机号:</span> {{customerData.tel}}
                        </div>
                        <div class="head-item">
                            <span style="color: rgb(153, 153, 153)">注册时间:</span> {{customerData.created_at}}
                        </div>
                        <div class="head-item">
                            <span style="color: rgb(153, 153, 153)">来源:</span> {{customerData.source}}
                        </div>
                    </div>

                    <div class="head-item" style="display:flex; margin-top: 10px;">
                        <span style="color: rgb(153, 153, 153)">备注:&nbsp;</span> {{customerData.description}}
                    </div>
                </div>
            </div>

        </div>

        <div class="box-main">
            <div>
                <span style="color: rgb(153, 153, 153)">余额:</span><br>
                <span class="main-value">￥{{customerData.card_balance}}</span>
            </div>
            <div>
                <span style="color: rgb(153, 153, 153)">次卡:</span><br>
                <span class="main-value">{{customerData.counting_card_length}}张</span>
            </div>
            <div>
                <span style="color: rgb(153, 153, 153)">累计消费:</span><br>
                <span class="main-value">{{customerData.consume_total}}元</span>
            </div>
            <div>
                <span style="color: rgb(153, 153, 153)">消费次数:</span><br>
                <span class="main-value">{{customerData.consume_count}}次</span>
            </div>
            <div>
                <span style="color: rgb(153, 153, 153)">最后消费时间:</span><br>
                <span>{{customerData.last_consume_date}}</span>
            </div>
            <div>
                <span style="color: rgb(153, 153, 153)">充值卡过期时间:</span><br>
                <span></span>
            </div>

        </div>

        <div class="box-tabs">
            <div>
                <el-tabs type="card">
                    <el-tab-pane label="客户信息">
                        <div>
                            <div class="title">基本档案</div>
                            <div v-for="item in detail_info" :key="item.key" class="align-center details-info">
                                <div class="details-info-label"><span>{{ item.label }}:</span></div>
                                <div class="details-info-value"><span>{{ customerData[item.key] }}</span></div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="消费记录">
                        <order-list-component :customer_id="this.$route.params.id"></order-list-component>
                    </el-tab-pane>
                    <el-tab-pane label="次卡信息">次卡信息</el-tab-pane>
                    <el-tab-pane disabled label="跟进记录(敬请期待)">跟进记录</el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import customerApi from '@/service/customer.js'
    import upSertCustomerComponent from '@/views/Customer/upSertCustomer.vue'
    import orderListComponent from '@/views/Orders/List.vue'

    export default {
        name: "Details",
        components: {
            upSertCustomerComponent,
            orderListComponent
        },
        data() {
            return {
                customerData: {},
                detail_info: [
                    {
                        label: "生日",
                        key: "birthday"
                    },
                    {
                        label: "微信号",
                        key: "wechat_id"
                    },
                    {
                        label: "地址",
                        key: "address"
                    }
                ],
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            }
        },
        methods: {
            // 获取客户详情
            async getCustomerDetails(){
                try {
                    const res = await customerApi.getCustomerDetails(this.$route.params.id);
                    if (res.status >= 200 && res.status < 300) {
                        this.customerData = res.data;
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

            // 重新加载页面
            reloadData(){
                this.getCustomerDetails();
            }
        },
        mounted() {
            this.getCustomerDetails();
        }
    }
</script>

<style scoped>
    .box-head {
        display: flex;
    }

    .box-main {
        margin-top: 30px;
        display: flex;
        align-items:center;
        justify-content:center;
        flex-wrap: wrap;

    }

    .box-tabs {
        margin-top: 30px;
        align-items:center;
        justify-content:center;
        flex-wrap: wrap;
    }

    .box-main div{
        width: 150px;
        margin-bottom: 20px;
    }


    .padding-20{
        padding: 20px;
    }

    .align-center{
        display: flex;
        align-items:center;
        /*justify-content:center;*/
    }

    .justify-between {
        display: flex;
        align-items:center;
        justify-content: space-between;
    }

    .head-item {
        margin-right: 30px;
        font-size: 14px;
    }
    .details-info {
        margin-top: 10px;
    }

    .details-info-label {
        color: rgb(153, 153, 153);
        width: 60px;
        text-align: right;
        margin-right: 20px;
    }
    .details-info-value {
        width: 100px;
        text-align: left;
    }

    .main-value {
        font-size: 20px;
    }

    .title{
        background: #f8f8f8;
        height: 24px;
        padding: 12px 16px;
        font-family: PingFangSC-Semibold Helvetica,Arial,Verdana,Tahoma,sans-serif;
        color: #323232;
        letter-spacing: 0;
        line-height: 24px;
        position: relative;
        text-align: left;
        width: 30%;
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

</style>
