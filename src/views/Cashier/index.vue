<template>
    <div id="app" style="display: flex">
        <div class="menu-box">
            <div style="margin-top: 10px;margin-bottom: 30px;">
                <el-button type="info" round icon="el-icon-back" size="mini" @click="$router.push('/analysis/today')">后台</el-button>
            </div>

            <el-button
                    :style="{'--color': themeColor}"
                    class="menu-button"
                    :type=" item.id == menuActive ? 'primary': '' "
                    :plain=" item.id == menuActive ? false: true "
                    :autofocus="true"
                    v-for="item in consumption" @click="ButtonClick(item.id)">{{ item.name }}</el-button>

            <div class="divider-box">
                <el-divider></el-divider>
            </div>

            <el-button
                    :style="{'--color': themeColor}"
                    class="menu-button"
                    :type=" item.id == menuActive ? 'primary': '' "
                    :plain=" item.id == menuActive ? false: true "
                    v-for="item in savings" @click="ButtonClick(item.id)">{{ item.name }}</el-button>

            <div class="divider-box">
                <el-divider></el-divider>
            </div>

            <el-button
                    :style="{'--color': themeColor}"
                    class="menu-button"
                    :type=" item.id == menuActive ? 'primary': '' "
                    :plain=" item.id == menuActive ? false: true "
                    v-for="item in others" @click="ButtonClick(item.id)">{{ item.name }}</el-button>

            <theme-picker v-show="false" class="theme-picker" :default="themeColor"></theme-picker>

        </div>
        <div class="main-box">
<!--            <div class="padding-10">-->
<!--                <el-input placeholder="请输入内容(搜索功能开发中)" size="small">-->
<!--                    <el-button slot="append" icon="el-icon-search"></el-button>-->
<!--                </el-input>-->
<!--            </div>-->
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
                        :customerId="chooseCustomerData.id"
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
                    >

                        <template slot-scope="{ item }">
                            <div class="search-item">
                                <div>
                                    <span style="color: #222">{{ item.name }}</span><br>
                                    <span style="font-size: 80%">{{item.identity}}</span>
                                </div>

                                <div>
                                    <span style="font-family: Avenir, Monaco, Arial, sans-serif">{{ item.tel }}</span>
                                </div>
                            </div>
                        </template>

                    </el-autocomplete>
                </div>
                <!--选择客户显示客户信息-->
                <div v-if="isChooseCustomer" class="customer-info">
                <div class="align-justify-center" style="margin-left: 30px;">
                    <el-avatar icon="el-icon-user-solid"></el-avatar>

                    <div style="margin-left: 10px;">
                        <div style="float: left">
                            <el-button size="medium" type="text" style="color: #5a5e66"
                                       @click="customerDetailsOpen(chooseCustomerData.id)">{{chooseCustomerData.name}}</el-button>
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
                            height="50vh"
                            style="width: 100%">
                        <el-table-column
                                label="项目名称">
                            <template slot-scope="scope">
                                <strong><span>{{scope.row.name}}</span></strong>
                                <br>

                                <span style="color: #fe2278">￥{{scope.row.discount_price}}</span>
                                <s v-if="parseFloat(scope.row.discount_price) !== parseFloat(scope.row.price)">
                                    <span style="font-size: 0.8rem;color: rgb(153, 153, 153)">￥{{scope.row.price}}</span>
                                </s>

                            </template>
                        </el-table-column>
                        <el-table-column
                                label="数量">
                            <template slot-scope="scope">
                                <el-input-number style="width: 100px;" size="mini" v-model="scope.row.count" :min="1" :max="getCountMax(scope.row.counting)">
                                </el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="总价">
                            <template slot-scope="scope">
                                <strong><span style="color: #fe2278">¥{{(scope.row.discount_price * scope.row.count).toFixed(2)}}</span></strong>
                                <br>

                                <span v-if="scope.row.shoppingType === 'counting'" style="font-size: 0.8rem;color: rgb(153, 153, 153)">
                                    次卡抵扣{{scope.row.count}}次
                                </span>
                                <span v-else-if="parseFloat(scope.row.origin_discount_price) !== parseFloat(scope.row.discount_price)" style="font-size: 0.8rem;color: rgb(153, 153, 153)">
                                    手动改价
                                </span>
                                <span v-else-if="scope.row.discount_price < scope.row.price" style="font-size: 0.8rem;color: rgb(153, 153, 153)">
                                    充值卡优惠 ¥{{((scope.row.price - scope.row.discount_price)*scope.row.count).toFixed(2)}}元
                                </span>


                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <el-popover
                                    v-if="scope.row.shoppingType === 'consume'"
                                    placement="top">
                                    <div>

                                        <div class="change-price-item">
                                            <el-input placeholder="改价格" v-model="scope.row.discount_price" size="mini"
                                                      oninput="value=value.replace(/[^\d.]/g,'')"
                                                      @input="discountChangeVal=scope.row.discount_price / scope.row.price * 10">
                                                <template slot="prepend">￥</template>
                                            </el-input>

                                            <svg style="width: 15px;height: 15px;margin: 0 9px;" viewBox="0 0 1536 1024"><path d="M970.65344 127.616L1103.00544 0l395.392 262.4c74.624 49.408 30.72 146.56-66.304 146.56H0.02944V243.2h1144.704L970.65344 127.616zM565.40544 896.384L433.05344 1024 37.66144 761.6c-74.624-49.408-30.72-146.56 66.304-146.56H1536.02944V780.8H391.32544l174.08 115.584z" fill="#6B6B6B"></path></svg>

                                            <el-input placeholder="改折扣" v-model="discountChangeVal" size="mini"
                                                      oninput="value=value.replace(/[^\d.]/g,'')"
                                                      @input="scope.row.discount_price=scope.row.price * discountChangeVal/10">
                                                <template slot="append">折</template>
                                            </el-input>
                                        </div>

                                    </div>
<!--                                    <div style="text-align: right; margin: 0">-->
<!--                                        <el-button size="mini" type="text" @click="cancelInput(scope.$index)">取消</el-button>-->
<!--                                        <el-button type="primary" size="mini" @click="cancelInput(scope.$index)">确定</el-button>-->
<!--                                    </div>-->
                                    <el-button slot="reference" size="mini" type="text"
                                               @click="discountChangeVal=scope.row.discount_price / scope.row.price * 10">改价</el-button>
                                </el-popover>

                                <el-button size="mini" type="text"
                                           @click.native.prevent="delShoppingItem(scope.$index, shoppingCartConsumeList)"
                                >移除</el-button>
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
                        <div v-if="!changeAmount">
                            <span style="color: #999">¥{{shoppingCartCreatePrepaid.price}}</span>
                            <el-button size="mini" type="text" @click="changeAmountBtn">修改</el-button>
                        </div>

                        <div v-if="changeAmount">
<!--                            <el-input size="mini" style="width: 100px;" v-model.number="changeAmountVal"></el-input>-->
                            <el-input v-model.number="changeAmountVal" placeholder="请输入充值金额" style="width: 200px;">
                                <template slot="append">元</template>
                            </el-input>

                            <el-button size="mini" type="text" @click="amountChangeBtn">确定</el-button>
                            <el-button size="mini" type="text" @click="changeAmount=false">取消</el-button>
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
                                <strong><span style="color: #fe2278">¥{{(scope.row.discount_price * scope.row.count).toFixed(2)}}</span></strong>
                                <br>

                                <span v-if="parseFloat(scope.row.origin_discount_price) !== parseFloat(scope.row.discount_price)" style="font-size: 0.8rem;color: rgb(153, 153, 153)">
                                    手动改价
                                </span>
                                <span v-else-if="scope.row.discount_price < scope.row.price" style="font-size: 0.8rem;color: rgb(153, 153, 153)">
                                    充值卡优惠 ¥{{((scope.row.price - scope.row.discount_price)*scope.row.count).toFixed(2)}}元
                                </span>

                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">

                                <el-popover
                                    placement="top">
                                    <div>

                                        <div class="change-price-item">
                                            <el-input placeholder="改价格" v-model="scope.row.discount_price" size="mini"
                                                      oninput="value=value.replace(/[^\d.]/g,'')"
                                                      @input="cardDiscountChangeVal=scope.row.discount_price / scope.row.price * 10">
                                                <template slot="prepend">￥</template>
                                            </el-input>

                                            <svg style="width: 15px;height: 15px;margin: 0 9px;" viewBox="0 0 1536 1024"><path d="M970.65344 127.616L1103.00544 0l395.392 262.4c74.624 49.408 30.72 146.56-66.304 146.56H0.02944V243.2h1144.704L970.65344 127.616zM565.40544 896.384L433.05344 1024 37.66144 761.6c-74.624-49.408-30.72-146.56 66.304-146.56H1536.02944V780.8H391.32544l174.08 115.584z" fill="#6B6B6B"></path></svg>

                                            <el-input placeholder="改折扣" v-model="cardDiscountChangeVal" size="mini"
                                                      oninput="value=value.replace(/[^\d.]/g,'')"
                                                      @input="scope.row.discount_price=scope.row.price * cardDiscountChangeVal/10">
                                                <template slot="append">折</template>
                                            </el-input>
                                        </div>

                                    </div>
                                    <!--                                    <div style="text-align: right; margin: 0">-->
                                    <!--                                        <el-button size="mini" type="text" @click="cancelInput(scope.$index)">取消</el-button>-->
                                    <!--                                        <el-button type="primary" size="mini" @click="cancelInput(scope.$index)">确定</el-button>-->
                                    <!--                                    </div>-->
                                    <el-button slot="reference" size="mini" type="text"
                                               @click="cardDiscountChangeVal=scope.row.discount_price / scope.row.price * 10">改价</el-button>
                                </el-popover>


                                <el-button size="mini" type="text"
                                           @click.native.prevent="delShoppingItem(scope.$index, shoppingCartCreateCountingList)"
                                >移除</el-button>
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
                            <el-input v-model.number="shoppingCardRecharge.price" placeholder="请输入充值金额">
                                <template slot="append">元</template>
                            </el-input>
                        </div>
                    </div>

                </div>
            </div>

            <!--todo: 订单备注功能-->
            <!--todo: 赠送服务功能-->

            <!--收款底栏-->
            <div>
                <div class="footer-amount border-b">
                    <span style="margin-right: 70px;font-size: 0.9rem">待收款金额：<strong>￥{{getAmountContext()}}</strong></span>
                </div>

                <div class="footer-handle">
                    <pay-component ref="payComponent"
                                   :payAmount="parseFloat(payAmount)"
                                   :cardBalance="chooseCustomerData.card_balance"
                                   :menuActive="menuActive"
                                   :createType="createType"
                                   @settlement="createOrderDeal"></pay-component>
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
    import payComponent from '@/views/Cashier/paySub.vue'

    import customerApi from '@/service/customer.js'
    import cardApi from '@/service/card.js'
    import cashierApi from '@/service/cashier.js'
    import ThemePicker from "@/components/ThemePicker"

    export default {
        name: "index",
        components: {
            payComponent,
            consumeComponent,
            createCardComponent,
            countingComponent,
            rechargeComponent,
            ThemePicker
        },
        data() {
            return {
                menuActive: 'consume',
                customerKeyWord: '',
                isChooseCustomer: false,  // 当前是否选择了客户
                chooseCustomerData: {},  // 当前选择客户的信息
                // 消费清单列表-消费
                shoppingCartConsumeList: [],
                discountChangeVal: null,
                // 消费清单列表-开充值卡
                shoppingCartCreatePrepaid: null,
                changeAmount: false,
                changeAmountVal: null,
                // 消费清单列表-开次卡
                shoppingCartCreateCountingList: [],
                createType: null,
                cardDiscountChangeVal: null,
                // 消费清单列表-充值
                shoppingCardRecharge: null,
                rechargeType: null,
                prepaidCardList: [],

                payAmount: 0, // 待支付金额
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

            customerDetailsOpen(id){
                window.open("#/customer/guest/details/" + id);
            },

            changeAmountBtn(){
                this.changeAmountVal = this.shoppingCartCreatePrepaid.price;
                this.changeAmount = true;
            },

            amountChangeBtn(){
                this.shoppingCartCreatePrepaid.price = this.changeAmountVal;
                this.changeAmount = false;
            },

            getCountMax(counting){
                if (counting && counting !== -1){
                    return counting
                }else {
                    return 999
                }
            },
            async customerQuery(queryString, cb) {
                try {
                    const res = await customerApi.SearchCustomer(queryString);
                    if (res.status >= 200 && res.status < 300) {
                        let cb_data = [];
                        res.data.forEach((item,index,array)=>{
                            cb_data.push({
                                id: item.id,
                                name: item.name,
                                tel: item.tel,
                                sex: item.sex,
                                identity: item.identity,
                                prepaid_card: item.prepaid_card,
                                card_balance: item.card_balance,
                                prepaid_card_price: item.prepaid_card_price
                            })
                        });
                        cb(cb_data);
                        // if (!cb_data.length){
                        //     this.$notify({
                        //         title: '查询结果',
                        //         message: '未匹配到任何客户!',
                        //         type: 'warning'
                        //     });
                        // }
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

            // 收款结账
            async cashierDeal(params){
                try {
                    const res = await cashierApi.cashierDeal(params);
                    if (res.status >= 200 && res.status < 300) {
                        this.$refs.payComponent.setPaySuccess()
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

            // 获取待支付金额
            getAmountContext(){
                let amount = 0;
                if (this.menuActive==='consume' || this.menuActive==='counting'){
                    this.shoppingCartConsumeList.forEach((item,index,array)=>{
                        amount += item.discount_price * item.count
                    })
                }else if (this.menuActive==='createCard'){
                    if(this.createType===1  && this.shoppingCartCreatePrepaid){
                        amount = this.shoppingCartCreatePrepaid.price
                    }else if(this.createType===2){
                        this.shoppingCartCreateCountingList.forEach((item,index,array)=>{
                            amount += item.discount_price * item.count
                        })
                    }
                }else if(this.menuActive==='recharge' && this.shoppingCardRecharge){
                    amount = parseFloat(this.shoppingCardRecharge.price || 0)
                }
                this.payAmount = amount.toFixed(2);
                return this.payAmount
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
                    if (goodsItems[0].count >= data.counting && data.counting !== -1){
                        this.$notify({
                            title: '剩余次数不足!',
                            message: '该项目只剩余' + data.counting +  '次!',
                            type: 'warning'
                        });
                        return
                    }
                }

                data.origin_discount_price = data.discount_price;
                if (goodsItems.length){
                    // 如果该商品已经存在购物车, 则增加数量
                    goodsItems[0].count += 1
                }else {
                    // 如果该商品不存在购物车, 则添加商品
                    this.shoppingCartConsumeList.unshift(data);
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
                data.origin_discount_price = data.discount_price;
                if (data.type === 1){
                    this.shoppingCartCreatePrepaid = data;
                }else{
                    let countingItem = this.shoppingCartCreateCountingList.filter(item => item.id === data.id);
                    if (countingItem.length){
                        // 如果该次卡已经存在购物车, 则增加数量
                        countingItem[0].count += 1
                    }else {
                        // 如果该次卡不存在购物车, 则添加商品
                        this.shoppingCartCreateCountingList.unshift(data);
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
                this.shoppingCardRecharge = {
                    price: this.chooseCustomerData.prepaid_card_price
                }
            },

            // 结算
            createOrderDeal(orderPayInfo){
                let orderData =  null;
                if(this.menuActive==='consume' || this.menuActive==='counting'){
                    orderData = this.createOrderGoods(orderPayInfo)
                }else if (this.menuActive==='createCard'){
                    orderData = this.createOrderCardCreate(orderPayInfo)
                }else if(this.menuActive==='recharge'){
                    orderData = this.createOrderRecharge(orderPayInfo)
                }
                console.log(orderData);
                // 请求后端接口
                this.cashierDeal(orderData)
            },

            // 品项订单
            createOrderGoods(orderPayInfo){
                let order = {
                    customer_id: this.chooseCustomerData.id || null,
                    order_type: 1,
                    amount: orderPayInfo.amount,
                    pay: orderPayInfo.pay,
                    order_items: []
                };

                this.shoppingCartConsumeList.forEach((item,index,array)=>{
                    let reduce_text = '';
                    if (item.shoppingType === "counting"){
                        reduce_text = '次卡抵扣' + item.count + '次'
                    } else if(item.origin_discount_price !== item.discount_price){
                        reduce_text = '手动改价(改前单价:' + item.origin_discount_price.toString() + '元 改后:' + item.discount_price.toString() + '元)';
                    } else if (item.discount_price < item.price){
                        reduce_text = '充值卡优惠' + ((item.price - item.discount_price)*item.count).toString()  + '元'
                    }

                    console.log(reduce_text);

                    order.order_items.push({
                        item_type: item.goodsType,
                        item_id: item.id,
                        counting_card_id: item.counting_card_id,
                        item_name: item.name,
                        original_price: item.price,
                        reduce_amount: (item.price - item.discount_price) * item.count,
                        reduce_text: reduce_text,
                        count: item.count,
                        paid_amount: item.discount_price * item.count
                    })
                });
                return order
            },

            // 开卡订单
            createOrderCardCreate(orderPayInfo){
                // 1: '充值卡', 2: '次卡'
                let orderTypeMap = {1: 3, 2: 2};
                let order = {
                    customer_id: this.chooseCustomerData.id || null,
                    order_type: orderTypeMap[this.createType],
                    amount: orderPayInfo.amount,
                    pay: orderPayInfo.pay,
                    order_items: []
                };

                if (this.createType === 1){
                    // 开充值卡
                    order.order_items.push({
                        item_type: 4,
                        item_id: this.shoppingCartCreatePrepaid.id,
                        item_name: this.shoppingCartCreatePrepaid.name,
                        original_price: this.shoppingCartCreatePrepaid.price,
                        reduce_amount: this.shoppingCartCreatePrepaid.price,
                        reduce_text: '',
                        count: 1,
                        paid_amount: this.shoppingCartCreatePrepaid.price
                    })
                }else if (this.createType === 2){
                    // 开次卡
                    this.shoppingCartCreateCountingList.forEach((item,index,array)=>{
                        let reduce_text = '';
                        if(item.origin_discount_price !== item.discount_price){
                            reduce_text = '手动改价(改前单价:' + item.origin_discount_price.toString() + '元 改后:' + item.discount_price.toString() + '元)';
                        } else if (item.discount_price < item.price){
                            reduce_text = '充值卡优惠' + ((item.price - item.discount_price)*item.count).toFixed(2)  + '元'
                        }
                        console.log(reduce_text);

                        order.order_items.push({
                            item_type: 5,
                            item_id: item.id,
                            item_name: item.name,
                            original_price: item.price,
                            reduce_amount: (item.price - item.discount_price) * item.count,
                            reduce_text: reduce_text,
                            count: item.count,
                            paid_amount: item.discount_price * item.count
                        })
                    });
                }
                return order
            },

            // 充值订单
            createOrderRecharge(orderPayInfo){
                let rechargeTypeMap = {'recharge': 6, 'rechargeUpgrade': 7};

                let order = {
                    customer_id: this.chooseCustomerData.id,
                    order_type: 4,
                    amount: orderPayInfo.amount,
                    pay: orderPayInfo.pay,
                    order_items: [{
                        item_type: rechargeTypeMap[this.rechargeType],
                        item_id: this.shoppingCardRecharge.card || null,
                        item_name: "充值" + this.shoppingCardRecharge.price + "元",
                        original_price: this.shoppingCardRecharge.price,
                        reduce_amount: 0,
                        reduce_text: '',
                        count: 1,
                        paid_amount: this.shoppingCardRecharge.price
                    }]
                };

                return order
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

    .menu-box .el-button--primary:hover{
        background: var(--color) !important;
    }
    .menu-box .el-button--primary:active{
        background: var(--color) !important;
    }
    .menu-box .el-button--primary:focus{
        background: var(--color) !important;
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

    .footer-amount{
        height: 40px;
        width: 50%;
        background-color: white;
        position: fixed;
        bottom: 80px;
        color: #d40000;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .footer-handle{
        height: 80px;
        width: 50%;
        background-color: white;
        position: fixed;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .search-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 20px;
        margin: 5px 0
    }

    .change-price-item{
        display: flex;
        align-items: center;
        padding: 10px 5px;
    }
    .change-price-item .el-input {
        width: 110px;
    }
    .change-price-item /deep/ .el-input-group__prepend{
        padding: 0 9px !important;
    }
    .change-price-item /deep/ .el-input-group__append {
        padding: 0 9px !important;
    }

</style>
