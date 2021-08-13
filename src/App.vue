<template>
  <div id="app" class="container">
 <router-view></router-view>
  </div>
</template>

<script>
import Home from "views/Home/Home.vue";
import {getAllProducts} from "network/home.js";
export default {
  name: "App",
  data() {
    return {
      productlist: [],
    };
  },
  components: {
    Home,
  },
 async created() {
let res= await getAllProducts();
 this.$store.commit({
          type: "getProducts",
          res,})
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  padding: 0;
  margin: 0;
  list-style: none;
  text-decoration: none;
  /* overflow: hidden; */
}
body {
  min-width: 1226px;
  /* overflow:scroll; */
  overflow-x: hidden;
}
</style>
