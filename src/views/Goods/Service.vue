<template>
    <div class="ServiceDiv">
        <div class="m-wrap-16">

            <el-row>
                <el-col :span="24"><div style="float: left">
                    <el-button size="small" icon="el-icon-plus" type="primary" @click="$router.push('/goods/service/add')">添加服务</el-button>
                    <category-tag-component></category-tag-component>

                </div></el-col>
            </el-row>

            <el-row>
                <el-col :span="24"><div style="float: left">
                    <el-select v-model="filter.category_id" clearable placeholder="选择分类" size="mini" >
                        <el-option
                                v-for="item in categoryList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>

                    <el-select v-model="filter.tag_id" clearable placeholder="选择标签" size="mini" >
                        <el-option
                                v-for="item in tagList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>

                    <el-input
                            v-model="filter.query"
                            size="mini"
                            clearable
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

                <el-table-column prop="category_name" label="分类" show-overflow-tooltip></el-table-column>
                <el-table-column prop="tag_name_list" label="标签" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-tag size="small" class="m-wrap-5"
                                v-for="item in scope.row.tag_name_list">
                            {{item}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="操作"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="$router.push('/goods/service/edit/' + scope.row.id)">编辑</el-button>
                        <el-button
                                v-if="!scope.row.disable"
                                size="mini"
                                type="text"
                                @click="serviceStatusChange(scope.row.id, 1)">下架</el-button>

                        <el-button
                                v-if="scope.row.disable"
                                size="mini"
                                type="text"
                                @click="serviceStatusChange(scope.row.id, 0)">上架</el-button>
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
    import categoryTagApi from '@/service/categoryTag.js'
    import categoryTagComponent from '@/views/Goods/categoryTag.vue'

    export default {
        name: "Service",
        components: {
            categoryTagComponent
        },
        data() {
            return {
                categoryList: [],
                tagList: [],
                filter: {
                    query: '',
                    category_id: null,
                    tag_id: null,
                    pageTotal: 30,
                    page_index: 1,
                    page_size: 10
                },
                pageSizes: [5, 10, 30, 50],
                tableData: []
            }
        },
        methods: {
            async delService(id) {
                try {
                    const res = await serviceApi.delService(id);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '删除服务成功!'
                        });
                        this.getServiceList()
                    } else {
                        console.error('error', res.status)
                        this.$message({
                            type: 'error',
                            message: '删除服务失败!'
                        })
                    }
                } catch (error) {
                    console.error('error', error)
                }
            },
            // 获取服务列表
            async getServiceList(){
                try {
                    const res = await serviceApi.getServiceList(this.filter)
                    if (res.status >= 200 && res.status < 300) {
                        this.tableData = res.data.data
                        this.filter.pageTotal = res.data.page.total
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取服务列表失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 获取分类
            async getCategoryList(){
                try {
                    const res = await categoryTagApi.getCategoryList(1);
                    if (res.status >= 200 && res.status < 300) {
                        this.categoryList = res.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取分类列表失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 获取标签
            async getTagList(){
                try {
                    const res = await categoryTagApi.getTagList(1);
                    if (res.status >= 200 && res.status < 300) {
                        this.tagList = res.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取标签列表失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 上下架商品
            async updateServiceStatus(service_id, disable){
                const disable_map = {1: "下架", 0: "上架"};
                try {
                    const res = await serviceApi.updateServiceStatus(service_id, disable);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '服务' + disable_map[disable] + '成功!'
                        });
                        this.getServiceList()
                    } else {
                        console.error('error', res.status)
                        this.$message({
                            type: 'error',
                            message: '服务已' + disable_map[disable] + '!'
                        })
                    }
                } catch (error) {
                    console.error('error', error)
                }
            },

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
                        this.delService(item.id)
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
            },

            // 服务上下架
            serviceStatusChange(service_id, disable) {
                if (disable === 0){
                    this.updateServiceStatus(service_id, disable)
                } else {

                    this.$confirm('下架后无法在收银界面看到该服务, 可通过上架还原。是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                        .then(() => {
                            this.updateServiceStatus(service_id, disable)
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
            }

        },

        mounted() {
            this.getServiceList();
            this.getCategoryList();
            this.getTagList()
        }
    }
</script>

<style scoped>

    .m-wrap-16 {
        margin: 16px;
    }
    .m-wrap-5 {
        margin-right: 5px;
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
