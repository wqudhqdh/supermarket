<template>
  <div>
    <content-order :orderlist="order"></content-order>
  </div>
</template>
<script>
import contentOrder from "views/profile/contentOrder.vue";
import { findOrderByState} from "network/order.js";
export default {
  name: "HavePaid",
  data() {
    return {
      order: [],
    };
  },
  components: {
    contentOrder,
  },
  async created() {
    if(this.$store.state.orderlistState===0)
    {
    console.log("have");
    let orderlist = await findOrderByState(this.$store.state.personal._id);
    console.log(orderlist)
    // 保存到vuex中
    this.$store.commit({
      type: "saveOrder",
      orderlist,
    });
    }
      this.order = this.$store.state.orderlist.filter((item) => {
      return item.state != 3;
    });
  },
};
</script>
<style>
.havepaid .item {
  width: 100%;
  margin-top: 20px;
}
.havepaid .item ul {
  width: 100%;
  flex-direction: column;
  border-bottom: 1px solid grey;

  margin-bottom: 20px;
  /* padding-bottom: 20px; */
}
.havepaid .item ul li {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.havepaid .item ul li:nth-child(1),
.havepaid .item ul .order-address {
  color: #333;
  font-size: 14px;
}
.havepaid .item ul li:nth-child(1) span {
  margin-left: 5px;
}
.havepaid .item ul .order-address {
  margin-top: 15px;
  text-align: left;
}
.havepaid .item ul .order-address div {
  margin-top: 5px;
}
.havepaid .item ul li div:nth-child(1) {
  width: 45%;
}
.havepaid .item ul li div:nth-child(n + 2) {
  flex: 1;
}
</style>