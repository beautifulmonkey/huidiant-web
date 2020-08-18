<template>
    <div class="ServiceDiv">
        <div class="m-wrap-16 cond-box">


            <div class="cond-row">
                <up-sert-customer-component @data-save="reloadData"></up-sert-customer-component>
            </div>


            <div class="cond-row">
                <div class="cond-column">
                    <div v-show="condition_details" class="title">关键字:</div>
                    <el-input style="width: 300px;" prefix-icon="el-icon-search" v-model="filter.query"
                              :size="!condition_details ? 'small': 'mini'" clearable placeholder="客户姓名/手机号"></el-input>
                </div>

                <div class="cond-column" v-show="!condition_details">
                    <el-button type="primary" size="small" @click="onSearchClick">搜索</el-button>
                </div>
            </div>

            <div v-show="condition_details">

                <div class="cond-row">
                    <div class="cond-column">
                        <div class="title">客户身份:</div>
                        <el-select v-model="filter.isvip" clearable placeholder="选择客户身份" size="mini" >
                            <el-option
                                    v-for="item in identityList"
                                    :key="item.key"
                                    :label="item.label"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>

<!--                <div class="cond-column">-->
<!--                    <span>持有卡项:&nbsp;</span>-->
<!--                    <el-select v-model="filter.category_id" clearable placeholder="选择持有卡项" size="mini" >-->
<!--                        <el-option-->
<!--                                v-for="item in categoryList"-->
<!--                                :key="item.id"-->
<!--                                :label="item.name"-->
<!--                                :value="item.id">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </div>-->


                <div class="cond-row">
                    <div class="cond-column">
                        <div class="title">客户来源:</div>
                        <el-select v-model="filter.source_id" clearable placeholder="选择客户来源" size="mini" >
                            <el-option :key=0 label="全部" :value=0></el-option>
                            <el-option
                                v-for="item in customerSourceList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>

                <div class="cond-row">
                <div class="cond-column">
                    <div class="title">累计消费:</div>
                    <el-input v-model="filter.consume_total_gt" class="interval-input" size="mini" clearable placeholder="金额大于" ></el-input>
                    <div class="limit-middle">至</div>
                    <el-input v-model="filter.consume_total_lt" class="interval-input" size="mini" clearable placeholder="金额小于" ></el-input>
                </div>
            </div>

                <div class="cond-row">

                    <div class="cond-column">
                        <div class="title">可用储值:</div>
                        <el-input v-model="filter.card_balance_gt" class="interval-input" size="mini" clearable placeholder="金额大于" ></el-input>
                        <div class="limit-middle">至</div>
                        <el-input v-model="filter.card_balance_lt" class="interval-input" size="mini" clearable placeholder="金额小于" ></el-input>
                    </div>
                </div>

                <div class="cond-row">
                    <div class="cond-column">
                        <div class="title">消费次数:</div>
                        <el-input v-model="filter.consume_count_gt" class="interval-input" clearable size="mini" placeholder="次数大于" ></el-input>
                        <div class="limit-middle">至</div>
                        <el-input v-model="filter.consume_count_lt" class="interval-input" clearable size="mini" placeholder="次数小于" ></el-input>
                    </div>
                </div>

                <div class="cond-row">
                    <div class="cond-column">
                        <div class="title">最后消费:</div>
                        <el-date-picker v-model="filter.last_consume_start" size="mini" :picker-options="pickerOptions"
                                        type="date" placeholder="时间大于" value-format="timestamp">
                        </el-date-picker>
                        <div class="limit-middle">至</div>
                        <el-date-picker v-model="filter.last_consume_end" size="mini" :picker-options="pickerOptions"
                                        type="date" placeholder="时间小于" value-format="timestamp">>
                        </el-date-picker>
                    </div>
                </div>

                <div class="cond-row">
                    <div class="cond-column">
                        <div class="title">注册时间:</div>
                        <el-date-picker :picker-options="pickerOptions" v-model="filter.created_at_start" size="mini" type="date" placeholder="时间大于" value-format="timestamp"></el-date-picker>
                        <div class="limit-middle">至</div>
                        <el-date-picker :picker-options="pickerOptions" v-model="filter.created_at_end" size="mini" type="date" placeholder="时间小于" value-format="timestamp"></el-date-picker>
                    </div>
                </div>

                <div class="cond-row">
                    <div class="cond-column">
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="onSearchClick">搜索</el-button>
                        <el-button icon="el-icon-refresh" size="mini" @click="condClear">清空条件</el-button>
                    </div>
                </div>

            </div>


            <div style="width: 100%;text-align: left">
                    <el-button type="text" v-if="!condition_details" icon="el-icon-arrow-down" @click="condition_details=true">高级选项</el-button>
                    <el-button type="text" v-if="condition_details" icon="el-icon-arrow-up" @click="condition_details=false">收起选项</el-button>
            </div>

        </div>

        <div class="m-wrap-16">
            <el-table
                    size="medium"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%;color: #3f393b"
            >

                <el-table-column fixed label="客户信息" width="170">
                    <template slot-scope="scope">
                        <div style="display: flex; align-items: center;justify-content: center">
                                <el-avatar :src="scope.row.img || defaultImg"></el-avatar>

                            <div style="margin-left: 10px;">
                                <el-button size="medium" type="text" style="color: #5a5e66">{{scope.row.name}}</el-button>
                                <i v-if="scope.row.sex===1" class="el-icon-female" style="color: #e6419c"></i>
                                <i v-if="scope.row.sex===2" class="el-icon-male" style="color: #409df3"></i>
                                <br>
                                <span>{{scope.row.tel}}</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column fixed label="客户身份" width="160">
                    <template slot-scope="scope">
                        <div>
                            <span>{{scope.row.identity}}</span><br>
                            <span style="color: #999">次卡:&nbsp;</span><span>{{scope.row.counting_card_length}}张</span><br>
                            <span style="color: #999">储值余额:&nbsp;</span><span>¥{{scope.row.card_balance}}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column prop="last_consume_day" label="最近消费" width="110"></el-table-column>
                <el-table-column prop="consume_count" label="消费次数" width="110"></el-table-column>
                <el-table-column prop="consume_total" label="累计消费(元)" width="110"></el-table-column>
                <el-table-column prop="created_at" label="注册时间"></el-table-column>
                <el-table-column prop="name" label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="$router.push('/customer/guest/details/' + scope.row.id)">详情</el-button>
                        <el-button size="mini" type="text" @click="$router.push({path: '/cashier', query: {uid: scope.row.id}})">开单</el-button>
                        <el-button size="mini" type="text" @click="onDeleteClick(scope.row)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>


            <div class="pagination-container">
                <el-pagination background @size-change="onPageSizeChange" @current-change="onPageIndexChange" :current-page="filter.page_index" :page-sizes="pageSizes" :page-size="filter.page_size" layout="total, sizes, prev, pager, next, jumper"
                               :total="filter.pageTotal">
                </el-pagination>
            </div>

        </div>
    </div>
</template>

<script>
    import customerApi from '@/service/customer.js'
    import upSertCustomerComponent from '@/views/Customer/upSertCustomer.vue'

    export default {
        name: "Service",
        components: {
            upSertCustomerComponent
        },
        data() {
            return {
                defaultImg: require('@/assets/img/user_smile.png'),
                condition_details: false,
                identityList: [
                    {"label": "全部", "key": ''},
                    {"label": "会员", "key": '1'},
                    {"label": "非会员", "key": '0'}
                ],
                customerSourceList: [],
                categoryList: [],
                tagList: [],
                filter: {
                    query: '',
                    isvip: null,
                    card_id: null,
                    source_id: null,
                    consume_total_gt: null,
                    consume_total_lt: null,
                    card_balance_gt: null,
                    card_balance_lt: null,
                    last_consume_start: null,
                    last_consume_end: null,
                    consume_count_gt: null,
                    consume_count_lt: null,
                    created_at_start: null,
                    created_at_end: null,
                    pageTotal: null,
                    page_index: 1,
                    page_size: 10
                },
                pageSizes: [10, 30, 50],
                tableData: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                }
            }
        },
        methods: {
            // 获取客户列表
            async getCustomerList(){
                try {
                    const res = await customerApi.getCustomerList(this.filter);
                    if (res.status >= 200 && res.status < 300) {
                        this.tableData = res.data.data;
                        this.filter.pageTotal = res.data.page.total
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

            // 获取客户来源列表
            async getCustomerSourceList(){
                try {
                    const res = await customerApi.getCustomerSourceList();
                    if (res.status >= 200 && res.status < 300) {
                        this.customerSourceList = res.data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取客户来源失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            async delCustomer(id) {
                try {
                    const res = await customerApi.delCustomer(id);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '删除客户成功!'
                        });
                        this.getCustomerList();
                    } else {
                        console.error('error', res.status);
                        this.$message({
                            type: 'error',
                            message: '删除客户失败!'
                        })
                    }
                } catch (error) {
                    console.error('error', error)
                }
            },

            // 删除客户
            onDeleteClick(item) {
                this.$confirm('此操作将删除该客户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.delCustomer(item.id)
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
            },

            // 页数量变化
            onPageSizeChange(val) {
                this.filter.page_size = val;
                this.getCustomerList()
            },

            // 页码变化
            onPageIndexChange(val) {
                this.filter.page_index = val;
                this.getCustomerList()
            },

            // 搜索
            onSearchClick(){
                console.log(this.filter)
                this.getCustomerList();
            },

            // 重新加载页面
            reloadData(id){
                this.getCustomerList();
            },

            // 清空条件
            condClear() {
                this.filter.query= '';
                this.filter.isvip = null;
                this.filter.card_id = null;
                this.filter.source_id = null;
                this.filter.consume_total_gt = null;
                this.filter.consume_total_lt = null;
                this.filter.card_balance_gt = null;
                this.filter.card_balance_lt = null;
                this.filter.last_consume_start = null;
                this.filter.last_consume_end = null;
                this.filter.consume_count_gt = null;
                this.filter.consume_count_lt = null;
                this.filter.created_at_start = null;
                this.filter.created_at_end = null;
                this.getCustomerList();
            }
        },

        mounted() {
            this.getCustomerList();
            this.getCustomerSourceList();
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

    .el-row {
        margin-bottom: 15px;
    }

    .el-input {
        width: 200px;
    }

    .pagination-container {
        background: #fff;
        padding: 32px 16px;
    }

    .cond-box {
        font-size: 15px;
    }

    .cond-row {
        display: flex;
        /*align-items:center;*/
        /*justify-content:flex-start;*/
        margin-bottom: 16px;
    }

    .cond-column {
        margin-right: 20px;
    }
    .cond-column .title {
        width: 80px;
        text-align: left;
        display: inline-block;
    }

    .interval-input{
        width: 200px;
    }
    .el-select {
        width: 200px;
    }

    .el-date-editor {
        width: 200px !important;
    }

    .limit-middle {
        display: inline;
        color: rgb(125, 126, 128);
        padding: 0 5px;
        font-size: 13px;
    }


</style>
