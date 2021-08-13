<template>
  <div>
    <cart-header>
      <h2>确认订单</h2>
    </cart-header>
    <div class="checkout-container">
      <div class="container-show w">
        <Address @getAddress="getReceiveAddress"></Address>
        <h1>商品</h1>
        <ul class="buyProduct w">
          <li v-for="(item, index) in cart" :key="index">
            <div class="img-info">
              <img
                :src="require('assets/img/' + item.showInfoImg)"
                style="width: 80px; height: 80px"
              />
              <span>{{ item.name }} {{ item.version }} {{ item.color }}</span>
              <span class="inventory" v-if="index == currentIndex"
                >库存不足</span
              >
            </div>
            <div class="">
              <span>{{ item.price | price }}</span
              >X<span>{{ item.num }}</span>
            </div>
            <div class="totalprice">
              {{ getTotal(item) | price }}
            </div>
          </li>
        </ul>
        <ul class="orderinfo">
          <li>
            <p>商品件数：</p>
            <span>{{ getCartsize }}件</span>
          </li>
          <li>
            <p>商品总价：</p>
            <span>{{ getTotalPrice | price }}</span>
          </li>
          <li>
            <p>运费：</p>
            <span>{{ 0 | price }}</span>
          </li>
          <li>
            <p>应付金额：</p>
            <span> {{ getTotalPrice }}</span
            ><span>元</span>
          </li>
        </ul>
        <div class="checkout-bootom">
          <div class="address">
            <div class="top">
              <span>{{ address.name }}</span>
              <span>{{ address.phone }}</span>
            </div>
            <div class="address-info">
              <p>
                {{ address.province }} {{ address.city }} {{ address.area }}
                {{ address.info }}
              </p>
            </div>
          </div>
          <div class="right">
            <router-link to="/shoppingCart">
              <button class="back">返回购物车</button></router-link
            >
            <button class="checkout" @click="order">立即支付</button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import CartHeader from "components/content/CartHeader.vue";
import Address from "views/profile/Address.vue";
import Footer from "components/common/Footer.vue";
import { saveOrder, Modifyinventory } from "network/order.js";
import { deleteCart } from "network/shoppingCart.js";
export default {
  name: "Checkout",
  components: {
    CartHeader,
    Address,
    Footer,
  },
  data() {
    return {
      cart: [],
      address: {},
      currentIndex: -1,
      totalPrice: 0,
    };
  },
  //过滤器
  filters: {
    price(value) {
      return value + "元";
    },
  },
  computed: {
    getTotal() {
      return (item) => {
        return item.num * item.price;
      };
    },
    getTotalPrice() {
      let sum = 0;
      this.cart.forEach((item, index, arr) => {
        sum += item.num * item.price;
      });
      this.totalPrice = sum;
      return sum;
    },
    getCartsize() {
      return this.cart.length;
    },
  },
  methods: {
    //立即下单
    order() {
      let carts = JSON.stringify(this.cart);
      if (this.cart.length <= 0) {
        alert("请选择你要购买的商品");
        return;
      } else if (Object.keys(this.address).length === 0) {
        alert("请选择收货地址");
        return;
      } else {
        this.cart.forEach((item, index, arr) => {
          if (item.inventory < item.num) {
            this.currentIndex = index;
            alert("库存不足");
            return;
          } else {
            item.inventory -= item.num;
            let paypassword = prompt("请输入您的支付密码", "");
            if (paypassword === this.$store.state.personal.paypassword) {
              let account =
                this.$store.state.personal.account - this.totalPrice;
              if (account < 0) {
                alert("余额不足，请充值");
                //  保存订单到数据库
                saveOrder(carts, this.address, 0).then((res) => {
                  alert("订单保存成功")
                  if (res) {
                    let orderids=res.orderid
                    alert(res.orderid)
                    // 修改库存
                    Modifyinventory(this.cart).then((res) => {
                      if (res === "success") {
                                // 从购物车删除商品
                    this.cart.forEach((item, index, arr) => {
                      deleteCart(item.cartid).then((res) => {});
                    });
                    // this.$router.push("/order/" + res.orderid);
                    this.$router.push({
                      name: "Order",
                      params: {
                        orderid:orderids,
                        address: JSON.stringify(this.address),
                        cartlist: JSON.stringify(this.cart),
                      },
                    });
                      }
                    });
            
                  }
                });
              } else {
                this.$store.dispatch("changeAccount", account).then((res) => {
                  alert(res);
                  // 扣款成功
                  if (res === "success") {
                    //  保存订单到数据库
                    saveOrder(carts, this.address, 1).then((res) => {
                      if (res) {
                        // 修改库存
                        Modifyinventory(this.cart).then((res) => {
                          if (res === "success") {
                          }
                        });
                        // 从购物车删除商品
                        this.cart.forEach((item, index, arr) => {
                          deleteCart(item.cartid).then((res) => {});
                        });
                      }
                      // this.$router.push('/order/'+res.orderid+'&'+JSON.stringify(this.address));
                      this.$router.push({
                        name: "Order",
                        params: {
                          orderid: res.orderid,
                          address: JSON.stringify(this.address),
                          cartlist: JSON.stringify(this.cart),
                        },
                      });
                    });
                  }
                });
              }
            } else {
              alert("密码错误");
              return;
            }
          }
        });
        // if (this.currentIndex != -1) {

        // }
      }
    },
    // 获取收货地址
    getReceiveAddress(item) {
      this.address = item;
    },
  },
  // 获取要买的商品
  created() {
    let cartlist = JSON.parse(this.$route.params.cart);
    cartlist.forEach((element) => {
      if (element.flag === true || element.flag === "checked") {
        this.cart.push(element);
      }
    });
  },
};
</script>
<style scoped>
.checkout-container {
  padding-top: 30px;
  background-color: #f5f5f5;
}
.checkout-container .container-show {
  background-color: white;
  margin-bottom: 50px;
}
.checkout-container .container-show h1 {
  font-size: 30px;
  text-align: left;
  padding-left: 50px;
  margin-top: 20px;
}
.checkout-container .container-show .buyProduct {
  padding-left: 50px;
  padding-right: 50px;
  box-sizing: border-box;
  margin-top: 20px;
}
.buyProduct {
  border-bottom: 1px solid #e0e0e0;
}
.buyProduct li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.buyProduct li .totalprice {
  color: orangered;
}
.orderinfo {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  box-sizing: border-box;
  padding: 20px 40px 0px 40px;
  border-bottom: 1px solid #e0e0e0;
}
.orderinfo li {
  width: 20%;
  display: flex;
  margin-bottom: 5px;
  justify-content: space-between;
  align-items: center;
}
.orderinfo li p {
  color: #757575;

  font-size: 16px;
}
.orderinfo li span {
  color: orangered;
  font-size: 16px;
}
.orderinfo li:last-child span:nth-of-type(1) {
  font-size: 30px;
}
.checkout-container .checkout-bootom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px 20px 40px;
  /* box-sizing: border-box; */
}
.checkout-container .checkout-bootom .right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.checkout-container .checkout-bootom .right button {
  width: 160px;
  height: 40px;
  margin-left: 40px;
  font-size: 16px;
}
.checkout-container .checkout-bootom .right .back {
  border: 1px solid grey;
  background-color: white;
  color: grey;
}
.checkout-container .checkout-bootom .right .checkout {
  color: white;
  background-color: orangered;
  border: none;
}
.checkout-container .checkout-bootom .address {
  text-align: left;
}

.checkout-container .checkout-bootom .address .top span {
  margin-right: 5px;
}
.inventory {
  color: red;
  margin-left: 30px;
}
</style>