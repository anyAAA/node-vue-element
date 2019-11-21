<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <img src="../assets/logo.jpg" class="logo" alt />
        <span class="title">任港哲在线后台管理系统</span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <img :src="user.avatar" class="avatar" alt />
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.name}}</p>
          </div>
          <span class="username">
            <!-- 下拉箭头 -->
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: "head-nav",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    setDialogInfo(cmdItem) {
      //   console.log(cmdItem);
      switch (cmdItem) {
        case "info":
          this.showInfoList();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    showInfoList() {
      // 个人信息展示
      this.$router.push("/infoshow");
    },
    // 退出
    logout() {
      // 清除token
      localStorage.removeItem("eleToken");
      // 清除vuex store
      this.$store.dispatch("clearCurrentState");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="css" scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 800px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}

.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo-container .logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
.logo-container .title {
  margin-left: 8px;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 8px;
  vertical-align: middle;
}

.user {
  line-height: 60px;
  text-align: center;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}

.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}

.username {
  cursor: poiner;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>