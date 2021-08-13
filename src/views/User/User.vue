<template>
  <div class="container"  >
    <div class="left"></div>
    <div class="right">
      <div class="account-top">
        <div class="icon">
          <img src="~assets/img/logo.png" />
          <span>小米账号/</span>
          <router-link to="/home">首页</router-link>
        </div>
        <div class="nav-item">
          <ul>
            <li>用户隐私</li>
            <li>协议政策</li>
            <li>帮助中心</li>
            <li>中文简体</li>
          </ul>
        </div>
      </div>
      <div class="account-bootom">
        <div class="user-info">
          <div class="title">
            <el-tabs v-model="activeName" @tab-click="handleClick" class="fix">
              <el-tab-pane label="登录" name="first" >
                <login ></login>
              </el-tab-pane>
              <el-tab-pane label="注册" name="second" >
                <register v-on:loginChange="changeActiveName($event)"></register>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Login from "views/User/Login.vue";
import Register from "views/User/Register.vue";
export default {
  name: "User",
  components: {
    Login,
    Register,
  },
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    changeActiveName(){
      this.activeName="first"
      console.log("父组件收到了")
    }
  },
};
</script>
<style scoped>
.fix{
  width: 310px;
  height: 400px;
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
}
.container .left {
  background: url("~assets/img/login.jpg") no-repeat;
  background-position-y: -150px;
  height: 100%;
  width: 30%;
  position: fixed;
  background-size: cover;
  top: 0;
  left: 0;
}
.container .left img {
  width: 100%;
}
.container .right {
  position: absolute;
  right: 0;
  width: 70%;
}
.container .right .account-top {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
}
.container .right .account-top .icon {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container .right .account-top .icon img {
  height: 40px;
}
.container .right .account-top .icon span {
  font-size: 24px;
  font-weight: 400;
  color: #333;
}
.container .right .account-top .nav-item ul {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.container .right .account-top .nav-item ul li {
  flex: 1;
  font-size: 14px;
  color: #838383;
  font-weight: 400;
  margin-right: 15px;
}
.container .right .account-bootom {
  width: 450px;
  height: 600px;
  background-color: white;
  margin: auto;
  box-shadow: 1px 1px 1px 1px silver;
  margin-top: 15px;
  border-radius: 5px;
  position: relative;
  box-sizing: border-box;
  padding-top: 20px;
}
.container .right .account-bootom .user-info {
  width: 360px;
  height: 400px;
  margin: auto;
box-sizing: border-box;
  position: relative;
  padding-left: 20px;
}
.container .right .account-bootom .user-info .title {
  width: 130px;
  height: 40px;
  /* border: 1px solid red; */
  /* color: rgb(126, 113, 113); */
  font-size: 24px;
  display: flex;
  justify-content: space-between;
}
.container .right .account-bootom .user-info .title a {
  color: black;
}
</style>