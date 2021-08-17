<template>
  <content-order :orderlist="order"></content-order>
</template>
<script>
import contentOrder from "views/profile/contentOrder.vue";
import { findOrderByState } from "network/order.js";
export default {
  components: { contentOrder },
  name: "WaiteSend",
  data() {
    return {
      order: [],
    };
  },
  async created() {
    if (this.$store.state.orderlist === null) {
      console.log("have");
      let orderlist = await findOrderByState(this.$store.state.personal._id);
      // 保存到vuex中
      this.$store.commit({
        type: "saveOrder",
        orderlist,
      });
    }

    this.order = this.$store.state.orderlist.filter((item) => {
      return item.state === 2;
    });



  },
};
</script>
<style>
</style>