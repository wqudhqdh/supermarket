<template>
  <div>
    <content-order :orderlist="order" :flag="stateFlag" ></content-order>
  </div>
</template>
<script>
import contentOrder from "views/profile/contentOrder.vue";
import { findOrderByState } from "network/order.js";
export default {
  name: "NoPaid",
  components: {
    contentOrder,
  },
  data() {
    return {
      order: [],
      stateFlag:0
    };
  },
  async created() {

    if (this.$store.state.orderlistState===0) {
      console.log("have");
      let orderlist = await findOrderByState(this.$store.state.personal._id);
      // 保存到vuex中
      this.$store.commit({
        type: "saveOrder",
        orderlist,
      });
    }
    
    this.order = this.$store.state.orderlist.filter((item) => {
      return item.state === 0;
    });
  },
};
</script>
<style>
</style>