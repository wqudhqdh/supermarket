<template>
  <div class="contentOrder">
    <div class="item">
      <ul v-for="(item, index) in orderlist" :key="index">
        <li>
          <div>{{ item.date }} <span>订单编号：</span> {{ item.orderid }}</div>
          <div>数量</div>
          <div>单价</div>
          <div>实付款</div>
          <div>交易状态</div>
          <div v-if="item.state != 3">交易操作</div>
        </li>
        <li v-for="(item2, index2) in item.product" :key="index2">
          <div>
            <img
              :src="item2.showInfoImg"
              style="width: 80px; height: 80px"
            />
            <span>{{ item2.name }} {{ item2.version }} {{ item2.color }}</span>
          </div>
          <div>{{ item2.num }}</div>
          <div>{{ item2.price }}元</div>
          <div>{{ getTotal(item2) }}元</div>
          <div v-if="item.state === 0">待支付</div>
          <div v-else-if="item.state === 1">待发货</div>
          <div v-else-if="item.state === 2">待收货</div>
          <div v-else-if="item.state === 3">交易取消</div>
          <div
            @click="deleteOrder(item, index)"
            v-if="item.state === 1 || item.state === 2"
          >
            <i class="iconfont icon-delete"></i>
          </div>
          <div v-else-if="item.state === 0">
            <button class="checkout" @click="toPay(getTotalPrice(item), index)">
              去支付
            </button>
            <i
              class="iconfont icon-delete"
              @click="deleteOrder(item, index)"
            ></i>
          </div>
        </li>
        <div class="order-address">
          <div>
            <span>收货人：</span>{{ item.address[0].name }}
            {{ item.address[0].phone }}
          </div>
          <div>
            <span>地址：</span>{{ item.address[0].province
            }}{{ item.address[0].area }}{{ item.address[0].city
            }}{{ item.address[0].info }}
          </div>
          <div class="">总金额：{{ getTotalPrice(item) }}元</div>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
import { ModifyOrderByState, Modifyinventory } from "network/order.js";
export default {
  name: "contentOrder",
  data() {
    return {};
  },
  props: ["orderlist","flag"],
  computed: {
    getTotal() {
      return (item) => {
        return item.num * item.price;
      };
    },
    getTotalPrice() {
      return (item) => {
        let sum = 0;
        item.product.forEach((elem, index, arr) => {
          sum += elem.num * elem.price;
        });
        return sum;
      };
    },
  },
  methods: {
    // 去支付
    toPay(value, index) {
      let item = this.orderlist[index];
      let paypassword = prompt("请输入您的支付密码", "");
      if (paypassword === this.$store.state.personal.paypassword) {
        let account = this.$store.state.personal.account - value;
        if (account < 0) {
          alert("余额不足，请充值");
        } else {
          // 修改账户余额
          this.$store.dispatch("changeAccount", account).then((res) => {
            if (res === "success") {
              //  修改订单状态
              let p = new Promise((resolve, reject) => {
                ModifyOrderByState(item.orderid, 1).then((res) => {
                  console.log(res);
                  let oid = item.orderid;
                  let state = 1;
                  this.$store.commit({
                    type: "modifyOrderstate",
                    oid,
                    state,
                  });
                  this.orderlist[index].state = 1;
                  resolve();
                });
              });
              p.then(() => {
                // 修改库存和销量
               let cart= this.orderlist[index].product;
              //  console.log(cart)
                cart.forEach((item, index, arr) => {
                  item._id = item.paramerid;
                  item.inventory -= item.num;
                  item.sales += item.num;
                });
                Modifyinventory(cart).then((res) => {
                  if (res === "success") {
                   if(this.flag===0)
                   {
                       this.orderlist.splice(index, 1);
                   }
                  }
                });
              });
            }
          });
        }
      } else {
        alert("密码错误，请重试");
      }
    },
    //   删除订单
    deleteOrder(item, index) {
      let flag;
      // 0未支付
      //1已支付
      //2已发货
      //3订单已取消
      if (item.state === 0) {
        flag = confirm("您的订单未支付,删除后则该订单会被取消");
      } else if (item.state === 1) {
        flag = confirm("您确定要取消该订单吗？");
      }
      //待收货
      else if (item.state === 2) {
        flag = confirm("您的订单已发货，请联系客服取消");
        return;
      }
      if (flag) {
        console.log(flag);
        ModifyOrderByState(item.orderid, 3).then((res) => {
          console.log(res);
          let oid = item.orderid;
          let state = 3;
          this.$store.commit({
            type: "modifyOrderstate",
            oid,
            state,
          });
          this.orderlist.splice(index, 1);
        });
      }
    },
  },
};
</script>
<style>
.contentOrder .item {
  width: 100%;
  margin-top: 20px;
}
.contentOrder .item ul {
  width: 100%;
  flex-direction: column;
  border-bottom: 1px solid grey;

  margin-bottom: 20px;
  /* padding-bottom: 20px; */
}
.contentOrder .item ul li {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.contentOrder .item ul li .checkout {
  background-color: orangered;
  color: white;
  border: none;
  width: 80px;
  height: 30px;
  font-size: 16px;
}
.contentOrder .item ul li:nth-child(1),
.contentOrder .item ul .order-address {
  color: #333;
  font-size: 14px;
}
.contentOrder .item ul li:nth-child(1) span {
  margin-left: 5px;
}
.contentOrder .item ul .order-address {
  margin-top: 15px;
  text-align: left;
}
.contentOrder .item ul .order-address div {
  margin-top: 5px;
}
.contentOrder .item ul li div:nth-child(1) {
  width: 45%;
}
.contentOrder .item ul li div:nth-child(n + 2) {
  flex: 1;
}
</style>