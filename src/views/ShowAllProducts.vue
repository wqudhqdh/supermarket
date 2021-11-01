<template>
  <div class="showallproducts">
    <nav-bar :cate="category"></nav-bar>
    <ul class="allproduct">
      <li
        v-for="(item, index) in this.$store.getters.getProductsByType(text,false)"
        :key="index"
      >
        <product :productinfo="item"> </product>
      </li>
    </ul>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import HomeSwiper from "components/content/HomeSwiper.vue";
import Recommend from "components/content/Recommend.vue";
import Product from "components/content/Product.vue";
export default {
  name: "ShowAllProducts",
  components: {
    NavBar,
    HomeSwiper,
    Recommend,
    Product
  },
  data() {
    return {
      text: "",
    };
  },
  created() {
    this.text = this.$route.params.type;
  },
};
</script>
<style>
.allproduct{
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
}
.allproduct li{
    width: 234px;
  height: 300px;
  box-sizing: border-box;
  margin-right: 10px;
  margin-bottom: 12px;
}
</style>