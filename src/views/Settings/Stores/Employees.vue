<template>
	<div class="padding-20">
		<el-tabs v-model="activeName" @tab-click="tabClick">
			<el-tab-pane name="em" label="员工列表">
				<el-button size="small" type="primary" @click="addBtnEM">添加员工</el-button>

				<el-table :data="EMList" >
					<el-table-column prop="name" label="姓名"></el-table-column>
					<el-table-column prop="sex" label="性别"></el-table-column>
					<el-table-column prop="tel" label="手机号"></el-table-column>
					<el-table-column prop="professional_title" label="职称"></el-table-column>
					<el-table-column prop="id_card_number" label="身份证号"></el-table-column>
					<el-table-column prop="address" label="联系地址"></el-table-column>
					<el-table-column prop="description" label="备注"></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button @click="editBtn(scope.row.id)" type="text" size="small">编辑</el-button>
							<el-popconfirm title="确定删除该数据吗？" @onConfirm="delEM(scope.row.id)">
								<el-button slot="reference" type="text" size="small">删除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane name="pt" label="职称管理">
				<el-popover
					placement="right"
					trigger="click"
					v-model="visiblePT">
					<el-input size="mini" v-model="FormPT.name" placeholder="请输入职称名称"></el-input>
					<div style="text-align: right; margin: 5px;">
						<el-button size="mini" type="text" @click="clearBindData()">取消</el-button>
						<el-button type="primary" size="mini" @click="addPT()">确定</el-button>
					</div>
					<el-button slot="reference" size="small" type="primary">添加职称</el-button>
				</el-popover>

				<el-table :data="PTList" >
					<el-table-column prop="name" label="名称">
						<template slot-scope="scope">
							<span v-if="editIdPT!==scope.row.id">{{scope.row.name}}</span>
							<div v-else>
								<el-input size="mini" style="width: 200px;" :value="scope.row.name"
								          v-model="editNamePT"></el-input><br>

								<el-button size="small" type="text" @click="editNameSavePT">确定</el-button>
								<el-divider direction="vertical"></el-divider>
								<el-button size="small" type="text" @click="editIdPT=null">取消</el-button>
							</div>
						</template>
					</el-table-column>

					<el-table-column label="操作">
						<template slot-scope="scope" v-if="editIdPT!==scope.row.id">
							<el-button @click="updateNamePT(scope.row)" type="text" size="small">改名</el-button>
							<el-popconfirm title="确定删除该数据吗？" @onConfirm="delDataPT(scope.row.id)">
								<el-button slot="reference" type="text" size="small">删除</el-button>
							</el-popconfirm>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>


		<el-dialog title="添加员工" :visible.sync="dialogFormVisibleEM">

			<el-form :model="ruleFormEM" :rules="rulesEM" ref="ruleFormEM" label-width="100px">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="ruleFormEM.name" class="from-item-input" size="mini"></el-input>
				</el-form-item>

				<el-form-item label="性别" prop="sex">
					<div style="float:left;">
						<el-radio v-model="ruleFormEM.sex" :label="2"><i class="el-icon-male" style="color: #409df3"></i>男</el-radio>
						<el-radio v-model="ruleFormEM.sex" :label="1"><i class="el-icon-female" style="color: #e6419c"></i>女</el-radio>
					</div>
				</el-form-item>

				<el-form-item label="手机号" prop="tel">
					<el-input type="text" placeholder="请输入内容" v-model="ruleFormEM.tel" class="from-item-input" size="mini"
					          maxlength="11" show-word-limit>
					</el-input>
				</el-form-item>
				<el-form-item label="职称" prop="professional_title">
					<el-select v-model="ruleFormEM.professional_title" placeholder="请选择" size="mini">
						<el-option
							v-for="item in PTList"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="身份证号码" prop="id_card_number">
					<el-input v-model="ruleFormEM.id_card_number" class="from-item-input" size="mini" maxlength="18" show-word-limit></el-input>
				</el-form-item>
				<el-form-item label="联系地址" prop="address">
					<el-input v-model="ruleFormEM.address" type="textarea" class="from-item-input" size="mini"></el-input>
				</el-form-item>

				<el-form-item label="备注" prop="description">
					<el-input v-model="ruleFormEM.description" type="textarea" class="from-item-input" size="mini"></el-input>
				</el-form-item>


			</el-form>


			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleEM = false">取 消</el-button>
				<el-button type="primary" @click="submitFormEM('ruleFormEM')">保 存</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>

    import storeSettingEmApi from '@/service/storeSettingEm.js'

    export default {
        name: "Employees",
        data() {
            return {
                activeName: 'em',
                visiblePT: false,
	            editId: null,
                editIdPT: null,
                editNamePT: '',
                dialogFormVisibleEM: false,
                ruleFormEM: {
                    name: "",
                    sex: 2,
	                tel: "",
                    professional_title: null,
                    id_card_number: null,
                    address: null,
                    description: null
                },
                FormPT: {
                    name: null
                },
                EMList: [],
                PTList: [],

                rulesEM: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, trigger: 'blur' },
                    ],
                    professional_title: [
                        { required: true, trigger: 'blur' , message: '请选择职称'},
                    ],
                    tel: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        {
                            validator:(rule,value,callback)=>{
                                if(value != ""){
                                    if((/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) == false){
                                        callback(new Error("请输入正确的手机号"));
                                    }else{
                                        callback();
                                    }
                                }else{
                                    callback();
                                }

                            },
                            trigger: 'blur'
                        }
                    ]
                }
            };
        },
        methods: {
            tabClick(tab, event) {
                this.activeName = tab.name
            },


            // 保存员工
            submitFormEM(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.editId){
                            // 路由有客户id为修改
                            this.editEM()
                        }else {
                            // 路由无id为添加
                            this.addEM()
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            // 添加员工
            async addEM() {
                try {
                    const res = await storeSettingEmApi.addEM(this.ruleFormEM);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '添加成功!',
                            offset: 60
                        });
                        this.dialogFormVisibleEM = false;
                        this.getEMList();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '添加失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 修改员工
            async editEM() {
                try {
                    const res = await storeSettingEmApi.updateEM(this.editId, this.ruleFormEM);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '修改成功!',
                            offset: 60
                        });
                        this.dialogFormVisibleEM = false;
                        this.getEMList();
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

            // 删除员工
            async delEM(id) {
                try {
                    const res = await storeSettingEmApi.delEM(id);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                            offset: 60
                        });
                        this.getEMList();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 获取员工列表
            async getEMList(){
                try {
                    const res = await storeSettingEmApi.getEMList();
                    if (res.status >= 200 && res.status < 300) {
                        this.EMList = res.data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取员工列表失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },


            // 获取单个员工
            async getEMOne(id){
                try {
                    const res = await storeSettingEmApi.getEMOne(id);
                    if (res.status >= 200 && res.status < 300) {
                        this.ruleFormEM = res.data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取员工失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 获取职称列表
            async getPTList(){
                try {
                    const res = await storeSettingEmApi.getPTList();
                    if (res.status >= 200 && res.status < 300) {
                        this.PTList = res.data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取职称列表失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 添加职称
            async addPT() {
                if (!this.FormPT.name){
                    this.$message.error('名称不能为空!');
                    return
                }

                try {
                    const res = await storeSettingEmApi.addPT(this.FormPT);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '添加成功!',
                            offset: 60
                        });
                        this.getPTList();
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

            // 职称改名
            async updateDataPT(){
                try {
                    const res = await storeSettingEmApi.updatePT(this.editIdPT, {name: this.editNamePT});
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        this.getPTList();
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

            // 删除职称
            async delDataPT(id){
                try {
                    const res = await storeSettingEmApi.delPT(id);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getPTList();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 修改保存
            editNameSavePT(){
                this.updateDataPT();
                this.editIdPT=null
            },

            addBtnEM(){
                this.editId = null;
                this.ruleFormEM = {
                    name: "",
                    sex: 2,
                    tel: "",
                    professional_title: null,
                    id_card_number: "",
                    address: "",
                    description: ""
                };
                this.dialogFormVisibleEM=true;
            },

            updateNamePT(row){
                this.editIdPT=row.id;
                this.editNamePT=row.name
            },

            editBtn(id){
                this.editId = id;
                this.getEMOne(id);
                this.dialogFormVisibleEM=true;
            },

            clearBindData(){
                this.visiblePT = false;
                this.FormPT.name = ''
            }
        },
        mounted() {
            this.getEMList();
            this.getPTList();
        }
    }
</script>

<style scoped>
	.padding-20{
		text-align: left;
		padding: 20px;
	}

	.el-divider {
		height: 15px !important;
	}
</style>
