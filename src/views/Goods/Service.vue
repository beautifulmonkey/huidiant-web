<template>
    <div class="ServiceDiv">
        <div class="m-wrap-16">

            <el-row>
                <el-col :span="24"><div style="float: left">
                    <el-button size="small" icon="el-icon-plus" type="primary" @click="$router.push('/goods/service/add')">添加服务</el-button>
                    <el-button size="small" plain>管理分类</el-button>
                    <el-button size="small" plain>管理标签</el-button>
                </div></el-col>
            </el-row>

            <el-row>
                <el-col :span="24"><div style="float: left">
                    <el-select v-model="filter.category_id" clearable placeholder="选择分类" size="mini" >
                        <el-option
                                v-for="item in category"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>

                    <el-select v-model="filter.tag_id" clearable placeholder="选择标签" size="mini" >
                        <el-option
                                v-for="item in tag"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>

                    <el-input
                            v-model="filter.query"
                            size="mini"
                            placeholder="请输入内容"
                            prefix-icon="el-icon-search"
                            >
                    </el-input>
                    <el-button type="primary" icon="el-icon-search" size="mini" @click="onSearchClick">搜索</el-button>
                </div></el-col>
            </el-row>


        </div>

        <div class="m-wrap-16" style="margin-top: 50px;">
            <el-table
                    size="medium"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    >

                <el-table-column
                        prop="name"
                        label="服务">
                    <template slot-scope="scope">
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
<!--                <el-table-column-->
<!--                        prop="price"-->
<!--                        label="价格">-->

<!--                    <template slot-scope="scope">-->
<!--                        <el-tag type="warning" size="small">-->
<!--                            ￥ {{scope.row.price}}-->
<!--                        </el-tag>-->
<!--                    </template>-->
<!--                </el-table-column>-->

                <el-table-column prop="name" label="分类" show-overflow-tooltip></el-table-column>
                <el-table-column prop="name" label="标签" show-overflow-tooltip></el-table-column>
                <el-table-column
                        prop="name"
                        label="操作"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                v-if="!scope.row.disable"
                                size="mini"
                                type="text"
                                @click="serviceStatusChange(1, scope.row)">下架</el-button>

                        <el-button
                                v-if="scope.row.disable"
                                size="mini"
                                type="text"
                                @click="serviceStatusChange(0, scope.row)">上架</el-button>
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
    import serviceApi from '@/service/service.js'
    export default {
        name: "Service",
        data() {
            return {
                filter: {
                    query: '',
                    category_id: null,
                    tag_id: null,
                    pageTotal: 30,
                    page_index: 1,
                    page_size: 10
                },
                pageSizes: [10, 30, 50],
                category: [
                    {
                        "id": 4,
                        "name": "剪发"
                    },
                    {
                        "id": 5,
                        "name": "烫发"
                    }
                ],
                tag: [
                    {
                        "id": 1,
                        "name": "剪发"
                    },
                    {
                        "id": 2,
                        "name": "热销"
                    },
                    {
                        "id": 3,
                        "name": "烫发"
                    },
                    {
                        "id": 4,
                        "name": "染发"
                    }
                ],
                tableData: [
                    {
                    name: 'PPT精油',
                    price: 158,
                    disable: 1,

                }, {
                    name: '沐蔻丹发质还原',
                    price: 880,
                    disable: 0
                }, {
                    name: '极度受损发染膏',
                    price: 1280,
                        disable: 1
                }, {
                    name: '设计师剪发',
                    price: 38,
                        disable: 1
                }, {
                    name: '欧莱雅烫发',
                    price: 580,
                        disable: 1
                }, {
                    name: '首席剪发',
                    price: 58,
                        disable: 0
                }, {
                    name: '总监剪发',
                    price: 98,
                        disable: 1
                }, {
                    name: '设计师剪发',
                    price: 38,
                        disable: 1
                }]
            }
        },
        methods: {
            // async getServiceList(){
            //     this.listLoading = true;
            //     try {
            //         const res = await serviceApi.getServiceList(this.filter)
            //         if (res.status >= 200 && res.status < 300) {
            //             this.tableData = res.data.data
            //             this.filter.pageTotal = res.data.page.total
            //         } else {
            //             this.$message({
            //                 type: 'error',
            //                 message: '获取维护方式列表失败!'
            //             })
            //         }
            //     } catch (error) {
            //         console.log(error)
            //     }
            //     setTimeout(() => {
            //         // scrollTo(0, 800)
            //         this.listLoading = false
            //     }, 500)
            // }

            // 搜索
            onSearchClick() {
                try {
                    this.filter.page_index = 1;
                    // alert(JSON.stringify(this.filter))
                    // 接口异常 加了限制条件后总页数还是不变
                    this.getServiceList()
                } catch (error) {
                    console.log(error)
                }
            },

            // 删除服务
            onDeleteClick(item) {
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {

                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
            },

            // 服务上下架
            serviceStatusChange(disable, item) {
                if (disable === 0){

                } else {

                    this.$confirm('下架后无法在收银界面看到该服务, 可通过上架还原。是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                        .then(() => {

                        })
                        .catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消操作'
                            })
                        })

                }
            },

            // 页数量变化
            onPageSizeChange(val) {
                this.filter.page_size = val;
                this.getServiceList()
            },

            // 页码变化
            onPageIndexChange(val) {
                this.filter.page_index = val;
                this.getServiceList()
            },

            async getServiceList() {
                console.log("发送请求!")
                console.log(this.filter)
            }

        },

        mounted() {
            // this.getServiceList()
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
</style>
