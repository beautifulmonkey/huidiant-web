<template>
	<div id="main-box">
		<div class="content-box" :style="calcHeight()">
			<order-component v-if="activeMenu==='order'"></order-component>
			<me-component v-if="activeMenu==='me'"></me-component>
			<prepaid-component v-if="activeMenu==='prepaid'"></prepaid-component>
			<counting-component v-if="activeMenu==='counting'"></counting-component>
		</div>
		<div style="width: 100%;text-align: center;color: #888;font-size: 13px;" v-if="activeMenu==='me'">
			由<span style="padding: 0 3px;color: #cc9434;">云逍科技</span>提供技术支持
		</div>

		<div class="mint-tabbar is-fixed">
			<a class="mint-tab-item" v-for="item in bottomMenuBar" :class="{ 'is-selected': activeMenu===item.key}"
			   @click="activeMenu=item.key">
				<div class="mint-tab-item-icon">
					<i :class="item.icon"></i>
				</div>
				<div class="mint-tab-item-label">{{item.name}}</div>
			</a>
		</div>

	</div>
</template>

<script>
    import meComponent from '@/views/PublicCenter/SubMe.vue'
    import orderComponent from '@/views/PublicCenter/SubOrder.vue'
    import prepaidComponent from '@/views/PublicCenter/SubPrepaid.vue'
    import countingComponent from '@/views/PublicCenter/SubCounting.vue'
    import router from "../../router";

    export default {
        name: "Main",
        components: {
            meComponent,
            orderComponent,
            prepaidComponent,
            countingComponent
        },
	    data () {
            return {
                activeMenu: "me",
	            hh: 300,
                bottomMenuBar: [
                    {"name": "会员卡", "icon": "el-icon-bank-card", "key": "prepaid"},
                    {"name": "套餐", "icon": "el-icon-postcard", "key": "counting"},
                    {"name": "消费记录", "icon": "el-icon-s-order", "key": "order"},
                    {"name": "我的", "icon": "el-icon-user", "key": "me"},
                ]
            }
	    },
        methods: {
            calcHeight(){
                // const container = window.document.getElementById('main-box');
                // if(container){
                //     return "min-height: " +  (container.clientHeight - 75).toString() + "px"
                // }
                // return "min-height: 200px";
                return "min-height: " +  (this.hh - 130).toString() + "px"
            },
        },
	    mounted() {
            this.hh = window.document.getElementById('main-box').clientHeight;
        }
    }
</script>

<style scoped>
	#main-box{
		width: 100%;
		height: 100%;
		background-color: #f5f6f8;
		text-align: left;
	}

	.mint-tabbar {
		background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 0px);
		background-size: 100% 1px;
		background-color: rgb(250, 250, 250);
		display: flex;
		right: 0px;
		bottom: 0px;
		left: 0px;
		position: absolute;
		text-align: center;
		background-repeat: no-repeat;
		background-position: 0px 0px;
	}
	.mint-tabbar.is-fixed {
		right: 0px;
		bottom: 0px;
		left: 0px;
		position: fixed;
		z-index: 1;
	}

	.mint-tabbar > .mint-tab-item.is-selected {
		background-color: rgb(234, 234, 234);
		/*color: rgb(38, 162, 255);*/
		color: #fb8700;
	}
	.mint-tab-item {
		display: block;
		-webkit-box-flex: 1;
		padding: 7px 0px;
		flex: 1 1 0%;
		text-decoration: none;
	}
	.mint-tab-item-icon {
		width: 24px;
		height: 24px;
		margin: 0px auto 5px;
	}
	.mint-tab-item-label {
		color: inherit;
		font-size: 12px;
		line-height: 1;
	}
	.mint-tab-item-icon > * {
		display: block;
		width: 100%;
		height: 100%;
	}

	.content-box{
		padding: 20px;
	}
</style>
