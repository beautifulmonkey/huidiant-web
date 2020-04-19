<template>
    <div class="ServiceDiv">
        <div class="m-wrap-16">
            <div style="display: flex" class="">
                <el-button size="medium" icon="fa fa-plus" type="primary" @click="$router.push('/goods/service/add')">添加服务</el-button>
                <el-button size="medium" plain>管理分类</el-button>
                <el-button size="medium" plain>管理标签</el-button>

            </div>

<!--            todo: 如何放到右边-->
<!--            <div style="display: flex">-->
<!--                <el-input-->
<!--                        style="width: 200px; text-align: right"-->
<!--                        placeholder="请输入内容"-->
<!--                        prefix-icon="el-icon-search"-->
<!--                        v-model="input2">-->
<!--                </el-input>-->
<!--            </div>-->


            <div style="display: flex" class="p-wrap-16-top">
                <div>
                    <span>选择分类: </span>
                    <template slot="prepend">Http://</template>
                    <el-select v-model="value" clearable placeholder="选择分类" size="medium" >
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-left: 20px;">
                    <span>选择标签: </span>
                    <el-select v-model="value" clearable placeholder="选择标签" size="medium" >
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>

        <div class="m-wrap-16" style="margin-top: 50px;">
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
                        label="服务">
                    <template slot-scope="scope">
                        <div>{{scope.row.name}}
                            <el-tag type="success" size="mini" v-if="scope.row.type">
                                在售
                            </el-tag>

                            <el-tag type="danger" size="mini" v-if="!scope.row.type">
                                不在售
                            </el-tag>
                        </div>
                        <el-tag type="warning" size="small">
                            ￥ {{scope.row.price}}
                        </el-tag>



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
    import serviceApi from '@/service/service.js'
    export default {
        name: "Service",
        data() {
            return {
                filter: {
                    pageTotal: 0,
                    page_index: 1,
                    page_size: 10
                },
                options: [
                    {
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                search: '',
                tableData: [{
                    name: 'PPT精油',
                    price: 158,
                    type: 1,

                }, {
                    name: '沐蔻丹发质还原',
                    price: 880,
                    type: 0
                }, {
                    name: '极度受损发染膏',
                    price: 1280,
                    type: 1
                }, {
                    name: '设计师剪发',
                    price: 38,
                    type: 1
                }, {
                    name: '欧莱雅烫发',
                    price: 580,
                    type: 1
                }, {
                    name: '首席剪发',
                    price: 58,
                    type: 1
                }, {
                    name: '总监剪发',
                    price: 98,
                    type: 1
                }]
            }
        },
        methods: {
            async getServiceList(){
                this.listLoading = true;
                try {
                    const res = await serviceApi.getServiceList(this.filter)
                    if (res.status >= 200 && res.status < 300) {
                        this.tableData = res.data.data
                        this.filter.pageTotal = res.data.page.total
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取维护方式列表失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
                setTimeout(() => {
                    // scrollTo(0, 800)
                    this.listLoading = false
                }, 500)
            }
        },

        mounted() {
            this.getServiceList()
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


</style>
