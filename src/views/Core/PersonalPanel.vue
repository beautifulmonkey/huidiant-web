<template>
  <div class="personal-panel">
    <div class="personal-desc" :style="{'background':this.$store.state.app.themeColor}">
        <div class="avatar-container">
            <!--          <img class="avatar" :src="require('@/assets/user.png')" />-->
        <img class="avatar" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        </div>
        <div class="name-role">
          <span class="sender">{{ user.stores_name }}</span>
        </div>
        <div class="registe-info">
          <span class="registe-info">
            <li class="fa fa-clock-o"></li>
             到期时间：{{ user.expiry_date }}
          </span>
        </div>
    </div>
<!--    <div class="personal-relation">-->
<!--        <span class="relation-item">followers</span>-->
<!--        <span class="relation-item">watches</span>-->
<!--        <span class="relation-item">friends</span>-->
<!--    </div>-->
    <div class="main-operation">
        <span class="main-operation-item">
          <el-button size="small" icon="fa fa-male" @click="$router.push('/settings/stores/info')"> 店铺信息</el-button>
        </span>
        <span class="main-operation-item">
          <el-button size="small" icon="fa fa-key" @click="$router.push('/settings/stores/pwd')"> 修改密码</el-button>
        </span>
    </div>
    <div class="other-operation">

        <div class="other-operation-item">
          <li class="fa fa-user"></li>
          技术支持
        </div>
        <div class="other-operation-item"  @click="dialogVisible=true">
          <li class="fa fa-bell"></li>
          升级/续费
        </div>

        <div  style="text-align: center">
            <span style="font-size: 80%;color: #969799">版本: v2.2</span>
        </div>

    </div>
    <div class="personal-footer" @click="logout">
      <li class="fa fa-sign-out"></li>
      {{$t("common.logout")}}
    </div>


      <el-dialog
          title="升级/续费"
          append-to-body
          :visible.sync="dialogVisible"
          width="30%">

          <strong>请联系代理商</strong>
          <br>
          <br>
          <div style="display: flex; align-items: center">
              <span>微信号:</span>
              <el-input size="small" disabled value="xxx" style="width: 200px;margin-left: 20px;"></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PersonalPanel',
  props: {
    user: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
        dialogVisible: false
    }
  },
  methods: {
    // 退出登录
    logout: function() {
      this.$confirm("确认退出吗?", "提示", {
        type: "warning"
      })
      .then(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('skin');

          // sessionStorage.removeItem("user")
        // this.deleteCookie("token")
        this.$router.push("/login")
        // this.$api.login.logout().then((res) => {
        //   }).catch(function(res) {
        // })
      })
      .catch(() => {})
    },
  },
  mounted() {
  }
}
</script>

<style scoped>
.personal-panel {
  font-size: 14px;
  width: 280px;
  text-align: center;
  border-color: rgba(180, 190, 190, 0.2);
  border-width: 1px;
  border-style: solid;
  background: rgba(182, 172, 172, 0.1);
  margin: -14px;
}
.personal-desc {
  padding: 15px;
  color: #fff;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 90px;
}
.name-role {
  font-size: 16px;
  padding: 5px;
}
.personal-relation {
  font-size: 16px;
  padding: 12px;
  margin-right: 1px;
  background: rgba(200, 209, 204, 0.3);
}
.relation-item {
  padding: 12px;
}
.relation-item:hover {
  cursor: pointer;
  color: rgb(19, 138, 156);
}
.main-operation {
  padding: 8px;
  margin-right: 1px;
  /* background: rgba(175, 182, 179, 0.3); */
  border-color: rgba(201, 206, 206, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}
.main-operation-item {
  margin: 15px;
}
.other-operation {
  padding: 15px;
  margin-right: 1px;
  text-align: left;
  border-color: rgba(180, 190, 190, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}
.other-operation-item {
  padding: 12px;
}
.other-operation-item:hover {
  cursor: pointer;
  background: #9e94941e;
  /*color: rgb(19, 138, 156);*/
}
.personal-footer {
  margin-right: 1px;
  font-size: 14px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-color: rgba(180, 190, 190, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}
.personal-footer:hover {
  cursor: pointer;
  /*color: rgb(19, 138, 156);*/
  background: #b1a6a61e;
}
</style>
