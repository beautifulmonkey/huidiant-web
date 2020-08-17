<template>
	<div>

		<div class="m-wrap-from">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="名称" prop="name">
					<el-input v-model="ruleForm.name" class="from-item-input" size="small"></el-input>
				</el-form-item>

				<el-form-item label="充值金额" prop="price">
					<div class="item-align-center">
						<el-input v-model="ruleForm.price" class="from-item-input" size="small">
							<template slot="prepend">￥</template>
						</el-input>
					</div>
				</el-form-item>

				<el-form-item label="权益" prop="rule" style="width: 100vh;">
					<el-button type="text" @click="rightsAdd" style="float: left" v-if="!rightsRealData.length">添加权益</el-button>
					<el-button type="text" @click="rightsAdd" style="float: left" v-if="rightsRealData.length">编辑权益</el-button>
					<el-table
						v-if="rightsRealData.length"
						size="mini"
						:data="rightsRealData">
						<el-table-column
							prop="label"
							label="已选"
							width="180">
						</el-table-column>
						<el-table-column
							prop="price"
							label="优惠规则">
							<template slot-scope="scope">
								<span v-if="!scope.row.isgoods_item">{{scope.row.value}} 折</span>
								<span v-if="scope.row.isgoods_item&&scope.row.mode==='discount'">{{scope.row.value}} 折</span>
								<span v-if="scope.row.isgoods_item&&scope.row.mode==='price'">{{scope.row.value}} 元</span>
							</template>
						</el-table-column>
					</el-table>
				</el-form-item>


				<!--                    todo: 购卡赠送-->
				<!--                    <el-form-item label="购卡赠送" prop="gift">-->
				<!--                        <el-button type="text" @click="dialogVisible = true">添加赠送</el-button>-->
				<!--                    </el-form-item>-->

				<el-form-item label="有效时间" prop="valid_days">
					<div class="item-align-center" style="width: 300px">
						<el-radio-group v-model="valid_days_type" @change="ruleForm.valid_days=null">
							<el-radio label="-1" >永久有效</el-radio>
							<el-radio label="1">&nbsp;</el-radio>
						</el-radio-group>
						<el-input style="width: 150px;" v-model="ruleForm.valid_days" size="small" :disabled="valid_days_type==='-1'">
							<template slot="append">天</template>
						</el-input>
					</div>
				</el-form-item>

				<el-form-item label="描述" prop="description">
					<el-input type="textarea" v-model="ruleForm.description"></el-input>
				</el-form-item>

				<el-form-item>
					<div v-if="!$route.params.id" style="float: left">
						<el-button type="primary" @click="prepaidSubmitForm('ruleForm')" size="medium">立即创建</el-button>
						<el-button @click="resetForm('ruleForm')" size="medium">重置</el-button>
					</div>
					<div v-else style="float: left">
						<el-button type="primary" @click="prepaidSubmitForm('ruleForm')" size="medium">保存</el-button>
					</div>
				</el-form-item>
			</el-form>
		</div>


		<!--            todo: 高度50%如何定义-->
		<el-dialog
			:close-on-click-modal="false"
			title="添加权益"
			width="90%"
			:visible.sync="dialogVisible"
		>
			<el-row>
				<el-col :span="8">
					<el-input
						style="width: 100%;"
						clearable
						placeholder="输入关键字进行过滤"
						v-model="filterText">
					</el-input>

					<!--                        todo: 元素如溢出何滚动条显示?-->
					<el-tree
						node-key="code"
						ref="tree"
						show-checkbox
						@check-change="handleCheckChange"
						:data="goodsTreeData"
						:filter-node-method="filterNode"
						:check-strictly	="true"
						:props="defaultProps">
					</el-tree>
				</el-col>
				<el-col :span="16">
					<el-table
						height="50vh"
						empty-text="未定义任何权益"
						:data="rightsTableData">
						<el-table-column
							prop="label"
							label="已选">
						</el-table-column>
						<el-table-column
							prop="price"
							label="售价">
							<template slot-scope="scope">
								<span v-if="scope.row.isgoods_item">￥{{scope.row.price}}</span>
								<span v-else>-</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="rule"
							width="300px;"
							label="优惠设置">
							<template slot-scope="scope">
								<el-input size="mini" placeholder="请输入内容" v-model="scope.row.value" style="width: 180px;"
								          oninput="value=value.replace(/[^\d.]/g,'')">
									<template slot="append">
										<el-select v-model="scope.row.mode" size="mini" style="width: 60px">
											<el-option label="折" value="discount"></el-option>
											<el-option :disabled="!scope.row.isgoods_item" label="元" value="price"></el-option>
										</el-select>
									</template>
								</el-input>
								<span v-if="errorCheck[scope.row.code]" class="rightsErr">{{errorCheck[scope.row.code]}}</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="handle"
							label="操作"
						width="200px;">
							<template slot-scope="scope">
								<el-button
									@click.native.prevent="deleteRow(scope.$index, scope.row.code)"
									type="text"
									size="small">
									移除
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div style="margin-top: 20px">
						<el-button @click="dialogVisible = false">取 消</el-button>
						<el-button type="primary" @click="rightsSubmit">保 存</el-button>
					</div>
				</el-col>
			</el-row>
		</el-dialog>

	</div>

</template>

<script>
    import cardApi from '@/service/card.js'

    export default {
        name: "SubComp",
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        data() {
            return {
                valid_days_type: "-1",
                ruleForm: {
                    type: 1,
                    name: '',
                    price: null,
                    valid_days: null,
                    description: '',
                    rule: {'rights_list': []}
                },

                rules: {
                    name: [
                        { required: true, message: '请输入卡项名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请输入充值金额', trigger: 'blur' },
                        {
                            validator:(rule,value,callback)=>{
                                if(value != ""){
                                    if((/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/).test(value) == false){
                                        callback(new Error("充值金额为数字且不能小于0"));
                                    }else{
                                        callback();
                                    }
                                }else{
                                    callback();
                                }

                            },
                            trigger: 'blur'
                        }
                    ],
                    rule: [
                        {
                            validator:(rule,value,callback)=>{
                                if(!this.rightsRealData.length){
                                    callback(new Error("至少添加一项卡权益"));
                                }else{
                                    callback();
                                }

                            },
                            trigger: 'blur',
                            required: true
                        }
                    ],
                    valid_days: [
                        {
                            validator:(rule,value,callback)=>{
                                if(this.valid_days_type !== '-1'){
                                    if (!value){
                                        callback(new Error("有效时间需为大于0，小于3650的整数"));
                                    }
                                    if((/^(([1-9]{1}\d*)|(0{1}))?$/).test(value) == false || value>3650){
                                        callback(new Error("有效时间需为大于0，小于3650的整数"));
                                    }else{
                                        callback();
                                    }
                                }else{
                                    callback();
                                }

                            },
                            trigger: 'blur',
                            required: true
                        }
                    ]
                },
                dialogVisible: false,
                filterText: '',

                codeMap:{},
                goodsTreeData: [],
                rightsTableData: [],
                rightsRealData: [],
                errorCheck: {},

                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },

	    methods: {
            deepClone(obj) {
                return JSON.parse(JSON.stringify(obj));
            },

            resetForm(formName) {
                this.rightsTableData = [];
                this.rightsRealData = [];
                this.$refs[formName].resetFields();
            },

            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },


            // 保存当前编辑权益
            rightsSubmit(){
                this.errorCheck = {};
                this.rightsTableData.forEach((right_item,index,array)=> {
                    let r_value = parseFloat(right_item.value);
                    if(!r_value){
                        this.errorCheck[right_item.code] = "内容不能为空";
                    }else if (right_item.mode==='discount' && r_value > 10){
                        this.errorCheck[right_item.code] = "请输入正确的折扣，例如8.8";
                    }else if (right_item.mode==='price' && r_value > right_item.price){
                        this.errorCheck[right_item.code] = "指定价不能超过商品价格";
                    }
                });
                if (Object.keys(this.errorCheck).length){
                    this.$message.error('优惠设置不正确!');
                }else{
                    this.rightsRealData = this.deepClone(this.rightsTableData);
                    this.dialogVisible = false
                }
            },

            // 添加权益
            rightsAdd(){
                this.rightsTableData = this.deepClone(this.rightsRealData);
                this.dialogVisible = true;
                this.$nextTick(() => {
                    let check_node = [];
                    for (let ite of this.rightsTableData) {
                        check_node.push(ite.code)
                    }
                    this.$refs.tree.setCheckedKeys(check_node);
                });
            },


            // 树状结构勾选
            handleCheckChange(data, checked, indeterminate) {
                if (checked) {
                    // 添加权益
                    let isgoods_item = false;
                    if (data.price){
                        isgoods_item = true
                    }
                    this.rightsTableData = this.rightsTableData.filter(item => item.code !== data.code);
                    this.rightsTableData.unshift({
                        id: data.id,
                        code: data.code,
                        price: data.price,
                        label: data.label,
                        type: data.type,
                        value: 10,
                        mode: "discount",
                        isgoods_item: isgoods_item
                    })
                }else {
                    // 删除权益
                    this.rightsTableData = this.rightsTableData.filter(item => item.code !== data.code)
                }
            },

            // 移除单条权益
            deleteRow(index, code) {
                this.rightsTableData.splice(index, 1);
                this.$refs.tree.setChecked(code, false);

            },

			// 表单提交
            prepaidSubmitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.rightsRealData.forEach((right_item,index,array)=>{

                            // label(名称), price(原价)不存入数据库
                            const result = {
                                "code": right_item.code,
                                "id": right_item.id,
                                "isgoods_item": right_item.isgoods_item,
                                "type": right_item.type,
                                "mode": right_item.mode,
                                "value": right_item.value
                            };
                            if (right_item.mode === "discount") {
                                result.discount = parseFloat(right_item.value)
                            }else if (right_item.mode === "price") {
                                result.price = parseFloat(right_item.value)
                            }
                            this.ruleForm.rule.rights_list.push(result)
                        });

                        if (this.valid_days_type === '-1'){
                            this.ruleForm.valid_days = -1
                        }
                        if (this.$route.params.id){
                            this.updatePrepaidCard()
                        }else {
                            this.addPrepaidCard()
                        }

                    } else {
                        return false;
                    }
                });
            },

            // 添加充值卡
            async addPrepaidCard() {
                try {
                    const res = await cardApi.addCard(this.ruleForm);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '添加充值卡成功!',
                            offset: 60
                        });
                        this.$router.push("/goods/card")
                    } else {
                        this.$message({
                            type: 'error',
                            message: '添加充值卡失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },


            // 修改充值卡
            async updatePrepaidCard() {
                try {
                    const res = await cardApi.updateCard(this.$route.params.id, this.ruleForm);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            type: 'success',
                            message: '修改充值卡成功!',
                            offset: 60
                        });
                        this.$router.push("/goods/card")
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改充值卡失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },


            // 递归获取code码和商品价格,名称的map
            recursiveCodeMap(data) {
                data.forEach((item,index,array)=>{
                    if(item.children && item.children.length >= 1){
                        this.recursiveCodeMap(item.children)
                    }
                    let price = "-";
                    if (item.price) {
                        price = item.price;
                    }
                    this.codeMap[item.code] = {
                        'label': item.label || '-',
                        'price': price
                    }
                });
            },

            // 获取商品树结构
            async getGoodsTree(){
                try {
                    const res = await cardApi.getGoodsTree();
                    if (res.status >= 200 && res.status < 300) {
                        this.goodsTreeData = res.data;

                        if (this.$route.params.id){
                            this.recursiveCodeMap(res.data)
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取商品树失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },


            // 获取单个卡
            async getCardOne(){
                await this.getGoodsTree();
                try {
                    const res = await cardApi.getCardOne(this.$route.params.id);
                    if (res.status >= 200 && res.status < 300) {
                        this.ruleForm = res.data;
                        this.rightsRealData = res.data.rule.rights_list;
                        this.ruleForm.rule = {'rights_list': []};

                        this.rightsRealData.forEach((item,index,array)=>{
                            item.label = this.codeMap[item.code].label;
                            item.price = this.codeMap[item.code].price
                        });
                        if(res.data.valid_days!==-1){
                            this.valid_days_type = "1";
                        }else{
                            this.ruleForm.valid_days = null;
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取卡项失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            }


        },


        mounted() {
            if (this.$route.params.id){
                this.getCardOne();
            }else {
                this.getGoodsTree();
            }
        }

    }
</script>

<style scoped>

	.m-wrap-from {
		margin: 40px;
	}
	.from-item-input {
		/*width: 400px;*/
		width: 100%;
	}

	.el-form-item {
		font-weight: 700
	}
	.el-input {
		width: 300px;
	}
	.el-select {
		width: 300px;
	}
	.el-textarea {
		width: 400px;
	}
	.item-align-center {
		display: flex;
		align-items: center;
		height: 40px;
	}
	.rightsErr{
		color: #f55e5b;
		font-size: 12px;
	}
</style>
