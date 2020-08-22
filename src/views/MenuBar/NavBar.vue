<template>
	<div class="menu-bar-container">
		<div class="left-bar">
			<el-menu
			:default-active="activeIndex"
			style="width: 100px;"
			background-color="#001529"
			text-color="#818a9c"
			active-text-color="#fff">
				<div class="store-logo">
					<img :src="getStoreImg() ||require('@/assets/img/public_stores_logo.jpeg')" />
				</div>

				<el-menu-item :index=item.menuIndex v-for="item in headMenu"
				              :style="{'--color': themeColor}"
				              @click="menuRouterPush(item.menuIndex)">
					<i :class="item.icon" class="nav-icon"></i>
					<span slot="title">{{item.name}}</span>
				</el-menu-item>
			</el-menu>
		</div>

		<div class="right-bar" v-if="navTree.length">
			<!-- 导航菜单 -->
			<el-menu :default-active="selectActive"  style="width: 150px;">

				<div class="right-bar-title">
					<h4>{{activeIndexTitle}}</h4>
				</div>
				<!-- 导航菜单树组件，动态加载菜单 -->
				<menu-tree v-for="item in navTree" :key="item.id" :menu="item"></menu-tree>
			</el-menu>
		</div>

	</div>
</template>

<script>
import '@/assets/css/navbarIcon.css';
import { mapState } from 'vuex'
import MenuTree from "@/components/MenuTree"
export default {
    data(){
        return{}
    },
  components:{
        MenuTree
  },
  computed: {
    ...mapState({
      themeColor: state=>state.app.themeColor,
      navTree: state=>state.menu.navTree,
	  headMenu: state=>state.menu.headMenu,
      activeIndex: state=>state.menu.menuIndex,
      activeIndexTitle: state=>state.menu.menuIndexTitle,
      selectActive: state=>state.menu.selectActive
    }),
  },

  methods: {
      menuRouterPush(menuIndex){
          this.$router.push(menuIndex)
      },
	  getStoreImg(){
          if (localStorage.userInfo) {
              return JSON.parse(localStorage.userInfo).img_url;
          }
          return null
	  }
  }
}
</script>

<style scoped lang="scss">
.menu-bar-container {
  position: fixed;
  top: 0px;
  left: 0;
  bottom: 0;
  z-index: 1020;
	.el-menu{
		position:absolute;
		top: 0px;
		bottom: 0px;
		text-align: left;
	}
	.left-bar .el-menu {
		left: 0
	}
	.right-bar .el-menu {
		left: 100px;
	}
	.left-bar .is-active{
	  background-color: var(--color) !important;
    }
	.left-bar .el-menu-item:hover span{
		color: #fff;
	}
	.left-bar .el-menu-item:hover i{
		color: #fff;
	}

	.store-logo{
		height: 60px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: 37px;
			height: 37px;
			border-radius: 50px;
			margin-top: 15px;
			float: right;
		}
	}
	.right-bar-title{
		height: 60px;
		width: 100%;
		display: flex;
		align-items: center;
		border-color: #e6e6e6;;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		h4{
			margin-left: 20px;
		}
	}

	/deep/ .right-bar .el-menu-item {
		min-width: 150px !important;
		/*overflow: hidden !important;*/
	}

	.nav-icon {
		font-size: 18px;
		margin-right: 5px;
		text-align: center;
	}
}

</style>
