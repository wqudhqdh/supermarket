<template>
  <div class="shoppingCart">
    <cart-header>
      <h2>我的购物车</h2>
      <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
    </cart-header>
    <div class="middle" v-if="getCart">
      <div class="middle-show w" style="background-color: white">
        <div class="show-top">
          <table class="content">
            <tr class="title">
              <td>
                <input type="checkbox" @click="checkAll($event)" />
                <span>全选</span>
              </td>
              <td><span>商品名称</span></td>
              <td><span>单价</span></td>
              <td><span>数量</span></td>
              <td><span>小计</span></td>
              <td><span>操作</span></td>
            </tr>
            <tr v-for="(item, index) in this.cart" :key="index">
              <td>
                <input
                  type="checkbox"
                  v-model="item.flag"
                  @click="itemclick($event, index)"
                />
              </td>
              <td class="show-img">
                <img
                  :src="require('assets/img/' + item.showInfoImg)"
                  style="width: 80px; height: 80px"
                />
                <span>{{ item.name }} {{ item.version }} {{ item.color }}</span>
              </td>
              <td class="">{{ item.price | price }}</td>
              <td class="number">
                <i
                  class="iconfont icon-minus2-12"
                  @click="minus($event, item)"
                  style="cursor: pointer"
                ></i>
                <input
                  type="text"
                  v-model="item.num"
                  @change="numchanged(item)"
                />
                <i
                  class="iconfont icon-add"
                  @click="add(item)"
                  style="cursor: pointer"
                ></i>
              </td>
              <td class="price">{{ getPrice(item) | price }}</td>
              <td>
                <div class="delete" @click="Delete(item.cartid, index)">
                  <i class="iconfont icon-err1"></i>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="checkout w">
        <div class="left">
          <router-link to="/home">
            <span> 继续购物 </span>
          </router-link>
          <p>
            共<span>{{ getTotalsize }}</span
            >件商品 已选中<span>{{ getTotalchecked }}</span
            >件
          </p>
        </div>
        <div class="right">
          <p>
            <span>合计:</span><span>{{ getTotalPrice | price }}</span>
          </p>
          <!-- <router-link > -->
          <button class="settleaccount" @click="checkout">去结算</button>
          <!-- </router-link> -->
        </div>
      </div>
    </div>
    <!-- 购物车为空 -->
    <div class="cart" v-else>
      <img src="~assets/img/cart-empty.png" />
      <div class="title">
        <span>您的购物车还是空的！</span>
        <router-link to="/home"><button>快去购物</button></router-link>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import Footer from "components/common/Footer.vue";
import CartHeader from "components/content/CartHeader.vue";
import axios from "axios";
import {
  getProductDetails,
  getShoppingCart,
  deleteCart,
  ModifyCartNum,
} from "network/shoppingCart.js";
export default {
  name: "shoppingCart",
  components: {
    NavBar,
    Footer,
    CartHeader,
  },
  data() {
    return {
      cart: [], //获取到的购物车商品详情数据
    };
  },
  created() {
    // 修改商品数量
    this.debouncedModifyCartNum = _.debounce(this.modifyCartNum, 1000);
    // 获取用户购物车中的商品id
    getShoppingCart(this.$store.state.personal._id).then((res) => {
      // console.log(JSON.stringify(res));
      //   通过商品id获取其详细信息
      getProductDetails(JSON.stringify(res)).then((result) => {
        // console.log(result);
        this.cart = result;
        console.log(this.cart);
      });
    });
  },
  computed: {
    // 判断购物车是否为空
    getCart() {
      if (this.cart.length === 0) {
        return false;
      } else {
        return true;
      }
    },
    // 小计
    getPrice() {
      return (item) => {
        return item.num * item.price;
      };
    },
    //选中的总金额
    getTotalPrice() {
      let sum = 0;
      this.cart.forEach((item, index, arr) => {
        if (item.flag === "checked" || item.flag === true) {
          sum += item.num * item.price;
        }
      });
      return sum;
    },
    //总的购物车的数量
    getTotalsize() {
      return this.cart.length;
    },
    //选中的商品的数量
    getTotalchecked() {
      let sum = 0;
      this.cart.forEach((item, index, arr) => {
        if (item.flag === "checked" || item.flag === true) {
          sum++;
        }
      });
      return sum;
    },
  },
  //过滤器
  filters: {
    price(value) {
      return value + "元";
    },
  },
  methods: {
    checkout() {
      let s = JSON.stringify(this.cart);
      this.$router.push("/checkout/" + s);
    },
    // 全选
    checkAll(event) {
      if (event.currentTarget.checked) {
        this.cart.forEach((item, indexm, arr) => {
          item.flag = "checked";
        });
      } else {
        this.cart.forEach((item, indexm, arr) => {
          item.flag = "";
        });
      }
    },
    //单选
    itemclick(event, ind) {
      let el = event.currentTarget.checked;
      this.cart.forEach((item, index, arr) => {
        if (index === ind) {
          if (el) {
            //选中
            item.flag = "checked";
          } else {
            item.flag = "";
          }
        }
      });
    },
    // 删除商品
    Delete(id, index) {
      this.cart.splice(index, 1);
      deleteCart(id).then((res) => {
        if (res === "success") {
          alert("删除成功");
        }
      });
    },
    minus(event, item) {
      //获取点击对象
      var el = event.currentTarget;
      if (item.num <= 0) {
        el.style.cursor = "no-drop ";
      } else {
        item.num--;
        // 修改商品数量
        this.debouncedModifyCartNum(item);
        // ModifyCartNum(item.cartid,item.num)
      }
    },
    add(item) {
      item.num++;
      // 修改商品数量
      this.debouncedModifyCartNum(item);
      //  ModifyCartNum(item.cartid,item.num)
    },
    // 修改商品数量
    modifyCartNum(item) {
      ModifyCartNum(item.cartid, item.num);
    },
    // input商品数量改变了

    numchanged(item) {
      ModifyCartNum(item.cartid, item.num);
    },
  },
};
</script>
<style scoped>
@import "~assets/css/shoppingCart.css";
</style>