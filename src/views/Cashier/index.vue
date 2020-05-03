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
                <!--消费组件-->
                <consume-component
                        v-if="this.menuActive==='consume'"
                        :prepaidCardId="chooseCustomerData.prepaid_card"
                        @addShoppingCart="addShoppingCartConsume">

                </consume-component>

                <!--划卡组件-->
                <counting-component
                        v-if="this.menuActive==='counting'"
                        :customerId="chooseCustomerData.id"
                        @addShoppingCart="addShoppingCartConsume">
                </counting-component>

                <!--开卡组件-->
                <create-card-component
                        v-if="this.menuActive==='createCard'"
                        :prepaidCardId="chooseCustomerData.prepaid_card"
                        @addShoppingCart="addShoppingCartCreateCard">
                </create-card-component>

                <!--充值组件-->
                <recharge-component
                        v-if="this.menuActive==='recharge'"
                        :customerData="chooseCustomerData"
                        @addShoppingCart="addShoppingCartReCharge">
                </recharge-component>

            </div>
        </div>
        <div class="main-shopping">
            <div class="align-justify-center shopping-title">消费清单</div>
            <!--客户选择区域-->
            <div style="height: 100px;">
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


            <!--清单区域-->

            <!--消费-->
            <div v-if="this.menuActive==='consume' || this.menuActive==='counting'">
                <div v-if="!shoppingCartConsumeList.length" class="align-justify-center" style="height: 20vh;">
                    <div><span style="color: #969799">点击服务产品添加到消费清单</span></div>
                </div>
                <div v-if="shoppingCartConsumeList.length" style="margin-top: 30px;">
                    <el-table
                            :data="shoppingCartConsumeList"
                            style="width: 100%">
                        <el-table-column
                                label="项目名称">
                            <template slot-scope="scope">
                                <strong><span>{{scope.row.name}}</span></strong>
                                <br>

                                <span style="color: #fe2278">￥{{scope.row.discount_price}}</span>
                                <s v-if="scope.row.discount_price !== scope.row.price">
                                    <span style="font-size: 0.8rem;color: rgb(153, 153, 153)">￥{{scope.row.price}}</span>
                                </s>

                            </template>
                        </el-table-column>
                        <el-table-column
                                label="数量">
                            <template slot-scope="scope">
                                <el-input-number style="width: 100px;" size="mini" v-model="scope.row.count" :min="1" :max="scope.row.counting || 999">
                                </el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="总价">
                            <template slot-scope="scope">
                                <strong><span style="color: #fe2278">¥{{scope.row.discount_price * scope.row.count}}</span></strong>
                                <br>
    <!--                            todo: 四舍五入, 避免无限位-->
                                <span v-if="scope.row.shoppingType === 'consume'" style="font-size: 0.8rem;color: rgb(153, 153, 153)">
                                    卡项优惠 - ¥{{scope.row.price * scope.row.count - scope.row.discount_price * scope.row.count}}
                                </span>

                                <span v-if="scope.row.shoppingType === 'counting'" style="font-size: 0.8rem;color: rgb(153, 153, 153)">
                                    卡项权益抵扣{{scope.row.count}}次
                                </span>

                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="text"
                                   @click.native.prevent="delShoppingItem(scope.$index, shoppingCartConsumeList)"
                                >移除</el-button>
                                <el-button size="mini" type="text" disabled>改价(开发中)</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <!--开卡-->
            <div v-if="this.menuActive==='createCard'">
                <div v-if="(this.createType===1 && !this.shoppingCartCreatePrepaid) || (this.createType===2 && !this.shoppingCartCreateCountingList.length)"
                     class="align-justify-center" style="height: 20vh;">
                    <div><span style="color: #969799">点击卡项添加到消费清单</span></div>
                </div>

                <!--开充值卡-->
                <div v-if="this.createType===1 && this.shoppingCartCreatePrepaid" style="background-color: white">
                    <div class="align-justify-center border-b" style="height: 50px;justify-content: left" :style="{'border-left': '10px solid ' + themeColor}">
                        <strong style="margin-left: 20px;">已选充值卡</strong>
                    </div>

                    <div class="justify-between border-b">
                        <div>
                            <strong><span>{{shoppingCartCreatePrepaid.name}}</span></strong>&nbsp;<span>x1</span>
                        </div>
                        <div>
                            <el-button style="color: #635c5e" type="text" icon="el-icon-delete" circle @click="shoppingCartCreatePrepaid=null"></el-button>
                        </div>
                    </div>
                    <div class="justify-between border-b">
                        <span style="color: #999;font-size: 0.9rem">充值金额</span>
                        <div>
                            <span style="color: #999">¥{{shoppingCartCreatePrepaid.price}}</span>
                            <el-button size="mini" type="text">修改</el-button>
                        </div>
                    </div>
                </div>
                <!--开次卡-->
                <div v-if="this.createType===2 && this.shoppingCartCreateCountingList.length">
                    <el-table
                            :data="shoppingCartCreateCountingList"
                            style="width: 100%">
                        <el-table-column
                                label="次卡名称">
                            <template slot-scope="scope">
                                <strong><span>{{scope.row.name}}</span></strong>
                                <br>

                                <span style="color: #fe2278">￥{{scope.row.discount_price}}</span>
                                <s v-if="scope.row.discount_price !== scope.row.price">
                                    <span style="font-size: 0.8rem;color: rgb(153, 153, 153)">￥{{scope.row.price}}</span>
                                </s>

                            </template>
                        </el-table-column>
                        <el-table-column
                                label="数量">
                            <template slot-scope="scope">
                                <el-input-number style="width: 100px;" size="mini" v-model="scope.row.count" :min="1" :max="999">
                                </el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="总价">
                            <template slot-scope="scope">
                                <strong><span style="color: #fe2278">¥{{scope.row.discount_price * scope.row.count}}</span></strong>
                                <br>
                                <!--                            todo: 四舍五入, 避免无限位-->
                                <span v-if="scope.row.shoppingType === 'consume'" style="font-size: 0.8rem;color: rgb(153, 153, 153)">
                                    卡项优惠 - ¥{{scope.row.price * scope.row.count - scope.row.discount_price * scope.row.count}}
                                </span>

                                <span v-if="scope.row.shoppingType === 'counting'" style="font-size: 0.8rem;color: rgb(153, 153, 153)">
                                    卡项权益抵扣{{scope.row.count}}次
                                </span>

                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="text"
                                           @click.native.prevent="delShoppingItem(scope.$index, shoppingCartCreateCountingList)"
                                >移除</el-button>
                                <el-button size="mini" type="text" disabled>改价(开发中)</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </div>
            </div>
            <!--充值-->
            <div v-if="this.menuActive==='recharge'">
                <div v-if="!this.shoppingCardRecharge" class="align-justify-center" style="height: 20vh;">
                    <div><span style="color: #969799">选择充值类型以继续操作</span></div>
                </div>
                <div v-if="this.shoppingCardRecharge" style="background-color: white">
                    <div class="align-justify-center border-b" style="height: 50px;justify-content: left" :style="{'border-left': '10px solid ' + themeColor}">
                        <strong style="margin-left: 20px;">已选充值卡</strong>
                    </div>

                    <div class="justify-between border-b">
                        <div>
                            <strong><span>{{chooseCustomerData.identity}}</span></strong>
                        </div>
                        <div>
                            <span style="color: #999; font-size: 0.9rem">余额: ¥{{chooseCustomerData.card_balance}}</span>
                            <el-button style="color: #635c5e" type="text" icon="el-icon-delete" circle @click="shoppingCardRecharge=null"></el-button>
                        </div>
                    </div>

                    <div v-if="rechargeType==='rechargeUpgrade'" class="justify-between border-b">
                        <span style="color: #999;font-size: 0.9rem">升级后卡项</span>
                        <div>
                            <el-select v-model="shoppingCardRecharge.card" placeholder="请选择升级后卡项" @change="choosePrepaidCard">
                                <el-option
                                        v-for="item in prepaidCardList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>


                    <div class="justify-between border-b">
                        <span style="color: #999;font-size: 0.9rem">充值金额</span>
                        <div>
                            <el-input v-model="shoppingCardRecharge.price" placeholder="请输入充值金额">
                                <template slot="append">元</template>
                            </el-input>
                        </div>
                    </div>

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
    import rechargeComponent from '@/views/Cashier/rechargeSub.vue'

    import customerApi from '@/service/customer.js'
    import cardApi from '@/service/card.js'

    export default {
        name: "index",
        components: {
            consumeComponent,
            createCardComponent,
            countingComponent,
            rechargeComponent
        },
        data() {
            return {
                menuActive: 'consume',
                customerKeyWord: '',
                isChooseCustomer: false,  // 当前是否选择了客户
                chooseCustomerData: {},  // 当前选择客户的信息
                // 消费清单列表-消费
                shoppingCartConsumeList: [],
                // 消费清单列表-开充值卡
                shoppingCartCreatePrepaid: null,
                // 消费清单列表-开次卡
                shoppingCartCreateCountingList: [],
                createType: null,
                // 消费清单列表-充值
                shoppingCardRecharge: null,
                rechargeType: null,
                prepaidCardList: [],

                consumption: [
                    {name: "开单", id: "consume"},
                    {name: "划卡", id: "counting"},
                ],
                savings: [
                    {name: "开卡", id: "createCard"},
                    {name: "充值", id: "recharge"}
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
                                prepaid_card: item.prepaid_card,
                                card_balance: item.card_balance
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

            // 获取充值卡列表
            async getCardList(){
                console.log("GET!!")
                try {
                    const res = await cardApi.getCardList({type: 1, page_size:999});
                    if (res.status >= 200 && res.status < 300) {
                        this.prepaidCardList = res.data.data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取卡项列表失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 清空消费清单, 客户变更时需要清空购物车信息
            clearShoppingCart(){
                this.shoppingCartConsumeList = [];
                this.shoppingCartCreatePrepaid = null;
                this.shoppingCardRecharge = null;
                this.shoppingCartCreateCountingList = []
            },

            // 选择客户
            customerChoose(item){
                this.clearShoppingCart();
                this.isChooseCustomer = true;
                this.chooseCustomerData = item
            },

            // 清除选择客户
            clearCustomer(){
                this.clearShoppingCart();
                this.isChooseCustomer = false;
                this.chooseCustomerData = {};
                this.customerKeyWord = ''
            },

            // 移除清单项
            delShoppingItem(index, rows) {
                rows.splice(index, 1);
            },

            // 选择升级卡项
            choosePrepaidCard(id){
                let prepaidCard = this.prepaidCardList.filter(item => item.id === id);
                this.shoppingCardRecharge.price = prepaidCard[0].price
            },

            // 消费清单添加 - 开单/划卡
            addShoppingCartConsume(data) {
                let goodsItems = this.shoppingCartConsumeList.filter(item => {
                    return item.id === data.id && item.shoppingType === data.shoppingType
                });

                if (goodsItems.length && data.shoppingType === 'counting'){
                    if (goodsItems[0].count >= data.counting){
                        this.$notify({
                            title: '剩余次数不足!',
                            message: '该项目只剩余' + data.counting +  '次!',
                            type: 'warning'
                        });
                        return
                    }
                }

                if (goodsItems.length){
                    // 如果该商品已经存在购物车, 则增加数量
                    goodsItems[0].count += 1
                }else {
                    // 如果该商品不存在购物车, 则添加商品
                    this.shoppingCartConsumeList.push(data);
                }
                this.$message({
                    type: 'success',
                    message: '已经添加到清单列表',
                    duration: 1000
                })
            },

            // 消费清单添加 - 开卡
            addShoppingCartCreateCard(data){
                this.createType = data.type;
                if (data.type === 1){
                    this.shoppingCartCreatePrepaid = data;
                }else{
                    let countingItem = this.shoppingCartCreateCountingList.filter(item => item.id === data.id);
                    if (countingItem.length){
                        // 如果该次卡已经存在购物车, 则增加数量
                        countingItem[0].count += 1
                    }else {
                        // 如果该次卡不存在购物车, 则添加商品
                        this.shoppingCartCreateCountingList.push(data);
                    }
                }
                this.$message({
                    type: 'success',
                    message: '已经添加到清单列表',
                    duration: 1000
                })
            },

            // 消费清单添加 - 充值
            addShoppingCartReCharge(type){
                this.rechargeType = type;
                if (type==='rechargeUpgrade'){
                    this.getCardList()
                }
                this.shoppingCardRecharge = {}
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
        margin-top: 20px;
        height: 70px;
        justify-content: space-between;
        align-items: center;
    }

    .justify-between {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
    }

    .border-b {
        border-bottom: 1px solid #eee
    }


    .el-autocomplete {
        /*height: 300px;*/
        width: 100%
    }
</style>
