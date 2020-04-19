<template>
    <div class="Card">
        <div class="m-wrap-16 table-head">
            <div style="display: flex" class="">

                <el-popover
                        placement="bottom"
                        title="选择卡项"
                        trigger="click"
                        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">

                    <div>
                        <el-radio-group v-model="radio1" @change="radioChange">
                            <el-radio-button label="/goods/card/add/numbers">次卡</el-radio-button>
                            <el-radio-button label="/goods/card/add/prepaid">充值卡</el-radio-button>
                        </el-radio-group>
                    </div>

                    <el-button slot="reference" size="medium" icon="fa fa-plus" type="primary">添加卡项</el-button>
                </el-popover>

            </div>
        </div>

        <div class="m-wrap-16 table-body" >
            <el-tabs type="card" @tab-click="handleClick">
                <el-tab-pane label="全部卡类"></el-tab-pane>
                <el-tab-pane label="充值卡"></el-tab-pane>
                <el-tab-pane label="次卡"></el-tab-pane>
            </el-tabs>
            <el-table
                    size="medium"
                    ref="multipleTable"
                    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    tooltip-effect="dark"
                    style="width: 100%"
                    >
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        sortable
                        sort-by="price"
                        prop="name"
                        label="卡项">
                    <template slot-scope="scope">
                        <div class="card-img" style="width: 70px; height: 50px; float: left">
                            <img v-if="!scope.row.type" class="" style="width: 50px;height: 50px; border-radius: 5px" :src="require('@/assets/img/ck.png')" />
                            <img v-if="scope.row.type" class="" style="width: 50px;height: 50px; border-radius: 5px" :src="require('@/assets/img/czk.png')" />
                        </div>
                        <div style="float: left; height: 50px; text-align: center">
                            <div style="padding: 10px">
                                {{scope.row.name}}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <!--                <el-table-column-->
                <!--                        sortable-->
                <!--                        prop="price"-->
                <!--                        label="价格">-->
                <!--                </el-table-column>-->

                <el-table-column
                        prop="name"
                        label="分类"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="标签"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input
                                clearable
                                v-model="search"
                                size="mini"
                                placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                v-if="scope.row.type"
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">下架</el-button>

                        <el-button
                                v-if="!scope.row.type"
                                size="mini"
                                type="success"
                                @click="handleDelete(scope.$index, scope.row)">上架</el-button>

                    </template>
                </el-table-column>

            </el-table>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Card",
        data() {
            return {
                radio1: '',
                search: '',
                tableData: [
                    {
                        name: '才子金卡',
                        price: 158,
                        type: 1,

                    }, {
                        name: '沐蔻丹发质还原',
                        price: 880,
                        type: 0
                    }, {
                        name: '才子银卡',
                        price: 1280,
                        type: 1
                    }, {
                        name: '发货HEN头皮周期',
                        price: 38,
                        type: 0
                    }, {
                        name: '才子钻石卡',
                        price: 580,
                        type: 1
                    }, {
                        name: '剪发卡',
                        price: 58,
                        type: 0
                    }
                ]
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            radioChange(url) {
                this.$router.push(url)
            }
        }
    }
</script>

<style scoped>
    .m-wrap-16 {
        margin: 16px;
    }
    .p-wrap-16-top {
        padding-top: 16px;
    }
    .el-divider--horizontal {
        margin: 5px;
    }
    .card-img {
        /*background-image: url("@/assets/user.png");*/
    }


</style>
