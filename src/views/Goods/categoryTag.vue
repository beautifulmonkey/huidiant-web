<template>

    <div style="display: inline-block;margin-left: 10px;text-align: left">
        <el-button size="small" @click="btnClick('category')" plain>管理分类</el-button>
        <el-button size="small" @click="btnClick('tag')" plain>管理标签</el-button>

        <el-dialog
                :title="goods_mode_info + dialogTitle + '管理'"
                :visible.sync="dialogVisible"
                >


            <el-popover
                    placement="right"
                    trigger="click"
                    v-model="visible">
                    <el-input size="mini" v-model="Form.name"></el-input>
                    <div style="text-align: right; margin: 5px;">
                        <el-button size="mini" type="text" @click="clearBindData()">取消</el-button>
                        <el-button type="primary" size="mini" @click="addData()">确定</el-button>
                    </div>
                <el-button slot="reference" size="small" type="primary">{{'新建' + dialogTitle}}</el-button>
            </el-popover>


            <el-table
                    :data="tableData"
                    height="400"
            >
                <el-table-column
                        prop="name"
                        :label="dialogTitle + '名称'"
                        >
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="100"
                        >
                    <template slot-scope="scope">
<!--                        <el-button @click="handleClick(scope.row)" type="text" size="small">改名</el-button>-->
                        <el-popconfirm title="确定删除该数据吗？" @onConfirm="delData(scope.row.id)">
                            <el-button slot="reference" type="text" size="small">删除</el-button>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

    </div>
</template>

<script>

    import categoryTagApi from '@/service/categoryTag.js'

    export default {
        name: "categoryTagComponent",
        props: {
            goods_mode: {
                type: Number
            },
            goods_mode_info: {
                type: String
            }
        },
        data() {
            return {
                goods_type: '',
                visible: false,
                dialogTitle: '',
                dialogVisible: false,
                tableData: [],
                Form: {
                    name: '',
                    type: 1
                }
            };
        },
        methods: {
            btnClick(goods_type) {
                if (goods_type==="category"){
                    this.getCategoryList()
                }
                if (goods_type==="tag"){
                    this.getTagList()
                }
                const title_map = {"category": "分类", "tag": "标签"};
                this.goods_type = goods_type;
                this.dialogTitle = title_map[goods_type];
                this.dialogVisible = true
            },

            // 获取分类
            async getCategoryList(){
                try {
                    const res = await categoryTagApi.getCategoryList(this.goods_mode);
                    if (res.status >= 200 && res.status < 300) {
                        this.tableData = res.data
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
                    const res = await categoryTagApi.getTagList(this.goods_mode);
                    if (res.status >= 200 && res.status < 300) {
                        this.tableData = res.data
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

            // 添加
            async addData(){
                if (this.goods_type==="category"){
                    try {
                        const res = await categoryTagApi.addCategory(this.Form);
                        if (res.status >= 200 && res.status < 300) {
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            this.getCategoryList()
                        } else {
                            this.$message({
                                type: 'error',
                                message: '添加分类失败!'
                            })
                        }
                    } catch (error) {
                        console.log(error)
                    }

                } else if (this.goods_type==="tag"){
                    try {
                        const res = await categoryTagApi.addTag(this.Form);
                        if (res.status >= 200 && res.status < 300) {
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            this.getTagList()
                        } else {
                            this.$message({
                                type: 'error',
                                message: '添加标签失败!'
                            })
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }

                this.clearBindData()
            },

            // 删除数据
            async delData(id){
                if (this.goods_type==="category"){
                    try {
                        const res = await categoryTagApi.delCategory(id);
                        if (res.status >= 200 && res.status < 300) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getCategoryList()
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
                            })
                        }
                    } catch (error) {
                        console.log(error)
                    }

                } else if (this.goods_type==="tag"){
                    try {
                        const res = await categoryTagApi.delTag(id);
                        if (res.status >= 200 && res.status < 300) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getTagList()
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
                            })
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }

            },

            // 清空绑定数据
            clearBindData(){
                this.visible = false;
                this.Form.name = ''
            },

        },
        mounted() {
            this.Form.type = this.goods_mode
        }
    };
</script>

<style scoped>

</style>
