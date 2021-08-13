<template>
 <content-order :orderlist="order"></content-order>
</template>
<script>
import contentOrder from "views/profile/contentOrder.vue";
export default {
  components: { contentOrder },
  name: "RecycleOrder",
  data() {
    return {
      order: [],
    };
  },
  created() {
     this.order = this.$store.state.orderlist.filter((item) => {
      return item.state===3;
    });
  },
};
  
</script>
<style>
</style>