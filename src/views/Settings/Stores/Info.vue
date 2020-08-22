<template>
	<div class="m-wrap-16">
		<div class="title">门店信息</div>

		<div style="margin-top: 30px;" class="data-info">
			<div style="display: flex"><div class="zent-form__control-label">门店名称：</div>{{info.stores_name}}</div>
			<div style="display: flex"><div class="zent-form__control-label">门店logo：</div>
				<div class="team-logo">
					<img :src="info.img_url || defaultImg" role="presentation" alt="">
				</div>
			</div>
			<div style="display: flex"><div class="zent-form__control-label">主营类目：</div>美发店</div>
			<div style="display: flex"><div class="zent-form__control-label">门店地址：</div>{{info.stores_address || '-'}}</div>
			<div style="display: flex"><div class="zent-form__control-label">门店简介：</div>{{info.stores_info || '-'}}</div>
			<div style="display: flex"><div class="zent-form__control-label">负责人电话：</div>{{info.tel}}</div>
			<div style="display: flex"><div class="zent-form__control-label"></div>
				<el-button @click="editBtn" type="primary" plain size="medium">编辑</el-button>
			</div>
		</div>

		<div class="title">地图定位</div>

		<div style="width: 90%;margin: 30px;">
			<el-input v-model="addressKeyword" style="width: 400px;margin-bottom: 20px;" size="small" placeholder="请输入地址来直接查找相关位置"></el-input>
			<baidu-map class="bmView" :scroll-wheel-zoom="true" :center="location" :zoom="zoom" @click="getLocationPoint" ak="F5g7TtwB3sBzNS7AKWvtCQTtCqlxxtGw">
				<bm-view style="width: 100%; height:500px; flex: 1;margin-bottom: 50px;"></bm-view>
				<bm-local-search :keyword="addressKeyword" :auto-viewport="true" style="display: none"></bm-local-search>
			</baidu-map>
		</div>

		<el-dialog title="店铺信息" :visible.sync="dialogFormVisible">

			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="门店名称" prop="stores_name">
					<el-input v-model="ruleForm.stores_name" class="from-item-input" size="small"></el-input>
				</el-form-item>

				<el-form-item label="门店logo" prop="name">

					<el-upload :action="uploadAction" :headers="headers" list-type="picture-card" :file-list="fileList"
					           :multiple="false" :class="{'disabled':uploadDisabled()}"
					           :on-remove="handleRemove"
					           :on-success="handleUploadSuccess"
					           :before-upload="handleBeforeUpload"
					           :on-error="handleUploadError">
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>

				<el-form-item label="门店地址" prop="stores_address">
					<el-input :rows="3" type="textarea" v-model="ruleForm.stores_address" class="from-item-input" size="small"></el-input>
				</el-form-item>

				<el-form-item label="门店简介" prop="info">
					<el-input :rows="3" type="textarea" v-model="ruleForm.stores_info" class="from-item-input" size="small"></el-input>
				</el-form-item>

				<el-form-item label="主营类目">
					<el-input disabled value="美发店" class="from-item-input" size="small"></el-input>
				</el-form-item>
				<el-form-item label="负责人电话" prop="tel">
					<el-input disabled :value="info.tel" class="from-item-input" size="small"></el-input>
				</el-form-item>

			</el-form>


			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="SubmitForm('ruleForm')">保 存</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>

    import storeSettingApi from '@/service/storeSetting.js'
    import config from '@/config/env.js'

    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
    import BmView from 'vue-baidu-map/components/map/MapView.vue'
    import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch.vue'

    export default {
        name: "Info",
        components: {
            BaiduMap,
            BmView,
            BmLocalSearch
        },
        data () {
            return {
                defaultImg: require('@/assets/img/public_stores_logo.jpeg'),
                fileList: [],
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                    // token为系统访问需要的,放在header中
                },
                uploadAction: `${config.server.url}/utils/img`,

                info: {},
                dialogFormVisible: false,
                ruleForm: {},
                rules: {
                    stores_name: [
                        { required: true, message: '请输入门店名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                },
                location: {
                    lng: 116.404,
                    lat: 39.915
                },
                zoom: 13,
                addressKeyword: "",
            }
        },

	    methods: {
            editBtn(){
                this.ruleForm = {
                    stores_name: this.info.stores_name,
                    stores_address: this.info.stores_address,
                    stores_info: this.info.stores_info,
                    img: this.info.img
                };
                if (this.info.img){
                    this.fileList = [{
                        "url": this.info.img_url
                    }]
                }
                this.dialogFormVisible=true;
            },

            // 修改店铺信息
            SubmitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
						this.updateStoreInfo();
                        this.dialogFormVisible = false;
                    } else {
                        return false;
                    }
                });
            },

            // 获取门店信息
            async getStoreInfo(changeSession){
                try {
                    const res = await storeSettingApi.getStoreInfo();
                    if (res.status >= 200 && res.status < 300) {
                        this.info = res.data;
                        // 防止异步
                        if (changeSession){
                            let userInfo = JSON.parse(localStorage.userInfo);
                            userInfo.stores_name = this.info.stores_name;
                            userInfo.stores_address = this.info.stores_address;
                            userInfo.stores_info = this.info.stores_info;
                            userInfo.img_url = this.info.img_url;
                            localStorage.userInfo = JSON.stringify(userInfo)
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取数据失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },


            // 修改门店信息
            async updateStoreInfo(){
                try {
                    const res = await storeSettingApi.updateStoreInfo(this.ruleForm);
                    if (res.status >= 200 && res.status < 300) {
                        this.getStoreInfo(true);
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改数据失败!'
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            getLocationPoint(e) {
                this.lng = e.point.lng;
                this.lat = e.point.lat;
                /* 创建地址解析器的实例 */
                let geoCoder = new BMap.Geocoder();
                /* 获取位置对应的坐标 */
                geoCoder.getPoint(this.addressKeyword, point => {
                    this.selectedLng = point.lng;
                    this.selectedLat = point.lat;
                });
                /* 利用坐标获取地址的详细信息 */
                geocoder.getLocation(e.point, res => {
                    console.log(res);
                })
            },

            // 移除图片
            handleRemove(file, fileList) {
                this.ruleForm.img = null;
                this.fileList = [];
            },
            // 上传成功
            handleUploadSuccess(response, file, fileList) {
                this.ruleForm.img = response.key
            },
            // 拦截文件上传
            handleBeforeUpload(file) {
                const isJPG = file.type === 'image/jpeg'
                const isPNG = file.type === 'image/png'
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isJPG && !isPNG) {
                    this.$message.error('上传图片只能是 JPG 格式或 PNG格式!')
                }
                if (!isLt5M) {
                    this.$message.error('上传头像图片大小不能超过 5MB!')
                }
                console.log((isPNG || isJPG) && isLt5M)
                return (isPNG || isJPG) && isLt5M
            },
            // 图片上传失败
            handleUploadError(err, file, fileList) {
                this.$message({
                    type: 'error',
                    message: '图片上传失败!'
                })
            },
            uploadDisabled() {
                return Boolean(this.ruleForm.img)
            },

	    },
        mounted() {
            this.getStoreInfo(false);
        }
    }
</script>

<style scoped>
	.m-wrap-16 {
		margin: 7px;
		margin-bottom: 20px;
		padding: 24px;
		background: #fff;
		text-align: left;
	}

	.title{
		background: #f8f8f8;
		height: 24px;
		padding: 12px 16px;
		font-family: PingFangSC-Semibold Helvetica,Arial,Verdana,Tahoma,sans-serif;
		color: #323232;
		letter-spacing: 0;
		line-height: 24px;
		position: relative;
	}

	.title:after{
		content: "";
		position: absolute;
		left: 6px;
		top: 16px;
		width: 4px;
		height: 16px;
		background: #8558fa;
	}

	.zent-form__control-label{
		width: 150px;
		text-align: right;
		margin-bottom: 20px;
	}

	.data-info{
		font-size: 15px;
		color: #222;
		margin-bottom: 30px;
	}
	.data-info div {
		margin-bottom: 20px;
		font-size: 14px;
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
	/deep/ .disabled .el-upload--picture-card {
		display: none;
	}
	.team-logo{
		width: 60px;
		height: 60px;
		border: 1px solid #e5e5e5;
	}
	.team-logo img {
		width: 60px;
		height: 60px;
	}
</style>
