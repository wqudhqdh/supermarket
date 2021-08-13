<template>
  <div>
    <content-order :orderlist="order"></content-order>
  </div>
</template>
<script>
import contentOrder from "views/profile/contentOrder.vue";
export default {
  name: "NoPaid",
  components:{
      contentOrder
  },
  data() {
    return {
      order: [],
    };
  },
created() {
     this.order = this.$store.state.orderlist.filter((item) => {
      return item.state===0;
    });
  },
};
</script>
<style>
</style>