<template>
    <div>
        <el-button type="text" style="float: left" @click="rightsAdd">添加权益</el-button>

        <el-dialog
                title="提示"
                width="100vh"
                :visible.sync="dialogVisible">
            <el-col :span="24">
                <div style="float: left">
                    <el-select v-model="filter.category_id" clearable placeholder="选择分类" size="mini" >
                        <el-option
                                v-for="item in categoryList"
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
                </div>
            </el-col>

            <el-col :span="24">
                <div style="float: left">
                    <strong>已选:</strong>
                    <el-tag
                            closable
                            @close="rmServiceRow(service.id)"
                            style="margin-left: 5px;"
                            v-for="service in checkServiceRow"
                            :key="service.id">
                        {{service.name}}
                    </el-tag>
                </div>
            </el-col>

            <div class="m-wrap-16" style="margin-top: 50px;">
                <el-table
                        size="medium"
                        :data="tableData"
                        height="50vh"
                        style="font-weight: normal">
                    <el-table-column prop="name" label="服务"></el-table-column>
                    <el-table-column prop="price" label="价格">
                        <template slot-scope="scope">
                            ￥ {{scope.row.price}}
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="name"
                            label="操作"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" @click="checkServiceRowAdd(scope.row)">添加</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>


            <div class="pagination-container">
                <el-pagination background @size-change="onPageSizeChange" @current-change="onPageIndexChange" :current-page="filter.page_index" :page-sizes="pageSizes" :page-size="filter.page_size" layout="total, sizes, prev, pager, next, jumper"
                               :total="filter.pageTotal">
                </el-pagination>
            </div>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="rightsSubmit">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
    import serviceApi from '@/service/service.js'
    import categoryTagApi from '@/service/categoryTag.js'
    export default {
        name: "servcieChooseDialog",
        props: {
        },
        data () {
            return {
                filter: {
                    query: '',
                    category_id: null,
                    pageTotal: null,
                    page_index: 1,
                    page_size: 10
                },
                tableData: [],
                checkServiceRow: [],
                checkServiceReal: [],  // todo: 不管用
                categoryList: [],
                pageSizes: [5, 10, 30, 50],
                dialogVisible: false
            }
        },
        methods: {
            // 添加权益
            rightsAdd(){
                 console.log(this.checkServiceRow)
                // this.checkServiceRow = this.checkServiceReal;
                this.dialogVisible = true
            },

            // 初始化
            initRight(data){
                data.forEach((item,index,array)=>{
                    this.checkServiceRow.push({
                        id: item.service_id,
                        name: item.name
                    })
                });
            },

            // 保存当前编辑权益
            rightsSubmit(){
                // this.checkServiceRowReal = this.checkServiceRow;
                this.dialogVisible = false;
                this.$emit('return-value', this.checkServiceRow);
            },

            // 标签移除
            rmServiceRow(id){
                this.checkServiceRow = this.checkServiceRow.filter(item => item.id !== id)
            },
            // 添加行
            checkServiceRowAdd(row) {
                let tab = this.checkServiceRow.filter(item => item.id === row.id)
                if (tab.length === 0) {
                    this.checkServiceRow.push(row)
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
            this.getCategoryList();
            this.getServiceList();
        }
    }
</script>

<style scoped>
    .el-input {
        width: 200px;
    }
    .el-table__header-wrapper  .el-checkbox{
    display:none
    }
</style>
