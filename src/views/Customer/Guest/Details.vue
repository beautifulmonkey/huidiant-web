<template>
    <div class="details-box">

        <!--头区域-->
        <div class="m-wrap-16">
            <div class="title-wrap flex align-center">
                <h2 class="title flex-item">客户详情</h2>
                <div class="button-group">
                    <div style="margin-right: 10px;">
                        <up-sert-customer-component @data-save="reloadData"></up-sert-customer-component>
                    </div>
                    <el-button type="primary" size="medium" @click="$router.push(
                            {path: '/cashier', query: {uid: $route.params.id, cType: 'createCard'}})">办卡</el-button>
                    <el-button type="primary" size="medium" @click="$router.push({path: '/cashier', query: {uid: $route.params.id}})">开单</el-button>
                </div>
            </div>

            <div class="info-wrap">
                <div class="basic-info-wrap">
                    <div class="flex align-center">
                        <div class="avatar-wrap">
                            <span class="avatar el-avatar el-avatar--circle" style="height: 80px; width: 80px; line-height: 80px;">
                                <img @click="customerImgClick" :src="customerData.img || defaultImg" style="object-fit: cover;">
                            </span>
                        </div>

                        <div class="flex-item">
                            <div class="name-info">
                                <span class="name">{{customerData.name}}
                                    <i v-if="customerData.sex===1" class="el-icon-female" style="color: #e6419c;font-size: 18px;"></i>
                                    <i v-if="customerData.sex===2" class="el-icon-male" style="color: #409df3;font-size: 18px;"></i>
                                </span>

                                <div class="member-level level1">
                                    <div class="level-icon" :style="level_style"></div>
                                    <span style="font-weight: 600">{{customerData.identity}}</span>
                                </div>
                            </div>
                            <div class="phone">{{customerData.tel}}</div>
                            <div class="description">
                                <span style="color: rgb(153, 153, 153)">备注：</span>
                                {{customerData.description || '-'}}
                            </div>
                        </div>
                    </div>

                </div>


                <div class="other-info-wrap" v-show="showDetail">
                    <div class="flex-wrap el-row el-row--flex" style="margin-left: -12px; margin-right: -12px;">
                        <div v-for="item in viewData" class="item el-col el-col-8" style="padding-left: 12px; padding-right: 12px;">
                            <span class="label">{{item.label}}</span>
                            <span class="value">{{customerData[item.key] || '-'}}</span>
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

            <div @click="activeTabs='order'" class="assets-item">
                <div class="coupon-wrap">
                    <div class="label-wrap flex justify-between align-center">
                        <span class="label">余额（元）</span>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                    <div class="value">{{customerData.card_balance}}</div>
                </div>
            </div>

            <div @click="activeTabs='counting'" class="assets-item">
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
<!--                        <i class="el-icon-arrow-right"></i>-->
                    </div>
                    <div class="value">{{customerData.consume_total}}</div>
                </div>
            </div>
        </div>


        <!--组件-->
        <div class="m-wrap-16" style="margin-top: 24px;min-height: 400px;">
            <div>
                <el-tabs type="card" v-model="activeTabs">
                    <el-tab-pane label="消费记录" name="order">
                        <order-list-component :customer_id="this.$route.params.id"></order-list-component>
                    </el-tab-pane>
                    <el-tab-pane label="次卡信息" name="counting">
                        <counting-cart-component :customer_id="this.$route.params.id"></counting-cart-component>
                    </el-tab-pane>
                    <el-tab-pane label="客户档案" name="info">
                        <div>
                            <form class="el-form member-detail-form">
                                <div v-for="item in detail_info" class="el-form-item is-required is-no-asterisk el-form-item--medium">
                                    <label class="el-form-item__label" style="width: 150px;">{{ item.label }}：</label>
                                    <div class="el-form-item__content" style="margin-left: 150px;">
                                        <div>
                                            <p class="text">{{ customerData[item.key] || '-'}}</p>
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
                defaultImg: require('@/assets/img/user_smile.png'),

                activeTabs: 'order',
                customerData: {},
                viewData: [
                    {"label": "手机号", "key": "tel"},
                    {"label": "客户身份", "key": "identity"},
                    {"label": "注册时间", "key": "created_at"},
                    {"label": "客户来源", "key": "source"},
                    {"label": "消费次数", "key": "consume_count"},
                    {"label": "最后消费时间", "key": "last_consume_date"},
                ],
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
            },

            customerImgClick(){
                if (!this.customerData.img){
                    this.$message('客户绑定公众号后在此显示微信头像');
                }
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
    .button-group {
        display: flex;
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
        padding: 0 24px;
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
