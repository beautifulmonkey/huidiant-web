<template>
	<div class="m-wrap-16">
		<div class="title">门店信息</div>

		<div style="margin-top: 30px;">
			<div style="display: flex"><div class="zent-form__control-label">品牌名称：</div>{{info.stores_name}}</div>
			<div style="display: flex"><div class="zent-form__control-label">主营类目：</div>美发店</div>
			<div style="display: flex"><div class="zent-form__control-label">门店地址：</div>{{info.stores_address || '-'}}</div>
			<div style="display: flex"><div class="zent-form__control-label">门店简介：</div>{{info.stores_info || '-'}}</div>
			<div style="display: flex"><div class="zent-form__control-label">负责人电话：</div>{{info.tel}}</div>
			<div style="display: flex"><div class="zent-form__control-label"></div><el-button>编辑</el-button></div>
		</div>

		<div class="title">地图定位</div>

		<div style="width: 90%;height: 100px;margin-top: 30px;">
			<baidu-map :center="center" :zoom="zoom" @ready="handler" style="height:500px" @click="getClickInfo" :scroll-wheel-zoom='true'></baidu-map>
		</div>

	</div>
</template>

<script>

    import storeSettingApi from '@/service/storeSetting.js'

    export default {
        name: "Info",
	    data() {
            return{
                info: {},
                data () {
                    return {
                        center: {lng: 109.45744048529967, lat: 36.49771311230842},
                        zoom: 13
                    }
                },
            }
	    },
	    methods: {

            // 获取门店信息
            async getStoreInfo(){
                try {
                    const res = await storeSettingApi.getStoreInfo();
                    if (res.status >= 200 && res.status < 300) {
                        this.info = res.data;
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




            handler ({BMap, map}) {
                var point = new BMap.Point(116.404, 39.915)
                map.centerAndZoom(point, 13)
                var marker = new BMap.Marker(point) // 创建标注
                map.addOverlay(marker) // 将标注添加到地图中
                var circle = new BMap.Circle(point, 6, { strokeColor: 'Red', strokeWeight: 6, strokeOpacity: 1, Color: 'Red', fillColor: '#f03' })
                map.addOverlay(circle)
            },
            getClickInfo (e) {
                console.log(e.point.lng)
                console.log(e.point.lat)
                this.center.lng = e.point.lng
                this.center.lat = e.point.lat
            }

	    },
        mounted() {
            this.getStoreInfo();
        }
    }
</script>

<style scoped>
	.m-wrap-16 {
		margin-left: 16px;
		margin-right: 16px;
		margin-top: 16px;
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
</style>
