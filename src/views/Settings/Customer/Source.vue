<template>
	<div style="text-align: left">
		<div class="m-wrap-16">
			<el-popover
				placement="right"
				trigger="click"
				v-model="visible">
				<el-input size="mini" v-model="Form.name" placeholder="请输入来源名称"></el-input>
				<div style="text-align: right; margin: 5px;">
					<el-button size="mini" type="text" @click="clearBindData()">取消</el-button>
					<el-button type="primary" size="mini" @click="addData()">确定</el-button>
				</div>
				<el-button slot="reference" size="small" type="primary">新建</el-button>
			</el-popover>

		<el-table
			:data="customerSourceList"
		>
			<el-table-column
				prop="name"
				width="400"
				label="名称"
			>
				<template slot-scope="scope">
					<span v-if="editId!==scope.row.id">{{scope.row.name}}</span>
					<div v-else>
						<el-input size="mini" style="width: 200px;" :value="scope.row.name"
						          v-model="editName"></el-input><br>

						<el-button size="small" type="text" @click="editNameSave">确定</el-button>
						<el-divider direction="vertical"></el-divider>
						<el-button size="small" type="text" @click="editId=null">取消</el-button>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				label="操作"
			>
				<template slot-scope="scope" v-if="editId!==scope.row.id">
					<el-button @click="updateName(scope.row)" type="text" size="small">改名</el-button>
					<el-popconfirm title="确定删除该数据吗？" @onConfirm="delData(scope.row.id)">
						<el-button slot="reference" type="text" size="small">删除</el-button>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
		</div>

	</div>
</template>

<script>
    import customerApi from '@/service/customer.js'

    export default {
        name: "Source",
	    data(){
            return {
                editId:null,
                editName: '',
                visible: false,
                Form: {
                    name: ''
                },
                customerSourceList: []
            }
	    },
	    methods: {
            // 清空绑定数据
            clearBindData(){
                this.visible = false;
                this.Form.name = ''
            },

            updateName(row){
                this.editId=row.id;
                this.editName=row.name
            },

            // 修改保存
            editNameSave(){
                this.updateData();
                this.editId=null
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

            // 改名
            async updateData(){
                try {
                    const res = await customerApi.updateCustomerSource(this.editId, this.editName);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        this.getCustomerSourceList();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }

            },


            // 添加
            async addData(){
                if (!this.Form.name){
                    this.$message.error('来源名称不能为空!');
					return
                }
                try {
                    const res = await customerApi.addCustomerSource(this.Form);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        this.getCustomerSourceList();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '添加失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
                this.clearBindData()
            },

            // 删除数据
            async delData(id){
                try {
                    const res = await customerApi.delCustomerSource(id);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getCustomerSourceList();
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
        mounted() {
            this.getCustomerSourceList();
        }
    }
</script>

<style scoped>
	.m-wrap-16 {
		margin-left: 16px;
		margin-right: 16px;
		margin-top: 16px;
	}

	.el-divider {
		height: 15px !important;
	}
</style>
