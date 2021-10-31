<template>
  <div>
    <div class="header">
      <div class="head-top">
        <div class="w" style="display: flex">
          <div class="left">
            <ul>
              <a href="#"><li>小米商城</li></a>
              <a href="#"><li>MIUI</li></a>
              <a href="#"><li>loT</li></a>
              <a href="#"><li>云服务</li></a>
              <a href="#"><li>天星数科</li></a>
              <a href="#"><li>有品</li></a>
              <a href="#"><li>小爱开放平台</li></a>
              <a href="#"><li>企业团购</li></a>
              <a href="#"><li>资质证照</li></a>
              <a href="#"><li>协议规则</li></a>
              <a href="#"><li>下载app</li></a>
              <a href="#"><li>智能生活</li></a>
              <a href="#"><li>Select Loaction</li></a>
            </ul>
          </div>
          <div class="right">
            <ul>
              <li v-if="getPersonal">
                <el-dropdown>
                  <span class="el-dropdown-link" style="color: #b0b0b0">
                          <img :src="this.$store.state.personal.imgSrc" style="width:20px;height:20px;">
                    {{ personal.username}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><router-link :to="{path:'/profile/personalInfo',query:{info:'个人中心'}}" >个人中心</router-link></el-dropdown-item>
                    <el-dropdown-item @click.native="loginout">退出登录</el-dropdown-item>
                    <el-dropdown-item>我的喜欢</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
              <!-- <router-link to="/profile" v-if="getPersonal"> <li  > 欢迎,{{personal.username}}</li></router-link> -->
              <router-link to="/user" v-else><li>登录</li></router-link>
              <router-link to="/user" v-if="!getPersonal"><li>注册</li></router-link>
              <li>消息通知</li>
              <router-link to="/shoppingCart"><li class="cart" >
                <i class="fa fa-shopping-cart"></i>
                购物车
              </li>
              </router-link>
            </ul>
          </div>
        </div>
      </div>
      <div class="head-bottom">
        <div class="bottom-left">
          <img src="~assets/img/logo.png" />
        </div>
        <div class="bottom-middle">
          <ul>
            <li
              @mouseenter="enter(item.name)"
              @mouseleave="leave"
              v-for="(item, i) in cate"
              :key="i"
              :id="item.number"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>

        <div class="bottom-right">
          <form action="#">
            <input type="text" placeholder="手机" v-model="text" />
            <span><i class="fa fa-search" aria-hidden="true" @click="search()"></i></span>
          </form>
        </div>
      </div>
    </div>
    <transition name="fade">
      <nav-show v-show="show" :products="categoryProducts" />
    </transition>
  </div>
</template>
<script>
import NavShow from "components/common/navbar/NavShow.vue";
import { request } from "network/request.js";
export default {
  name: "NavBar",
  components: {
    NavShow,
  },
  data() {
    return {
      show: false,
      categoryProducts: [],
      allCategoryProducts: [],
      cate: [],
      personal: {},
      text:"手机"
    };
  },
  computed: {
    // 获取个人信息
    getPersonal() {
      if (this.$store.state.personal) {
        this.personal = this.$store.state.personal;
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    console.log("created")
    request({
      url: "/api/home/category",
      method: "get",
    }).then((res) => {
      this.cate = res;
      return
    });
  },

  async mounted() {
    this.allCategoryProducts = await request({
      url: "/api/home/category/products",
      method: "get",
    });
  },
  methods: {
    search(){
        this.$router.push({
                    name: "ShowAllProducts",
                    params: {
                      type: this.text,
                    },
                  });
   
    },
    //进入显示类别信息
    enter(names) {
      let productsAll = this.allCategoryProducts;
      for (let item in productsAll) {
        if (names.indexOf(productsAll[item].category) != -1) {
          console.log(productsAll[item]);
          this.show = true;
          this.categoryProducts.push(productsAll[item]);
          if (this.categoryProducts.length === 6) break;
        }
      }
      //退出清空数组
    },
    leave() {
      this.categoryProducts.length = 0;
      console.log(this.categoryProducts);
      this.show = false;
    },
    // 退出登录
       loginout()
      {
        window.sessionStorage.clear()
        this.$store.commit('deletePersonal');
      }
  },
};
</script>


<style>
@import "~assets/css/navbar.css";
/* .fade-enter,
.fade-leave-to{
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active{
  transition: opacity 1s ease;
} */
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
} */
</style>