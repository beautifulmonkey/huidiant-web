<template>
    <div class="ServiceDiv">
        <div class="m-wrap-16" v-if="!customer_id">

            <div class="cond-row">
                <div class="cond-column">
                    <span>客户信息:&nbsp;</span>
                    <el-input v-model="filter.customer_query" size="mini" clearable placeholder="客户姓名/手机号"></el-input>
                </div>

                <div class="cond-column">
                    <el-button type="primary" icon="el-icon-search" size="mini" @click="onSearchClick">搜索</el-button>
                    <el-button icon="el-icon-refresh" size="mini" @click="condClear">清空条件</el-button>
                </div>
            </div>


            <div class="cond-row">
                <div class="cond-column">
                    <span>订单类型:&nbsp;</span>
                    <el-select v-model="filter.order_type" clearable placeholder="选择订单类型" size="mini" >
                        <el-option
                                v-for="item in orderTypeList"
                                :key="item.key"
                                :label="item.label"
                                :value="item.key">
                        </el-option>
                    </el-select>
                </div>

                <div class="cond-column">
                    <span>付款方式:&nbsp;</span>
                    <el-select v-model="filter.pay_type" clearable placeholder="选择付款方式" size="mini" >
<!--                        <el-option :key=0 label="全部" :value=0></el-option>-->
                        <el-option
                            v-for="item in customPayList"
                            :key="'custom_' + item.id"
                            :label="item.name"
                            :value="'custom_' + item.id">
                        </el-option>
                        <el-option
                                v-for="item in payTypeList"
                                :key="item.key"
                                :label="item.label"
                                :value="item.key">
                        </el-option>
                    </el-select>
                </div>
            </div>


            <div class="cond-row">
                <div class="cond-column">
                    <span>支付金额:&nbsp;</span>
                    <el-input v-model="filter.paid_amount_gt" class="interval-input" size="mini" clearable placeholder="金额大于" ></el-input>
                    &nbsp;至&nbsp;
                    <el-input v-model="filter.paid_amount_lt" class="interval-input" size="mini" clearable placeholder="金额小于" ></el-input>
                </div>
            </div>


            <div class="cond-row">
                <div class="cond-column">
                    <span>下单时间:&nbsp;</span>
                    <el-date-picker
                            size="mini"
                            v-model="filter.daterange"
                            type="datetimerange"
                            :picker-options="pickerOptions"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="timestamp"
                            :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                </div>
            </div>

        </div>

        <div class="m-wrap-16">

            <header style="margin: 20px 0;background-color: #f7f8fa;padding: 0 10px;">
                <table>
                    <thead>
                        <tr style="line-height: 50px;">
                            <th style="width: 200px;"><div style="text-align: left;width: 200px;">商品</div></th>
                            <th style="width: 16%;">单价</th>
                            <th style="width: 16%;">数量</th>
                            <th style="width: 20%;">客户</th>
                            <th style="width: 15%;">金额</th>
                            <th style="width: 10%">状态</th>
                            <th style="width: 5%">操作</th>
                        </tr>
                    </thead>
                </table>
            </header>

            <div v-for="order in orderData">

                <div class="order-head">
                    <div>
                        <span style="color: #111">下单时间: {{order.created_at}}</span>
                        <span>订单编号: {{order.order_number}}</span>
                        <span>{{order.order_type_info}}</span>
                    </div>

                    <div style="margin-right: 20px;">
                        <el-button type="text" @click="$router.push('/orders/details/' + order.order_number)">订单详情</el-button>
                        <el-button type="text" @click="updateDescription(order.order_number, order.description)">备注</el-button>
                    </div>
                </div>

                <el-table
                        border
                        :show-header="false"
                        :data="order.goods"
                        :span-method="objectSpanMethod"
                        style="color: #333">
                    <el-table-column
                            width="200"
                            prop="goods_name"
                            label="商品">
                    </el-table-column>
                    <el-table-column label="单价" style="width: 15%">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                <span>￥{{scope.row.original_price}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="数量" style="width: 15%">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                <span>x {{scope.row.count}}</span>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column label="客户" style="width: 20%">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                <span v-if="!order.customer_id">{{order.customer_name}}</span>
                                <el-button :style="{'padding': 0, 'color': themeColor}" v-if="order.customer_id" type="text"
                                           @click="$router.push('/customer/guest/details/' + order.customer_id)">{{order.customer_name}}</el-button>
                                <span class="color-999" v-if="order.customer_tel"><br>{{order.customer_tel}}</span>
                                <span class="color-999" v-if="order.customer_identity"><br>{{order.customer_identity}}</span>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column label="金额" style="width: 15%">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                <span>￥{{order.paid_amount}}</span>
                                <span class="color-999"><br>{{order.pay_type_info}}</span>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column label="状态" style="width: 15%">
                        <template slot-scope="scope">
                            <div style="text-align: center">
                                <span>已完成</span>
                            </div>
                        </template>
                    </el-table-column>

                </el-table>

                <div class="order-desc" v-if="order.description">
                    <span style="margin-left: 20px;">订单备注: &nbsp;&nbsp;</span>
                    <span style="color: #333">{{order.description}}</span>
                </div>

                <div style="margin-bottom: 20px;"></div>

            </div>

            <div class="pagination-container">
                <el-pagination background @size-change="onPageSizeChange" @current-change="onPageIndexChange" :current-page="filter.page_index" :page-sizes="pageSizes" :page-size="filter.page_size" layout="total, sizes, prev, pager, next, jumper"
                               :total="filter.pageTotal">
                </el-pagination>
            </div>
        </div>


        <el-dialog
            title="修改备注"
            :visible.sync="dialogVisible"
            width="30%">

            <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入备注"
                v-model="descriptionFrom.description">
            </el-input>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="descSubmit">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import orderApi from '@/service/order.js'
    import storeSettingApi from '@/service/storeSetting.js'
    import {mapState} from "vuex";

    export default {
        name: "Service",
        props: {
            customer_id: {
                type: String,
                default: null
            },
        },
        computed: {
            ...mapState({
                themeColor: state=>state.app.themeColor
            })
        },
        data() {
            return {
                filter: {
                    customer_query: '',
                    order_type: null,
                    pay_type: null,
                    paid_amount_gt: null,
                    paid_amount_lt: null,
                    daterange: null,
                    pageTotal: null,
                    page_index: 1,
                    page_size: 10
                },
                orderTypeList: [
                    {"key": 1, "label": "品项"},
                    {"key": 2, "label": "办次卡"},
                    {"key": 3, "label": "办充值卡"},
                    {"key": 4, "label": "充值"}
                ],
                payTypeList: [
                    {"key": 1, "label": "现金"},
                    {"key": 2, "label": "会员余额"},
                    {"key": 3, "label": "组合"},
                ],
                customPayList: [],
                orderData: [],
                pageSizes: [5, 10, 20],
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const end = new Date(new Date(new Date().toLocaleDateString()).getTime());
                            const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
                            start.setTime(start.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '近7天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                dialogVisible: false,
                descriptionFrom: {}
            }
        },
        methods:{
            // 更改备注点击
            updateDescription(order_number, desc){
                this.descriptionFrom = {
                    order_number: order_number,
                    description: desc
                };
                this.dialogVisible = true
            },
            // 更改备注提交
            descSubmit(){
                this.updateOrdersDescription();
                this.dialogVisible = false
            },

            // 更改备注
            async updateOrdersDescription() {
                try {
                    const res = await orderApi.updateOrdersDescription(
                        this.descriptionFrom.order_number,
                        this.descriptionFrom.description
                    );
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '修改成功!',
                            offset: 60
                        })
                        this.getOrderList();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改备注失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

                // 搜索
            onSearchClick(){
                console.log(this.filter)
                this.getOrderList();
            },

            // 清空条件
            condClear() {
                this.filter.customer_query= '';
                this.filter.order_type = null;
                this.filter.pay_type = null;
                this.filter.paid_amount_gt = null;
                this.filter.paid_amount_lt = null;
                this.filter.daterange = null;
                this.getOrderList();
            },

            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 3 || columnIndex === 4 || columnIndex === 5) {
                    if(rowIndex === 0){
                        return {
                            rowspan: 999,
                            colspan: 1
                        };
                    }else{
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            },


            // 页数量变化
            onPageSizeChange(val) {
                this.filter.page_size = val;
                this.getOrderList();
            },

            // 页码变化
            onPageIndexChange(val) {
                this.filter.page_index = val;
                this.getOrderList();
            },

            // 获取订单列表
            async getOrderList(){
                if (this.customer_id){
                    this.filter.customer_id = this.customer_id
                }
                if (this.filter.daterange){
                    this.filter.start = this.filter.daterange[0] / 1000;
                    this.filter.end = this.filter.daterange[1]  / 1000;
                }else {
                    this.filter.start = null;
                    this.filter.end = null;
                }

                try {
                    const res = await orderApi.getOrderList(this.filter);
                    if (res.status >= 200 && res.status < 300) {
                        this.orderData = res.data.data;
                        this.filter.pageTotal = res.data.page.total
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取订单列表失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
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
        },
        mounted() {
            this.getOrderList();
            this.getCustomPayList()
        }
    }
</script>

<style scoped>

    .m-wrap-16 {
        margin: 7px;
        margin-bottom: 20px;
        padding: 24px;
        background: #fff;
    }

    .el-input {
        width: 200px;
    }

    .pagination-container {
        background: #fff;
        padding: 32px 16px;
    }

    .cond-row {
        display: flex;
        align-items:center;
        justify-content:flex-start;
        margin-bottom: 20px;
    }

    .cond-column {
        margin-right: 30px;
    }

    .order-head{
        display: flex;
        align-items:center;
        justify-content:space-between;
        color: #999;
        width: 100%;
        height: 40px;
        background: #f7f8fa;
        font-size: 0.9rem;
    }

    .order-head span{
        margin-left: 20px;
    }

    .order-desc{
        display: flex;
        align-items:center;
        color: #999;
        width: 100%;
        height: 30px;
        /*background: #f7f8fa;*/
        background: #fff7cc;
        border: 1px solid #ebedf0;
        margin-top: -1px;
        font-size: 0.9rem;
    }

    .interval-input{
        width: 100px;
    }

    .color-999{
        color: #999
    }

    .el-table >>> .el-table__body tr.current-row>td {
        background-color: #fff !important;
    }

    .el-table >>> .el-table__body tr:hover>td {
        background-color: #fff;
    }

</style>
