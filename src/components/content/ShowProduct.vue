<template>
  <div class="showProduct w">
      <div  class="title">
              <span style="font-size:24px">{{type}}</span>
              <span style="font-size:16px" @click="itemclick()">查看更多<i class="fa  fa-chevron-circle-right"></i></span></div>
      <div class="content">
    <div class="brand-left">
      <slot name="brand"></slot>
    </div>
    <ul class="product-right">
      <li v-for="(item, index) in this.$store.getters.getProductsByType(type,true)" :key="index">
     <product :productinfo="item">
        </product>
      </li>
    </ul>
      </div>
  </div>
</template>
<script>
import Product from "components/content/Product.vue";
export default {
  name: "ShowProduct",
  data() {
    return {
    };
  },
  props:["type"],
  components: {
    Product,
  },
  methods: {
    itemclick(){
        this.$router.push({
                    name: "ShowAllProducts",
                    params: {
                      type: this.type,
                    },
                  });
   
    },
  },
};
</script>
<style scoped>
.showProduct {
  display: flex;
  /* justify-content: space-between; */
  margin-top: 10px;
  flex-direction: column;
}
.showProduct .title {
  width: 100%;
  height: 30px;
  text-align: left;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.showProduct .content {
  display: flex;
}
.showProduct .content ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.showProduct .content ul li {
  width: 234px;
  height: 300px;
  box-sizing: border-box;
  /* border: 1px solid gray; */
  /* background-color: violet; */
  margin-bottom: 12px;
}
.showProduct .content ul li:hover {
  box-shadow: 0px 0px 10px 5px #aaa;
  transform: scale(1.01);
}
.showProduct .content .brand-left {
  width: 240px;
  height: 614px;
  /* background-color: black; */
  margin-right: 10px;
}
.showProduct .content .brand-left:hover{
    box-shadow: 0px 0px 10px 5px #aaa;
  transform: scale(1.01);
}
.showProduct .content .product-right {
  width: 980px;
  height: 624px;
}
</style>