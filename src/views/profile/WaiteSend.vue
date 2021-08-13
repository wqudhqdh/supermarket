<template>
  <content-order :orderlist="order"></content-order>
</template>
<script>
import contentOrder from "views/profile/contentOrder.vue";
export default {
  components: { contentOrder },
  name: "WaiteSend",
  data() {
    return {
      order: [],
    };
  },
  created() {
    this.order = this.$store.state.orderlist.filter((item) => {
      return item.state === 2;
    });
  },
};
</script>
<style>
</style>