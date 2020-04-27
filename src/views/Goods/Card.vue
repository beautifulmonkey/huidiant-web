<template>
    <div class="Card">
        <div class="m-wrap-16 table-head">

            <el-row>
                <el-col :span="24"><div style="float: left">
                    <el-popover
                            placement="bottom"
                            title="选择卡项类型"
                            trigger="click">

                        <div>
                            <el-radio-group v-model="cardType" @change="radioChange">
                                <el-radio-button label="/goods/card/counting/add">次卡</el-radio-button>
                                <el-radio-button label="/goods/card/prepaid/add">充值卡</el-radio-button>
                            </el-radio-group>
                        </div>

                        <el-button size="small" icon="el-icon-plus" slot="reference" type="primary">添加卡项</el-button>

                    </el-popover>
                </div></el-col>
            </el-row>

        </div>

        <div class="m-wrap-16 table-body" >
            <el-tabs type="card" @tab-click="tabsClick" v-model="activeName" >
                <el-tab-pane label="全部卡类" name='-1'></el-tab-pane>
                <el-tab-pane label="充值卡" name='1'></el-tab-pane>
                <el-tab-pane label="次卡" name='2'></el-tab-pane>
            </el-tabs>
            <el-table
                    size="medium"
                    :data="tableData"
                    >
                <el-table-column
                        prop="name"
                        label="卡项">
                    <template slot-scope="scope">
                        <div class="card-img" style="width: 70px; height: 50px; float: left">
                            <img v-if="scope.row.type===2" class="" style="width: 50px;height: 50px; border-radius: 5px" :src="require('@/assets/img/ck.png')" />
                            <img v-if="scope.row.type===1" class="" style="width: 50px;height: 50px; border-radius: 5px" :src="require('@/assets/img/czk.png')" />
                        </div>
                            <div>{{scope.row.name}}
                                <el-tag type="success" size="mini" v-if="!scope.row.disable">
                                    在售
                                </el-tag>

                                <el-tag type="danger" size="mini" v-if="scope.row.disable">
                                    下架中
                                </el-tag>
                                <br>
                                <el-tag type="warning" size="small">
                                    ￥ {{scope.row.price}}
                                </el-tag>
                            </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="validity"
                        label="有效期">
                </el-table-column>
                <el-table-column
                        prop="type_details"
                        label="套餐类型">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                size="mini"
                                @click="$router.push('/goods/card/prepaid/edit/' + scope.row.id)"
                                >编辑</el-button>

                        <el-button size="mini" type="text">详情</el-button>

                        <el-button
                                v-if="!scope.row.disable"
                                size="mini"
                                type="text"
                                @click="cardStatusChange(scope.row.id, 1)">下架</el-button>

                        <el-button
                                v-if="scope.row.disable"
                                size="mini"
                                type="text"
                                @click="cardStatusChange(scope.row.id, 0)">上架</el-button>

                        <el-button size="mini" type="text"  @click="onDeleteClick(scope.row)">删除</el-button>


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
    import cardApi from '@/service/card.js'

    export default {
        name: "Card",
        data() {
            return {
                cardType: '',
                activeName: '-1',
                filter: {
                    type: -1,
                    pageTotal: null,
                    page_index: 1,
                    page_size: 10
                },
                search: '',
                tableData: [],
                pageSizes: [10, 30, 50],
            }
        },
        methods: {
            tabsClick(tab, event) {
                this.filter.page_index = 1
                this.filter.type = tab.name;
                this.getCardList()
            },
            radioChange(url) {
                this.$router.push(url)
            },

            // 删除卡项
            onDeleteClick(item) {
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.delCard(item.id)
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
            },

            // 删除卡项
            async delCard(id) {
                try {
                    const res = await cardApi.delCard(id);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '删除卡项成功!'
                        });
                        this.getCardList()
                    } else {
                        console.error('error', res.status)
                        this.$message({
                            type: 'error',
                            message: '删除卡项失败!'
                        })
                    }
                } catch (error) {
                    console.error('error', error)
                }
            },


            // 卡项上下架
            cardStatusChange(card_id, disable) {
                if (disable === 0){
                    this.updateCardStatus(card_id, disable)
                } else {

                    this.$confirm('下架后无法在收银界面看到该卡项, 可通过上架还原。是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                        .then(() => {
                            this.updateCardStatus(card_id, disable)
                        })
                        .catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消操作'
                            })
                        })

                }
            },

            // 上下架卡项
            async updateCardStatus(card_id, disable){
                const disable_map = {1: "下架", 0: "上架"};
                try {
                    const res = await cardApi.updateCardStatus(card_id, disable);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '卡项' + disable_map[disable] + '成功!'
                        });
                        this.getCardList()
                    } else {
                        console.error('error', res.status)
                    }
                } catch (error) {
                    console.error('error', error)
                }
            },

            // 获取卡项列表
            async getCardList(){
                try {
                    const res = await cardApi.getCardList(this.filter);
                    if (res.status >= 200 && res.status < 300) {
                        this.tableData = res.data.data;
                        this.filter.pageTotal = res.data.page.total
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

            // 页数量变化
            onPageSizeChange(val) {
                this.filter.page_size = val;
                this.getCardList()
            },

            // 页码变化
            onPageIndexChange(val) {
                this.filter.page_index = val;
                this.getCardList()
            }

        },
        mounted(){
            this.getCardList()
        }
    }
</script>

<style scoped>
    .m-wrap-16 {
        margin: 16px;
    }

</style>
