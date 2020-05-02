<template>
    <div id="app" style="display: flex">
        <div class="menu-box">
            <div style="margin-top: 10px;margin-bottom: 30px;">
                <el-button type="info" round icon="el-icon-back" size="mini" @click="$router.push('/')">后台</el-button>
            </div>

            <el-button
                    class="menu-button"
                    :type=" item.id == menuActive ? 'primary': '' "
                    :plain=" item.id == menuActive ? false: true "
                    :autofocus="true"
                    v-for="item in consumption" @click="ButtonClick(item.id)">{{ item.name }}</el-button>

            <div class="divider-box">
                <el-divider></el-divider>
            </div>

            <el-button
                    class="menu-button"
                    :type=" item.id == menuActive ? 'primary': '' "
                    :plain=" item.id == menuActive ? false: true "
                    v-for="item in savings" @click="ButtonClick(item.id)">{{ item.name }}</el-button>

            <div class="divider-box">
                <el-divider></el-divider>
            </div>

            <el-button
                    class="menu-button"
                    :type=" item.id == menuActive ? 'primary': '' "
                    :plain=" item.id == menuActive ? false: true "
                    v-for="item in others" @click="ButtonClick(item.id)">{{ item.name }}</el-button>
        </div>
        <div class="main-box">
            <div class="padding-10">
                <el-input placeholder="请输入内容(搜索功能开发中)" size="small">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="padding-20">
                <consume-component v-if="this.menuActive==='consume'" :prepaidCardId="chooseCustomerData.prepaid_card"></consume-component>
                <counting-component v-if="this.menuActive==='counting'" :customerId="chooseCustomerData.id"></counting-component>
                <create-card-component v-if="this.menuActive==='createCard'" :prepaidCardId="chooseCustomerData.prepaid_card"></create-card-component>
            </div>
        </div>
        <div class="main-shopping">
            <div class="align-justify-center shopping-title">消费清单</div>
            <!--未选择客户显示搜索组件-->
            <div v-if="!isChooseCustomer" class="customer-search">
                <el-autocomplete
                        v-model="customerKeyWord"
                        placeholder="客户名、手机号  (不选择客户则为现金模式)"
                        :trigger-on-focus="false"
                        :fetch-suggestions="customerQuery"
                        value-key="label"
                        :debounce="500"
                        @select="customerChoose"
                ></el-autocomplete>
            </div>
            <!--选择客户显示客户信息-->
            <div v-if="isChooseCustomer" class="customer-info">
                <div class="align-justify-center" style="margin-left: 30px;">
                    <el-avatar icon="el-icon-user-solid"></el-avatar>

                    <div style="margin-left: 10px;">
                        <div style="float: left">
                            <el-button size="medium" type="text" style="color: #5a5e66">{{chooseCustomerData.name}}</el-button>
                            <i v-if="chooseCustomerData.sex===1" class="el-icon-female" style="color: #e6419c"></i>
                            <i v-if="chooseCustomerData.sex===2" class="el-icon-male" style="color: #409df3"></i>
                        </div><br>
                        <div style="float: left">
                            <span>{{chooseCustomerData.tel}}</span>
                            <el-tag style="margin-left: 10px;" type="warning"  effect="dark" size="mini">{{chooseCustomerData.identity}}</el-tag>
                        </div>
                    </div>
                </div>


                <div style="margin-right: 20px;">
                    <el-button style="color: #635c5e" type="text" icon="el-icon-delete" circle @click="clearCustomer"></el-button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapState} from "vuex";

    import consumeComponent from '@/views/Cashier/consumeSub.vue'
    import createCardComponent from '@/views/Cashier/createCardSub.vue'
    import countingComponent from '@/views/Cashier/countingSub.vue'
    import customerApi from '@/service/customer.js'

    export default {
        name: "index",
        components: {
            consumeComponent,
            createCardComponent,
            countingComponent
        },
        data() {
            return {
                menuActive: 'consume',
                customerKeyWord: '',
                isChooseCustomer: false,  // 当前是否选择了客户
                chooseCustomerData: {},  // 当前选择客户的信息
                consumption: [
                    {name: "开单", id: "consume"},
                    {name: "次卡", id: "counting"},
                ],
                savings: [
                    {name: "开卡", id: "createCard"},
                    {name: "充值", id: "increase"},
                ],
                others: [
                    {name: "取单", id: "qudan"},
                ]
            }
        },
        computed:{
            ...mapState({
                themeColor: state=>state.app.themeColor
            })
        },
        methods: {
            ButtonClick(data){
                this.menuActive = data
            },
            async customerQuery(queryString, cb) {
                try {
                    const res = await customerApi.SearchCustomer(queryString);
                    if (res.status >= 200 && res.status < 300) {
                        let cb_data = [];
                        res.data.forEach((item,index,array)=>{
                            cb_data.push({
                                id: item.id,
                                label: item.name + ' - ' + item.tel,
                                name: item.name,
                                tel: item.tel,
                                sex: item.sex,
                                identity: item.identity,
                                prepaid_card: item.prepaid_card
                            })
                        });
                        cb(cb_data);
                        if (!cb_data.length){
                            this.$notify({
                                title: '查询结果',
                                message: '未匹配到任何客户!',
                                type: 'warning'
                            });
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取客户列表失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }

            },

            // 选择客户
            customerChoose(item){
                this.isChooseCustomer = true;
                this.chooseCustomerData = item
            },

            // 清除选择客户
            clearCustomer(){
                this.isChooseCustomer = false;
                this.chooseCustomerData = {};
                this.customerKeyWord = ''
            }
        }
    }
</script>

<style scoped>
    .menu-box {
        margin-left: 5px;
        width: 100px;
    }
    .main-box {
        width: 50%;
        height: 100vh;
        background-color: #f4f5fa;
    }
    .main-shopping{
        width: 50%;
        height: 100vh;
        background-color: #f8f8f9;
    }
    .menu-button {
        display: block;
        width: 70px;
        height: 50px;
        border-color: white;
        margin: 5px;
    }
    .divider-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 70px;
        margin-left: 5px;
        height: 10px;
    }
    .el-divider {
        width: 30px;
    }

    .el-button--primary:hover{
        background:#409eff !important;
    }
    .el-button--primary:active{
        background:#409eff !important;
    }
    .el-button--primary:focus{
        background:#409eff !important;
    }

    .padding-20{
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 20px;
    }

    .padding-10{
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;
    }

    .align-justify-center{
        display: flex;
        align-items:center;
        justify-content:center;
    }

    .el-button+.el-button{
        margin-left: 5px;
    }

    .shopping-title {
        height: 50px;
        border: 1px dotted #d5d6db;
        background-color: #ffffff;
    }

    .customer-search {
        margin-top: 20px;
    }
    .customer-search /deep/ .el-input__inner{
        height: 70px;
    }
    .customer-info {
        background-color: #ffffff;
        display: flex;
        height: 70px;
        justify-content: space-between;
        align-items: center;
    }

    .el-autocomplete {
        height: 300px;
        width: 100%
    }
</style>
