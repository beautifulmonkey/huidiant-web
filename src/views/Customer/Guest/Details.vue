<template>
    <div class="details-box">

        <!--头区域-->
        <div class="m-wrap-16">
            <div class="title-wrap flex align-center">
                <h2 class="title flex-item">会员详情</h2>
                <div class="button-group">
                    <el-button type="primary" icon="el-icon-edit" plain size="medium">编辑资料</el-button>

                    <el-button type="primary" size="medium">办卡</el-button>
                    <el-button type="primary" size="medium">开单</el-button>
                </div>
            </div>

            <div class="info-wrap">
                <div class="basic-info-wrap">
                    <div class="flex align-center">
                        <div class="avatar-wrap">
                            <span class="avatar el-avatar el-avatar--circle" style="height: 80px; width: 80px; line-height: 80px;">
                                <img :src="imgUrl" style="object-fit: cover;">
                            </span>
                        </div>

                        <div class="flex-item">
                            <div class="name-info">
                                <span class="name">杨逍逍</span>
                                <div class="member-level level1">
                                    <div class="level-icon" :style="level_style"></div>
                                    <span style="font-weight: 600">普卡会员</span>
                                </div>
                            </div>
                            <div class="phone">17610162918</div>
                            <div class="description">参加开业活动,充2000送1000, 目前还剩300元 原价消费</div>
                        </div>
                    </div>

                </div>


                <div class="other-info-wrap" v-show="showDetail">
                    <div class="flex-wrap el-row el-row--flex" style="margin-left: -12px; margin-right: -12px;">
                        <div class="item el-col el-col-8" style="padding-left: 12px; padding-right: 12px;">
                            <span class="label">卡号</span>
                            <span class="value">NO.2</span>
                        </div>

                        <div class="item el-col el-col-8" style="padding-left: 12px; padding-right: 12px;">
                            <span class="label">成为会员时间</span>
                            <span class="value">2020-07-16 00:33</span>
                        </div>

                        <div class="item el-col el-col-8" style="padding-left: 12px; padding-right: 12px;">
                            <span class="label">来源</span>
                            <span class="value">在线预约</span>
                        </div>

                        <div class="item el-col el-col-8" style="padding-left: 12px; padding-right: 12px;">
                            <span class="label">到店次数</span>
                            <span class="value">0</span>
                        </div>

                        <div class="item el-col el-col-8" style="padding-left: 12px; padding-right: 12px;">
                            <span class="label">最近到店时间</span>
                            <span class="value">-</span>
                        </div>

                        <div class="item el-col el-col-8" style="padding-left: 12px; padding-right: 12px;">
                            <span class="label">最近登录时间</span>
                            <span class="value">2020-08-11 19:07</span>
                        </div>

                    </div>
                </div>

                <div style="width: 100%;text-align: center">
                    <button type="button" class="el-button other-info-control el-button--text el-button--medium" @click="showDetail=!showDetail">
                        <span v-if="!showDetail">更多信息<i class="el-icon--right el-icon-arrow-down"></i></span>
                        <span v-if="showDetail">收起信息<i class="el-icon--right el-icon-arrow-up"></i></span>
                    </button>
                </div>

            </div>


        </div>

        <!--余额区域-->
        <div class="flex assets-wrap">

            <div class="assets-item">
                <div class="coupon-wrap">
                    <div class="label-wrap flex justify-between align-center">
                        <span class="label">余额（元）</span>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                    <div class="value">{{customerData.card_balance}}</div>
                </div>
            </div>

            <div class="assets-item">
                <div class="coupon-wrap">
                    <div class="label-wrap flex justify-between align-center">
                        <span class="label">次卡（张）</span>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                    <div class="value">{{customerData.counting_card_length}}</div>
                </div>
            </div>

            <div class="assets-item" style="margin-right: 0">
                <div class="coupon-wrap">
                    <div class="label-wrap flex justify-between align-center">
                        <span class="label">累计消费（元）</span>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                    <div class="value">{{customerData.consume_total}}</div>
                </div>
            </div>
        </div>


        <!--组件-->
        <div class="m-wrap-16" style="margin-top: 24px;min-height: 400px;">
            <div>
                <el-tabs type="card">
                    <el-tab-pane label="消费记录">
                        <order-list-component :customer_id="this.$route.params.id"></order-list-component>
                    </el-tab-pane>
                    <el-tab-pane label="次卡信息">
                        <counting-cart-component :customer_id="this.$route.params.id"></counting-cart-component>
                    </el-tab-pane>
                    <el-tab-pane label="客户档案">
                        <div>
                            <form class="el-form member-detail-form">
                                <div v-for="item in detail_info" class="el-form-item is-required is-no-asterisk el-form-item--medium">
                                    <label class="el-form-item__label" style="width: 150px;">{{ item.label }}：</label>
                                    <div class="el-form-item__content" style="margin-left: 150px;">
                                        <div>
                                            <p class="text">{{ customerData[item.key] }}</p>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </el-tab-pane>
                </el-tabs>

            </div>

        </div>

    </div>
</template>

<script>
    import customerApi from '@/service/customer.js'
    import upSertCustomerComponent from '@/views/Customer/upSertCustomer.vue'
    import countingCartComponent from '@/views/Customer/Guest/countingCardSub.vue'
    import orderListComponent from '@/views/Orders/List.vue'

    export default {
        name: "Details",
        components: {
            upSertCustomerComponent,
            orderListComponent,
            countingCartComponent
        },
        data(){
            return {
                showDetail: true,
                level_style: {
                    backgroundImage:`url(${require('@/assets/img/public_level.png')})`
                },
                // imgUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJr6r7kclyDcRcicmOtnrFIXUyhbIV0D7sLMIgH0nrnmxPxo8uovxv9R9IO5vSiaVynj4Rib4vdarEeg/132?v=201904231643",
                imgUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",

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
    .details-box {
        text-align: left;
        font-size: 14px;
        color: #000;
        font-family: MicrosoftYaHei,Arial,Helvetica,sans-serif;
    }

    .m-wrap-16 {
        margin: 7px;
        margin-bottom: 20px;
        padding: 24px;
        background: #fff;
    }
    .title-wrap {
        display: flex;
        justify-content: space-between;
    }

    .align-center {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }
    .title-wrap .title {
        color: #000;
        font-size: 20px;
        margin: 0;
        margin-bottom: 10px;
        font-weight: 400;
    }


    .basic-info-wrap .avatar-wrap {
        position: relative;
        margin-right: 24px;
    }
    .flex-item {
        -webkit-box-flex: 1;
        -ms-flex: 1 0 0px;
        flex: 1 0 0;
    }
    .flex {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }
    .basic-info-wrap .name-info {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        color: #000;
        font-size: 20px;
    }
    .basic-info-wrap .name-info .name {
        padding-right: 10px;
    }
    .member-level.level1{
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

    .basic-info-wrap .phone {
        margin-top: 10px;
        color: #000;
    }
    .basic-info-wrap .description {
        margin-top: 10px;
        color: #353535;
    }

    .other-info-wrap {
        background: #fafafa;
        margin-top: 20px;
        padding: 4px 24px 24px;
    }
    .flex-wrap {
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }
    .other-info-wrap .item {
        padding-top: 20px;
        font-size: 14px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        line-height: 1;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }
    .other-info-wrap .label {
        color: #a6a6a6;
        width: 117px;
    }

    .assets-wrap {
        margin: 7px;
        margin-top: 24px;
    }

    .assets-wrap .assets-item {
        margin-right: 24px;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    .assets-wrap .coupon-wrap {
        overflow: hidden;
        cursor: pointer;
        padding: 0 16px;
        height: 116px;
        background: #fff;
        -webkit-box-shadow: 0 0 10px 0 rgba(0,0,0,.02);
        box-shadow: 0 0 10px 0 rgba(0,0,0,.02);
    }
    .assets-wrap .label-wrap {
        margin-top: 24px;
    }
    .assets-wrap .label-wrap .label {
        color: #535353;
        font-size: 15px;
        font-weight: 500;
    }

    .assets-wrap .value {
        font-size: 30px;
        line-height: 1;
        color: #535353;
        word-break: break-all;
        margin-top: 18px;
    }

    .justify-between {
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
    }
    .member-detail-form .text{
        display: inline-block;
        margin: 0;
        padding: 0 8px;
        word-break: break-all;
    }
</style>
