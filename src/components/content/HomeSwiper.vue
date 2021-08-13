<template>
<div class="container">
     <swiper :options="swiperOption" ref="mySwiper" class="wrapper" >
  <!-- slides -->
  <swiper-slide  v-for="(item,index) in banners" :key=index>
    <a href="#"><img :src="require('assets/img/'+item)" ></a>
  </swiper-slide>
  <!-- Optional controls -->
  <!-- <div class="swiper-pagination" slot="pagination"></div>
  <div class="swiper-button-prev" slot="button-prev"></div>
  <div class="swiper-button-next" slot="button-next"></div> -->
 </swiper>
 <div class="swiper-nav">
   <ul>
      <a href="#">
        <li>手机 电话卡</li>
      </a>
      <a href="#"><li>电视 盒子</li></a>
      <a href="#"><li>笔记本 显示器</li></a>
      <a href="#"><li>家电 插线板</li></a>
      <a href="#"><li>出行 穿戴</li></a>
      <a href="#"><li>智能 路由器</li></a>
      <a href="#"><li>电源 配件</li></a>
      <a href="#"><li>健康 儿童</li></a>
      <a href="#"><li>耳机 音箱</li></a>
      <a href="#"><li>生活 箱包</li></a>
   </ul>
   <div class="show">11111</div>
 </div>

</div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    name:'HomeSwiper',
    components: {
  swiper,
  swiperSlide
 },
 data () {
  return {
   swiperOption: { //以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
    notNextTick: true, // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
    autoplay:1000,
    loop: true,
    direction: 'horizontal',
    grabCursor: true,
    setWrapperSize: true,
    autoHeight: true,
    pagination: {
     el: '.swiper-pagination',
     clickable:true
    //  paginationClickable:true
    //  type: "bullets"
    },
    centeredSlides: true,
    // paginationClickable: true,
    navigation: {
     nextEl: '.swiper-button-next',
     prevEl: '.swiper-button-prev'
    },
    keyboard: true,
    mousewheelControl: true,
    observeParents: true, // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
    debugger: true
   },
   banners:["swiper1.png","swiper2.png","swiper3.png"]
  }
 }
}
</script>
<style scoped>
.container{
    width:1226px;
    height:460px;
    margin: auto;
    position: relative;
}

.container .wrapper swiper-slide  a img{
top:20px;
left:20px;
  width: 100%;
  height: 100%

}
.container .swiper-nav{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  
  left: 0px;
  z-index: 1;
  opacity: 0.5;
}
.container .swiper-nav ul{
  width: 234px;
  height: 100%;
   background: #757575;
  /* background-color: saddlebrown; */
  /* border: 1px solid yellowgreen; */
  display: flex;
  flex-direction: column;
box-sizing: border-box;
padding-top: 15px;

}
.container .swiper-nav ul li{
  color: white;
  font-size: 16px;
  width: 100%;
  height: 42px;
  line-height: 42px;
}
.container .show{
  position: absolute;
  left: 235px;
  top: 0;
  background-color: white;
  z-index: 2;
  display: none;
}
.container .swiper-nav ul li:hover{
background-color:#ff6700;

}
.container .swiper-nav ul:hover+.show{
display: block;
}
</style>