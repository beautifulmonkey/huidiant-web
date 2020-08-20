<template>
  <div class="headbar" :class="navTree.length?'position-left':'position-collapse-left'">
      <span :style="{'--color': themeColor}" class="ui-label">云逍科技</span>
    <!-- 工具栏 -->
    <span class="toolbar">
      <el-menu class="el-menu-demo" :background-color="'#fff'" mode="horizontal">
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
<!--          <el-badge :value="1" :max="99" class="badge" type="success">-->
<!--            <li style="color: #555555;" class="fa fa-bell-o fa-lg"></li>-->
<!--          </el-badge>-->
<!--          <el-popover ref="popover-notice" placement="bottom-end" trigger="click">-->
<!--            <notice-panel></notice-panel>-->
<!--          </el-popover>-->
<!--        </el-menu-item>-->

        <el-menu-item index="5" v-popover:popover-personal>
          <!-- 用户信息 -->
          <span class="user-info">{{user.stores_name}}</span><i style="font-size: 10px;" class="el-icon-caret-bottom"></i>
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
        langVisible: false
    }
  },
  methods: {
      isMobile(){
          let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
          return flag;
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
      headMenu:state=>state.menu.headMenu,
      navTree: state=>state.menu.navTree,
    })
  }
}
</script>

<style scoped lang="scss">
.headbar {
  text-align: left;
  position: fixed;
  top: 0;
  right: 0;
  left: 250px;
  z-index: 1030;
  height: 60px;
  line-height: 60px;
  background-color: #fff;
  border-color: #e6e6e6;;
  border-left-width: 1px;
  border-left-style: solid;

  border-bottom: #e6e6e6;;
  border-bottom-width: 1px;
  border-bottom-style: solid;

}
.toolbar {
  float: right;
}

.user-info {
  font-size: 17px;
    font-weight: 500;
    color: #262626;
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
.is-active{
    border: none !important;
}

.position-left {
    left: 250px;
}

.position-collapse-left {
    left: 100px;
}

.ui-label {
    margin-left: 19px;
    font-size:15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    min-width: 40px;
    height: 20px;
    line-height: 20px;
    padding: 0 5px;
    vertical-align: middle;
    text-align: center;
    border: 1px solid #bfbfbf;

    border-color: var(--color) !important;
    color: var(--color) !important;
}

</style>
