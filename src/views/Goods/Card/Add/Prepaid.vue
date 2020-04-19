<template>
    <div>
        <div class="m-wrap-8">
            <el-page-header @back="$router.push('/goods/card')" content="添加充值卡"></el-page-header>
        </div>

        <div>

            <div class="m-wrap-from" style="width: 40%">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                    <el-form-item label="名称" prop="name">
                        <el-input v-model="ruleForm.name" class="from-item-input"></el-input>
                    </el-form-item>

                    <el-form-item label="充值金额" prop="name">
                        <el-input v-model="ruleForm.name" class="from-item-input">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="赠送金额" prop="name">
                        <el-input v-model="ruleForm.name" class="from-item-input">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="权益" prop="name">
                        <el-button type="text" @click="dialogVisible = true">添加权益</el-button>
                    </el-form-item>


                    <el-form-item label="有效时间" prop="region">
                        <el-radio v-model="radio" label="1">备选项</el-radio>
                        <el-radio v-model="radio" label="2">
                            <el-input v-model="ruleForm.name" style="width: 200px">
                                <template slot="append">天</template>
                            </el-input>
                        </el-radio>
                    </el-form-item>

                    <el-form-item label="标签" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="请选择活动区域" class="from-item-input">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="服务时长" prop="time">
                        <el-select v-model="ruleForm.time" placeholder="请选择活动区域" class="from-item-input">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>


                    <!--                todo: 保存时关闭当前标签页-->
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>        </div>

<!--            todo: 高度50%如何定义-->
            <el-dialog
                    title="添加权益"
                    width="70%"
                    :visible.sync="dialogVisible"
                    >
                <el-row
                        style="height: 500px;">
                    <el-col :span="8">
                        <el-input
                                clearable
                                placeholder="输入关键字进行过滤"
                                v-model="filterText">
                        </el-input>
                        <el-tree
                                style="font-size: 100px;"
                                :data="data"
                                node-key="id"
                                ref="tree"
                                show-checkbox
                                @check-change="handleCheckChange"
                                :filter-node-method="filterNode"
                                :check-strictly	="true"
                                :props="defaultProps">
                        </el-tree>
                    </el-col>
                    <el-col :span="16">
                        <el-table
                                empty-text="未定义任何权益"
                                :data="tableData">
                            <el-table-column
                                    prop="name"
                                    label="已选">
                            </el-table-column>
                            <el-table-column
                                    prop="price"
                                    label="售价">
                            </el-table-column>
                            <el-table-column
                                    prop="rule"
                                    label="优惠设置">
                                <template slot-scope="scope">
                                    <el-input size="small">
                                        <template slot="append">折</template>
                                    </el-input>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="handle"
                                    label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                            @click.native.prevent="deleteRow(scope.$index, tableData)"
                                            type="text"
                                            size="small">
                                        移除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div style="margin-top: 20px">
                            <el-button @click="dialogVisible = false"添加权益>取 消</el-button>
                            <el-button type="primary" @click="dialogVisible = false">保 存</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Prepaid",
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            handleCheckChange(data, checked, indeterminate) {
                // debugger
                this.tableData.push({
                    "name": data.label,
                    "price": "-",
                    "rule": 33,
                    "handle":33
                })
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            }
        },
        data() {
            return {
                radio: '',
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    time: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                },
                input1: '10',
                dialogVisible: false,
                filterText: '',
                data: [
                    {
                    id: 1,
                    label: '所有服务',
                    children: [{
                        id: 4,
                        label: '烫发',
                        children: [{
                            id: 9,
                            label: '欧莱配方烫发'
                        }, {
                            id: 10,
                            label: '健康配方烫发'
                        }]
                    },
                    {
                        id: 11,
                        label: '剪发',
                        children: [{
                            id: 12,
                            label: '总监剪发'
                        }, {
                            id: 13,
                            label: '首席剪发'
                        }]
                    }
                    ]
                }, {
                    id: 2,
                    label: '所有产品',
                    children: [{
                        id: 5,
                        label: '洗发水',
                        children: [{
                            id: 14,
                            label: '施华蔻洗发水'
                        }, {
                            id: 15,
                            label: '阿立德洗发水'
                        }]
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '所有次卡',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
                tableData: [
                    {
                        "name": "烫发",
                        "price": "-",
                        "rule": 33,
                        "handle":33
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        }
    }
</script>

<style scoped>
    .m-wrap-8 {
        margin: 8px;
    }

</style>
