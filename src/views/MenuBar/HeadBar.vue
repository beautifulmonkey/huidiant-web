<template>
  <div class="headbar" :style="{'background':themeColor}"
    :class="$store.state.app.collapse?'position-collapse-left':'position-left'">
    <!-- 导航收缩 -->
    <span class="hamburg">
      <el-menu class="el-menu-demo" :background-color="themeColor" text-color="#fff" :active-text-color="themeColor" mode="horizontal">
        <el-menu-item index="1" @click="onCollapse"><hamburger :isActive="collapse"></hamburger></el-menu-item>
      </el-menu>
    </span>
    <!-- 导航菜单 -->
    <span class="navbar">
      <el-menu :default-active="activeIndex" class="el-menu-demo"
          :background-color="themeColor" text-color="#fff" active-text-color="#ffd04b" mode="horizontal" @select="selectNavBar()">
        <el-menu-item v-for="item in headMenu" :index="item.menuIndex" @click="$router.push(item.menuIndex)">
            <svg-icon v-if="item.svg" :icon-class="item.svg" style="font-size: 18px"/>
            {{item.name}}
        </el-menu-item>
      </el-menu>
    </span>
    <!-- 工具栏 -->
    <span class="toolbar">
      <el-menu class="el-menu-demo" :background-color="themeColor" :text-color="themeColor" :active-text-color="themeColor" mode="horizontal">
        <el-menu-item index="1">
          <!-- 主题切换 -->
          <theme-picker class="theme-picker" :default="themeColor" @onThemeChange="onThemeChange"></theme-picker>
        </el-menu-item>

        <el-menu-item index="2" v-if="!isMobile()">
<!--          &lt;!&ndash; 语言切换 &ndash;&gt;-->
<!--          <li style="color:#fff;" class="fa fa-language fa-lg"></li>-->
<!--          <el-popover ref="popover-lang" placement="bottom-start" trigger="click" v-model="langVisible">-->
<!--            <div class="lang-item" @click="changeLanguage('zh_cn')">简体中文</div>-->
<!--            <div class="lang-item" @click="changeLanguage('en_us')">English</div>-->
<!--          </el-popover>-->
            <screenfull id="screenfull" class="right-menu-item hover-effect" />
        </el-menu-item>
<!--        <el-menu-item index="3" v-popover:popover-message>-->
<!--          &lt;!&ndash; 我的私信 &ndash;&gt;-->
<!--          <el-badge :value="5" :max="99" class="badge" type="success">-->
<!--            <li style="color:#fff;" class="fa fa-envelope-o fa-lg"></li>-->
<!--          </el-badge>-->
<!--          <el-popover ref="popover-message" placement="bottom-end" trigger="click">-->
<!--            <message-panel></message-panel>-->
<!--          </el-popover>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item index="4" v-popover:popover-notice>-->
<!--          &lt;!&ndash; 系统通知 &ndash;&gt;-->
<!--          <el-badge :value="4" :max="99" class="badge" type="success">-->
<!--            <li style="color:#fff;" class="fa fa-bell-o fa-lg"></li>-->
<!--          </el-badge>-->
<!--          <el-popover ref="popover-notice" placement="bottom-end" trigger="click">-->
<!--            <notice-panel></notice-panel>-->
<!--          </el-popover>-->
<!--        </el-menu-item>-->
        <el-menu-item index="5" v-popover:popover-personal>
          <!-- 用户信息 -->
          <span class="user-info"><img :src="circleUrl" />{{user.stores_name}}</span>
          <el-popover ref="popover-personal" placement="bottom-end" trigger="click" :visible-arrow="false">
            <personal-panel :user="user"></personal-panel>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Hamburger from "@/components/Hamburger"
import ThemePicker from "@/components/ThemePicker"
import LangSelector from "@/components/LangSelector"
import Action from "@/components/Toolbar/Action"
import NoticePanel from "@/views/Core/NoticePanel"
// import MessagePanel from "@/views/Core/MessagePanel"
import PersonalPanel from "@/views/Core/PersonalPanel"
import Screenfull from '@/components/ScreenFull/Screenfull'

export default {
  components:{
        Hamburger,
        ThemePicker,
        LangSelector,
        Action,
        NoticePanel,
        PersonalPanel,
        Screenfull
  },
  data() {
    return {
        user: {},
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        langVisible: false
    }
  },
  methods: {
      isMobile(){
          let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
          return flag;
      },
    openWindow(url) {
      window.open(url)
    },
    selectNavBar(key, keyPath) {
      console.log(key, keyPath)
    },
    // 折叠导航栏
    onCollapse: function() {
      this.$store.commit('onCollapse')
    },
    // 切换主题
    onThemeChange: function(themeColor) {
      this.$store.commit('setThemeColor', themeColor)
    },
    // 语言切换
    changeLanguage(lang) {
      lang === '' ? 'zh_cn' : lang
      this.$i18n.locale = lang
      this.langVisible = false
    }
  },
  mounted() {
    this.sysName = "Kitty Platform"

      if (localStorage.userInfo) {
          const userInfo = JSON.parse(localStorage.userInfo);
          if (userInfo) {
              this.user = userInfo
          }
      }

  },
  computed:{
    ...mapState({
      themeColor: state=>state.app.themeColor,
      collapse: state=>state.app.collapse,
      activeIndex: state=>state.menu.menuIndex,
      headMenu:state=>state.menu.headMenu
    })
  }
}
</script>

<style scoped lang="scss">
.headbar {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1030;
  height: 60px;
  line-height: 60px;
  border-color: rgba(180, 190, 190, 0.8);
  border-left-width: 1px;
  border-left-style: solid;
}
.hamburg, .navbar {
  float: left;
}
.toolbar {
  float: right;
}
.lang-item {
  font-size: 16px;
  padding-left: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
}
.lang-item:hover {
  font-size: 18px;
  background: #b0d6ce4d;
}
.user-info {
  font-size: 17px;
  color: #fff;
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin: 10px 0px 10px 10px;
    float: right;
  }
}
.badge {
  line-height: 18px;
}
.position-left {
  left: 200px;
}
.position-collapse-left {
  left: 65px;
}
</style>
