<template>
  <div class="order">
    <cart-header>
      <h2>支付订单</h2>
    </cart-header>
    <div class="order-container">
      <div :class="['w', !active ? 'container' : 'order-active']">
        <div class="left">
          <i class="iconfont icon-true2"></i>
        </div>
        <div class="right">
          <div :class="!active ? 'top' : 'active-top'">
            <div class="info">
              <h2 v-if="orderState === 0">订单提交成功！去付款咯～</h2>
              <h2 v-else>订单提交成功</h2>
              <span v-if="orderState === 0"
                >请在0 小时 14 分内完成支付, 超时后将取消订单</span
              >
            </div>
            <div class="money">
              <div>
                应付金额：<span>{{ getTotalPrice }}</span>
              </div>
              <div class="order-info">
                <span @click="itemClick()">订单详情</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div>
              <p>订单号:</p>
              <span>
                {{ orderid }}
              </span>
            </div>
            <div>
              <p>收货信息:</p>
       
              <span>
                 {{address.name}}{{address.phone}}
                {{ address.province }} {{ address.city }} {{ address.area }}
                {{ address.info }}</span
              >
            </div>
            <div>
              <p>商品名称:</p>
              <div class="products">
              <span v-for="(item, index) in productlist" :key="index">
                {{ item.name }} {{ item.version }} {{ item.color }}
              </span>
              </div>
            </div>
            <div>
              <p>发票信息:</p>
              <span>电子普通发票 个人</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import CartHeader from "components/content/CartHeader.vue";
import { showOrderInfo } from "network/order.js";
import Footer from "components/common/Footer.vue";
export default {
  name: "Order",
  data() {
    return {
      active: false,
      orderState: 0,
      productlist: [],
      address: null,
      orderid: "",
    };
  },
  components: {
    CartHeader,
    Footer
  },
  computed: {
    getTotalPrice() {
      let sum = 0;
      this.productlist.forEach((item, index, arr) => {
        sum += item.num * item.price;
      });
      this.totalPrice = sum;
      return sum;
    },
  },
  methods: {
    itemClick() {
      this.active = !this.active;
    },
  },
  // 获取订单号
  created() {
    
    this.orderid = this.$route.params.orderid;
    this.address = JSON.parse(this.$route.params.address);
    this.productlist = JSON.parse(this.$route.params.cartlist);
    showOrderInfo(this.orderid).then((res) => {
      console.log(res);
      this.orderState = res[0].state;
    });
  },
};
</script>
<style>
.order .order-container {
  background-color: #f5f5f5;
  padding: 40px 40px 80px 40px;
}
.order .order-container .container {
  background-color: white;
  display: flex;
  justify-content: flex-start;
  padding: 40px;
  box-sizing: border-box;
  height: 130px;
  overflow: hidden;
  transition: all 0.2s;
}
.order .order-container .order-active {
  background-color: white;
  display: flex;
  justify-content: flex-start;
  padding: 40px;
  box-sizing: border-box;
  /* height: 300px; */
  /* overflow: hidden; */
  transition: all 0.2s;
}
.order .order-container .left {
  margin-right: 20px;
}
.order .order-container .left i {
  width: 80px;
  height: 80px;
  color: #83c44e;
  border: 1px solid #83c44e;
  border-radius: 50%;
  display: block;
  font-size: 50px;
}
.order .order-container .right {
  flex: 1;
}

.order .order-container .right .top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
}
.order .order-container .right .active-top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid grey;
}
.order .order-container .right .top .info,
.order .order-container .right .active-top .info {
  text-align: left;
}
.order .order-container .right .top .money,
.order .order-container .right .active-top .money {
  text-align: right;
}
.order .order-container .right .top .money .order-info,
.order .order-container .right .active-top .money .order-info {
  cursor: pointer;
  margin-top: 10px;
}
.order .order-container .right .top .money .order-info:hover,
.order .order-container .right .active-top .money .order-info:active {
  color: orangered;
}
.order .order-container .right .top .money div:nth-of-type(1) span,
.order .order-container .right .active-top .money div:nth-of-type(1) span {
  font-size: 24px;
  color: orangered;
}
.order .order-container .right .top .info h2,
.order .order-container .right .active-top .info h2 {
  font-size: 30px;
  margin-bottom: 5px;
}
/* .order .order-container .container .right .top .le */
.order .order-container .right .bottom {
  text-align: left;
  margin-top: 20px;
}
.order .order-container .right .bottom div {
  margin-bottom: 10px;
  display: flex;
}
.order .order-container .right .bottom div .products{
  display: flex;
  flex-direction: column;
}
.order .order-container .right .bottom div p {
  margin-right: 15px;
  width: 8%;
}
</style>