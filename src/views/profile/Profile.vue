<template>
  <div>
    <nav-bar></nav-bar>
    <div style="background-color:rgb(243 242 242)" class="profile">
    <div class="title w">
        <router-link to="/home">首页</router-link>/{{this.$route.query.info}}
    </div>
    <div class="pro-container w">
       <div class="left" ref="items">
           <dl class="order" >
              <dt>订单中心</dt>
              <router-link :to="{path:'/profile/order',query:{info:'我的订单'}}"><dd :class="this.$route.query.info==='我的订单'?'activeitem':''">我的订单</dd></router-link>
                   <dd >评价晒单</dd>
                   <dd>话费充值订单</dd>
                   <dd>以旧换新订单</dd>
               </dl>
           <dl class="pro">
               <dt>个人中心</dt>
               <router-link :to="{path:'/profile/personalInfo',query:{info:'个人中心'}}" ><dd :class="this.$route.query.info==='个人中心'?'activeitem':''" >我的个人中心</dd></router-link>
               <dd>消息通知</dd>
               <router-link :to="{path:'/profile/address',query:{info:'收货地址'}}" ><dd :class="this.$route.query.info==='收货地址'?'activeitem':''">收货地址</dd></router-link>
           </dl >
               <dl class="account">
               <dt>账户管理</dt>
                <router-link :to="{path:'/profile/password',query:{info:'修改密码'}}" ><dd :class="this.$route.query.info==='修改密码'?'activeitem':''">修改密码</dd></router-link>
           </dl>
       </div>
       <div class="right">
         <router-view></router-view>
       </div>
    </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import Footer from 'components/common/Footer.vue'
import 'assets/css/profile.css'
export default {
  name: "Profile",
  components: {
    NavBar,
    Footer
  },
  data(){
    return{
       active:"",
       activeItem:"",
    }
  },
  methods:{
    }
}
</script>
<style scoped>
.profile .pro-container {
  box-sizing: border-box;
  padding-bottom: 60px;
}
.profile .pro-container .left .activeitem{
  color:orangered
}
</style>