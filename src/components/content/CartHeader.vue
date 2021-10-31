<template>
<div class="cartheader">
    <header class="w">
      <div class="left">
        <img src="~assets/img/logo.png"/>
        <div class="title">
          <slot>
          </slot>
        </div>
      </div>

      <div class="profile">
        <ul>
          <li>
            <el-dropdown>
              <span class="el-dropdown-link" style="color: rgb(74 71 71)">
                {{ this.$store.state.personal.username }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  ><router-link
                    :to="{
                      path: '/profile/personalInfo',
                      query: { info: '个人中心' },
                    }"
                    >个人中心</router-link
                  ></el-dropdown-item
                >
                <el-dropdown-item @click.native="loginout">退出登录</el-dropdown-item>
                <el-dropdown-item>我的喜欢</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        <router-link :to="{path:'/profile/order',query:{info:'我的订单'}}">  <li>我的订单</li></router-link>
        </ul>
      </div>
    
    </header>
      </div>
</template>
<script>
export default {
    name:"CartHeader",
    methods:{
      // 退出登录
       loginout()
      {
        window.sessionStorage.clear()
        this.$store.commit('deletePersonal');
      }
    }
}
</script>
<style scoped>
.cartheader{
    background-color: white;
}
 .cartheader header {
    height: 102px;
    display: flex;
    justify-content: space-between;
       background-color: white;
}

 .cartheader header .left {
    width: 50%;
    display: flex;
    justify-content:flex-start;
    align-items: center;
}
.cartheader  header .left .title {
       display: flex;
    align-items: center;
    margin-left: 20px;
}

.cartheader header .left .title h2 {
    font-size: 24px;
    margin-right: 5px;
    color: #424242;
}

 .cartheader header .left img {
    width: 48px;
    height: 48px;
}
 .cartheader header .profile ul {
    height: 100%;
    display: flex;
    align-items: center;
}

.cartheader  header .profile ul>li:nth-child(1) {
    padding-right: 20px;
    border-right: 1px solid #757575;
    margin-right: 20px;
}
 .cartheader header .profile ul li:nth-child(2) {
    padding-left: 10px;
}
</style>