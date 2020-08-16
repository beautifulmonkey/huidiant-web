<template>
	<div class="m-wrap-16">
		<el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
			<el-menu-item index="send">发送短信</el-menu-item>
			<el-menu-item index="temp">模板申请</el-menu-item>
			<el-menu-item index="record">发送记录</el-menu-item>

			<span style="float: right;line-height: 60px;font-weight: 500">短信余量：<span style="color: #ff711c">{{sms_balance}}</span> 条</span>
		</el-menu>

		<div v-show="activeIndex==='send'">
			<el-form :model="ruleFormSend" :rules="rulesSend" ref="ruleFormSend">
				<div style="display: flex">
					<div>
						<el-form-item label="消息预览" label-width="100px">
							<div :style="sms_bgi_style" class="_1sylPCEh-4wyUtQfMS8d7_">
								<div class="container"><div>
									<div class="message-content">{{tempMsgPreview || '【云逍软件】 回T退订'}}</div>
								</div></div>
							</div>
						</el-form-item>
					</div>

					<div>
						<el-form-item label="" label-width="30px">
							<div class="warm_tips2">
								<p>① 发送时段为 8:00 ~ 22:00，其他时段发送会遭运营商拒绝；</p>
								<p>② 为保障您的营销短信发送成功率，建议发送100条以上的短信；</p>
								<p>③ 逢双十一、电商活动和节假日期间，发送量大，部分短信可能会出现短时间发送延迟，尽请谅解！</p>
							</div>
						</el-form-item>

						<el-form-item label="群发对象" label-width="100px" prop="send_target">
							<el-radio-group v-model="ruleFormSend.send_target">
								<el-radio label="input_tel">输入手机号</el-radio>
								<el-radio label="all_customer">全部客户</el-radio>
								<el-radio label="crowd" disabled>指定人群</el-radio>
							</el-radio-group>

							<div v-show="ruleFormSend.send_target==='input_tel'">
								<el-input class="from-item-input" rows="6" placeholder="一个手机号一行, 使用换行输入多个手机号" type="textarea" v-model="ruleFormSend.telData"></el-input>
								<div class="tip" style="color: #bbb;font-size: 12px;">
									已输入
									<span :style="{'--color': themeColor}" class="active">{{availableTelArray().length}}</span>
									个手机号
								</div>
							</div>
						</el-form-item>

						<el-form-item label="短信模板" label-width="100px" prop="temp_id">
							<el-select @change="chooseTemp" v-model="ruleFormSend.temp_id" placeholder="请选择已通过审核的短信模板" style="width: 300px;" :disabled="availableTempList.length === 0">
								<el-option
									v-for="item in availableTempList"
									:key="item.id"
									:label="item.temp_name"
									:value="item.id">
								</el-option>
							</el-select>
							<br>
							<span style="color: #999;">还未创建/未找到适合的模板？</span>
							<el-link @click="activeIndex='temp'" type="primary">申请新模板</el-link>
						</el-form-item>


						<el-form-item label="发送方式" label-width="100px">
							<el-radio-group v-model="send_way">
								<el-radio label="now" :disabled="!checkTimeSendStatus()">立即发送</el-radio>
								<el-radio label="timer" disabled>定时发送</el-radio>
							</el-radio-group>
						</el-form-item>

						<el-form-item label-width="100px">
							<el-button type="primary" :disabled="!checkTimeSendStatus()" plain @click="submitFormSend('ruleFormSend')">立即提交</el-button>
						</el-form-item>

					</div>
				</div>
			</el-form>
		</div>
		<div v-show="activeIndex==='temp'">
			<el-form :model="ruleFormTemp"  :rules="rulesTemp" ref="ruleFormTemp" >

				<el-form-item label="模板名称" label-width="100px" prop="temp_name">
					<el-input class="from-item-input" placeholder="仅用于商家记录, 客户不会看到" v-model="ruleFormTemp.temp_name"></el-input>
					<el-popover
						style="font-size: 40px;"
						placement="bottom"
						title="申请须知"
						width="400"
						trigger="hover">
						<p>1. 短信属于公众服务，受国家政策法规限制，具体审核结果，以运营商审核结果为准</p>
						<p>2. 开头的短信签名和结尾的“回T退订”为运营商要求，无法删除</p>
						<p>3. 运营商规定: 短信长度（签名+正文）不超过70字时，按照1条短信计费；超过70字即为长短信时，按67字/条分隔成多条计费。例如，短信长度为150字，则按照67字/67字/16字分隔成3条计费</p>
						<i  slot="reference" class="el-icon-info" style="font-size: 20px;color: #676767;line-height: 40px;"></i>
					</el-popover>
				</el-form-item>

				<div style="display: flex">
					<div>
						<el-form-item label="消息内容" label-width="100px">
							<div class="_1sylPCEh-4wyUtQfMS8d7_" :style="sms_bgi_style">
								<div class="container"><div>
									<div class="message-content">【{{ruleFormTemp.sign}}】{{ruleFormTemp.msg_data}} 回T退订</div>
								</div></div>
							</div>
						</el-form-item>
					</div>

					<div>
						<el-form-item label="" label-width="30px">
							<div class="warm_tips2">
								<i class="el-icon-warning icon"  style="color: #ef985e;font-size: 20px;"></i>
								<p>禁止发送色情、赌博、暴力、侵权及其他违法信息</p>
								<p>金融、教育、房地产、移民、建材游戏营销行业暂不支持发送</p>
							</div>
						</el-form-item>

						<el-form-item label="短信签名" label-width="100px" prop="sign">
							<div v-if="!editSign">
								<span>【{{ruleFormTemp.sign}}】</span>
								<el-button type="text" @click="updateSignName">修改</el-button>
							</div>
							<div v-else>
								<el-input style="width: 150px;margin-right: 15px;" class="from-item-input"
								          size="small" :value="ruleFormTemp.sign" v-model="editSignName"></el-input>
								<el-button size="small" type="text" @click="editSignNameSave">确定</el-button>
								<el-divider direction="vertical"></el-divider>
								<el-button size="small" type="text" @click="editSign=false">取消</el-button>
							</div>
						</el-form-item>

						<el-form-item label="短信内容" label-width="100px" prop="msg_data">
							<el-input class="from-item-input" rows="6" placeholder="请输入短信内容" type="textarea" v-model="ruleFormTemp.msg_data"></el-input>
							<div class="tip" style="color: #bbb;font-size: 12px;">已输入
								<span :style="{'--color': themeColor}" class="active">{{getMessageLength()}}</span>
								字（含签名和尾缀），按
								<span :style="{'--color': themeColor}" class="active">{{Math.ceil(getMessageLength() / 70)}}</span>
								条短信计费
							</div>
						</el-form-item>

						<el-form-item label-width="100px">
							<p style="color: #999;">人工审核会在1个小时内完成，请耐心等待（工作时间：9:00-20:00）</p>
							<el-button type="primary" plain @click="submitFormTemp('ruleFormTemp')">提交模板申请</el-button>
						</el-form-item>

					</div>
				</div>
			</el-form>

			<el-card style="margin: 50px 0;">

				<el-button size="mini" type="primary" style="margin: 10px;" @click="getTempList">刷新</el-button>
				<el-table
					:data="tempList"
					v-loading="loadingTemp"
					style="width: 100%;min-height: 500px;">

					<el-table-column
						prop="created_at"
						label="申请时间" width="180px;">
					</el-table-column>
					<el-table-column
						prop="temp_id"
						label="模板ID" width="120px;">
					</el-table-column>
					<el-table-column
						prop="temp_name"
						label="模板名称" width="150px;">
					</el-table-column>
					<el-table-column
						prop="msg_data"
						label="模板内容"
						show-overflow-tooltip>
						<template slot-scope="scope">
							【{{scope.row.sign}}】{{scope.row.msg_data}}
						</template>
					</el-table-column>
					<el-table-column
						prop="status_info"
						label="审核状态" width="150px;">
					</el-table-column>
					<el-table-column
						prop="ReviewReply"
						label="未通过原因"
						show-overflow-tooltip width="250px;">
					<template slot-scope="scope">
							{{scope.row.ReviewReply || '-'}}
						</template>
					</el-table-column>
					<el-table-column
						fixed="right"
						label="操作"
						width="100">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="onDeleteClick(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>

				<div class="pagination-container">
					<el-pagination background @size-change="onPageSizeChangeTemp" @current-change="onPageIndexChangeTemp" :current-page="filterTemp.page_index" :page-sizes="[10, 20]" :page-size="filterTemp.page_size" layout="total, sizes, prev, pager, next, jumper"
					               :total="filterTemp.pageTotal">
					</el-pagination>
				</div>
			</el-card>

		</div>
		<div v-show="activeIndex==='record'">
			<el-table
				:data="recordList"
				style="width: 100%">

				<el-table-column
					prop="created_at"
					label="发送时间"
					width="200">
				</el-table-column>
				<el-table-column
					prop="sms_type"
					label="短信类型"
					width="130">
				</el-table-column>
				<el-table-column
					label="发送人数/手机号"
					width="180"
					show-overflow-tooltip>
					<template slot-scope="scope">
						<div style="width: 30px;">{{scope.row.tel_count}}人</div>
					</template>
				</el-table-column>
				<el-table-column
					prop="fee"
					label="消耗余量"
					width="130">
					<template slot-scope="scope">
						<div style="width: 30px;">{{scope.row.fee}}条</div>
					</template>
				</el-table-column>

				<el-table-column
					prop="msg"
					label="短信内容">
				</el-table-column>

				<el-table-column
					prop="send_status"
					label="状态"
					width="160">
				</el-table-column>
			</el-table>

			<div class="pagination-container">
				<el-pagination background @size-change="onPageSizeChangeRecord" @current-change="onPageIndexChangeRecord" :current-page="filterRecord.page_index" :page-sizes="[10, 20]" :page-size="filterRecord.page_size" layout="total, sizes, prev, pager, next, jumper"
				               :total="filterRecord.pageTotal">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
    import {mapState} from "vuex";
    import SmsApi from '@/service/sms.js'

    export default {
        name: "Sms",
	    data() {
            return {
                sms_bgi_style: {
                    background:`url(${require('@/assets/img/sms_preview.png')})`,
                    backgroundSize: `435px 654px`
                },

                activeIndex: 'send',
                sms_balance: 0,

	            // temp
                filterTemp: {
                    page_index: 1,
                    page_size: 10,
                    pageTotal: null
                },
                ruleFormTemp: {
                    temp_name: '',
                    sign: '云逍软件',
                    msg_data: ''
                },
                editSign: false,
                editSignName: '',
                rulesTemp: {
                    temp_name: [
                        { required: true, message: '请输入模板名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    sign: [
                        { required: true, message: '请输入签名内容', trigger: 'blur' },
                        { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
                    ],
                    msg_data: [
                        { required: true, message: '请输入短信内容', trigger: 'blur' },
                    ],
                },
                tempList: [],
                loadingTemp: false,

	            // send
                availableTempList: [],
                send_way: 'now',
	            tempMsgPreview: '',
                rulesSend: {
                    send_target: [
                        { required: true, trigger: 'blur' }
                    ],
                    temp_id: [
                        { required: true, message: '请选择短信模板', trigger: 'blur' },

                    ]
                },
                ruleFormSend: {
                    send_target: 'input_tel',
                    telData: '',
                    tel_list: [],
                    temp_id: null
                },

	            // record
                filterRecord: {
                    page_index: 1,
                    page_size: 10,
                    pageTotal: null
                },
                recordList: []
            }
	    },
	    methods: {
            handleSelect(key, keyPath) {
                this.activeIndex = key;
	            if (key === "temp"){
                    this.getTempList()
                }else if (key === "record"){
	                this.getSendRecord()
	            }
            },
		    getMessageLength(){
                return this.ruleFormTemp.msg_data.length + this.ruleFormTemp.sign.length + 2 + 5
		    },
            updateSignName(){
                this.editSign=true;
                this.editSignName=this.ruleFormTemp.sign
            },
            editSignNameSave(){
                this.editSign=false;
                this.ruleFormTemp.sign = this.editSignName
            },
		    // 当前时间是否可以发送短信  true:可发送   false:不可发
		    checkTimeSendStatus(){
                let hour = new Date().getHours();
                return hour > 8 && hour < 22;
		    },
			// 获取有效的发送电话列表
            availableTelArray(){
                let telArray = this.ruleFormSend.telData.split("\n");
                let availableArray = [];
                telArray.forEach((item,index,array)=>{
                    if((/^1(3|4|5|6|7|8|9)\d{9}$/.test(item)) === true){
                        availableArray.push(item)
					}
                });
	            return availableArray
            },
            // 申请模板
            submitFormTemp(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.sms_balance <= 0){
                            this.$notify.error({
                                title: '申请失败',
                                message: '您的短信余量不足! 请联系软件提供商进行充值'
                            });
                            return false
                        }

                        if (this.ruleFormTemp.sign !== '云逍软件'){
                            let info = "短信签名【" + this.ruleFormTemp.sign + "】需要运营商审核! 请联系软件提供商办理相关证明 (建议使用默认签名【云逍软件】无需审核)";
                            this.$alert(info, '模板申请失败 (签名需审核)', {
                                confirmButtonText: '确定'
                            });
                            return false
                        }
                        this.ruleFormTemp.sms_count = Math.ceil(this.getMessageLength() / 70);
	                    console.log(this.ruleFormTemp)
						this.addTemp()

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
		    // 发送短信
            submitFormSend(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
	                    let alert_txt = "";
                        if (this.ruleFormSend.send_target === 'input_tel'){
                            let tel_list = this.availableTelArray();
                            if (!this.ruleFormSend.telData){
                                return this.$message.error('请输入手机号!');
                            }
                            if (!tel_list.length){
                                return this.$message.error('未识别到手机号!');
                            }
                            this.ruleFormSend.tel_list = tel_list;

                            alert_txt = '您即将群发给指定客户, 确定继续?'
                        } else if (this.ruleFormSend.send_target === 'all_customer'){
                            alert_txt = '您即将群发给全部客户, 确定继续?'
                        }
                        if(this.sms_balance <= 0){
                            this.$notify.error({
                                title: '发送失败',
                                message: '您的短信余量不足! 请联系软件提供商进行充值'
                            });
                            return false
                        }

                        this.$confirm(alert_txt, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.batchSend()
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消发送'
                            });
                            return false
                        });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            // 获取模板列表
            async getTempList(){
                this.loadingTemp = true;
                try {
                    const res = await SmsApi.getTempList(this.filterTemp);
                    if (res.status >= 200 && res.status < 300) {
                        this.tempList = res.data.data;
                        this.filterTemp.pageTotal = res.data.page.total
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取模板失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
                this.loadingTemp = false;
            },
            // 申请模板
            async addTemp(){
                try {
                    const res = await SmsApi.addTemp(this.ruleFormTemp);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            message: '已提交申请, 请耐心等待...',
                            type: 'success'
                        });
                        this.getTempList()
                    } else {
                        this.$message({
                            type: 'error',
                            message: '申请模板失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            // 删除模板
            async delTemp(id){
                try {
                    const res = await SmsApi.delTemp(id);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            message: '删除模板成功!',
                            type: 'success'
                        });
                        this.getTempList()
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除模板失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            // 删除模板
            onDeleteClick(item) {
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.delTemp(item.id)
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
            },

            // 页数量变化
            onPageSizeChangeTemp(val) {
                this.filterTemp.page_size = val;
                this.getTempList()
            },
            // 页码变化
            onPageIndexChangeTemp(val) {
                this.filterTemp.page_index = val;
                this.getTempList()
            },

            // 页数量变化
            onPageSizeChangeRecord(val) {
                this.filterRecord.page_size = val;
                this.getSendRecord()
            },
            // 页码变化
            onPageIndexChangeRecord(val) {
                this.filterRecord.page_index = val;
                this.getSendRecord()
            },


            // 获取审核过的模板
            async getAvailableTempList(){
                try {
                    const res = await SmsApi.getAvailableTempList();
                    if (res.status >= 200 && res.status < 300) {
                        this.availableTempList = res.data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取模板失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 选择模板,获取单条数据
            async chooseTemp(id){
                try {
                    const res = await SmsApi.getTempOne(id);
                    if (res.status >= 200 && res.status < 300) {
                        this.tempMsgPreview = "【" + res.data.sign + "】" + res.data.msg_data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取模板失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            // 群发
            async batchSend(){
                try {
                    const res = await SmsApi.batchSend(this.ruleFormSend);
                    if (res.status >= 200 && res.status < 300) {
                        this.$message({
                            message: '发送成功!',
                            type: 'success'
                        });
                        this.handleSelect("record", "");
                        this.smsBalance()
                    } else {
                        this.$message({
                            type: 'error',
                            message: '发送失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

		    // 获取发送记录
		    async getSendRecord(){
                try {
                    const res = await SmsApi.sendRecord(this.filterRecord);
                    if (res.status >= 200 && res.status < 300) {
						this.recordList = res.data.data;
                        this.filterRecord.pageTotal = res.data.page.total;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取记录失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
		    },

            // 获取短信余量
            async smsBalance(){
                try {
                    const res = await SmsApi.smsBalance();
                    if (res.status >= 200 && res.status < 300) {
                        this.sms_balance = res.data.sms_balance;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取短信余量失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            }

        },
        computed:{
            ...mapState({
                themeColor: state=>state.app.themeColor
            })
        },
	    mounted() {
            this.getAvailableTempList();
		    this.smsBalance();
        }
    }
</script>

<style scoped>
	.m-wrap-16 {
		margin: 7px;
		padding: 16px;
		text-align: left;
		background: #fff;
		height: 100%;
	}

	.el-menu{
		margin-bottom: 30px;
	}

	.from-item-input {
		width: 300px;
	}

	._1sylPCEh-4wyUtQfMS8d7_ {
		width: 435px;
		height: 654px;
		position: relative;
	}

	._1sylPCEh-4wyUtQfMS8d7_ .container {
		position: absolute;
		left: 35px;
		top: 170px;
		width: 375px;
		height: 390px;
		overflow: scroll;
		background: transparent;
	}
	._1sylPCEh-4wyUtQfMS8d7_ .container .message-content {
		position: relative;
		display: inline-block;
		max-width: 260px;
		padding: 10px 20px;
		font-size: 16px;
		line-height: 20px;
		background: #e5e5ea;
		border-radius: 17px;
		color: #000;
		margin-bottom: 15px;
		margin-left: 10px;
		word-break: break-all;
		white-space: pre-wrap;
	}

	._1sylPCEh-4wyUtQfMS8d7_ .container .message-content:before {
		content: "";
		position: absolute;
		z-index: 2;
		bottom: -2px;
		left: -7px;
		height: 20px;
		border-left: 20px solid #e5e5ea;
		border-bottom-right-radius: 16px 14px;
		-webkit-transform: translateY(-2px);
		transform: translateY(-2px);
	}
	._1sylPCEh-4wyUtQfMS8d7_ .container .message-content:after {
		content: "";
		position: absolute;
		z-index: 3;
		bottom: -2px;
		left: 4px;
		width: 26px;
		height: 20px;
		background: #fff;
		border-bottom-right-radius: 10px;
		-webkit-transform: translate(-30px,-2px);
		transform: translate(-30px,-2px);
	}

	.warm_tips2 {
		display: inline-block;
		background: rgba(255,250,238,1);
		border: 1px solid rgba(245,228,185,1);
		border-radius: 2px;
		text-align: left;
		font-size: 13px;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: rgba(102,102,102,1);
		line-height: 20px;
		position: relative;
		margin-bottom: 18px;
		padding-right: 20px;
	}
	.warm_tips2 .icon {
		width: 16px;
		height: 16px;
		background: url(/image/smsPlatform/sms_icon.png?v=202004131631) no-repeat 0 -193px;
		display: inline-block;
		vertical-align: text-top;
		margin-right: 10px;
		position: absolute;
		left: 20px;
		top: 13px;
	}
	.warm_tips2 p {
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		margin-left: 46px;
	}

	.tip .active {
		color: var(--color) !important;
	}

	.pagination-container{
		width: 100%;
		text-align: center;
		margin: 20px;
	}
	.el-divider {
		height: 15px!important;
	}
</style>
