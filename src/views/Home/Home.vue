<template>
<!-- 首页 -->
<div class="homeContainer">
<nav-bar :cate="category"></nav-bar>
    <home-swiper></home-swiper>
    <recommend></recommend>
      <img src="~assets/img/picture1.png">
    <show-product :type="types[0]">
      <img src="~assets/img/banner1.png" slot="brand">
    </show-product>
  
    <show-product :type="types[1]">
      <div slot="brand">
      <img src="~assets/img/banner2.png">
           <img src="~assets/img/banner3.png" >
      </div>
    </show-product>
    <Footer></Footer>
</div>

</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from 'components/content/HomeSwiper.vue'
import Recommend from 'components/content/Recommend.vue'
import ShowProduct from 'components/content/ShowProduct.vue'
import Footer from 'components/common/Footer.vue'
import {request}from 'network/request'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    Recommend,
    ShowProduct,
    Footer
  },
   data(){
        return{
        category:[],
        types:["手机","电视"]
        }
    },
}

</script>

<style>
.homeContainer>img{
  margin: 15px 0px 15px 0px;
}
</style>
