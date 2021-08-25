<template>
  <div class="orderManager">
    <div class="top">
      <el-button type="primary" @click="showAll()">显示所有订单</el-button>
      <input type="text" placeholder="请输入订单id" v-model="search" />
      <i class="fa fa-search" aria-hidden="true" @click="getShow()"></i>
    </div>
    <div class="contentOrder">
      <div class="item">
        <div v-for="(item, ind) in orderlist" :key="ind">
          <div>
            <div v-if="item.orders.length >= 1" class="ordermanager-title">
              <span>用户id: {{ item.userid }}</span>
              <span>用户名: {{ item.name }}</span>
              <span>电话: {{ item.phone }}</span>
            </div>
            <ul v-for="(element, index) in item.orders" :key="index">
              <li
                style="
                  background-color: #b3abab;
                  height: 40px;
                  align-items: center;
                "
              >
                <div>
                  {{ element.date }} <span>订单编号：</span>
                  {{ element.orderid }}
                </div>
                <div>数量</div>
                <div>单价</div>
                <div>实付款</div>
                <div>交易状态</div>
              </li>
              <li
                v-for="(item2, index2) in element.product"
                :key="index2"
                style="margin-top: 20px"
              >
                <div>
                  <img :src="item2.showInfoImg" style="width: 80px" />
                  <span
                    >{{ item2.name }} {{ item2.version }}
                    {{ item2.color }}</span
                  >
                </div>
                <div>{{ item2.num }}</div>
                <div>{{ item2.price }}元</div>
                <div>{{ getTotal(item2) }}元</div>
                <div v-if="element.state === 0">待支付</div>
                <div v-else-if="element.state === 1">待发货</div>
                <div v-else-if="element.state === 2">已发货</div>
                <div v-else-if="element.state === 3">交易取消</div>
              </li>
              <div style="display: flex">
                <div class="order-address">
                  <div>
                    <span>收货人：</span>{{ element.address[0].name }}
                    {{ element.address[0].phone }}
                  </div>
                  <div>
                    <span>地址：</span>{{ element.address[0].province
                    }}{{ element.address[0].area }}{{ element.address[0].city
                    }}{{ element.address[0].info }}
                  </div>
                </div>
                <div class="total">
                  <div class="">总金额：{{ getTotalPrice(element) }}元</div>
                  <button
                    v-if="element.state == 0"
                    @click="cancleOrder(element.orderid, 3)"
                  >
                    取消订单
                  </button>

                  <button
                    v-else-if="element.state == 1"
                    @click="cancleOrder(element.orderid, 2)"
                  >
                    发货
                  </button>
                  <button @click="deleteOrder(element.orderid)">
                    删除订单
                  </button>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAllUser, deleteOrders } from "network/admin.js";
import { findOrderByState, ModifyOrderByState } from "network/order.js";
export default {
  name: "orderManager",
  data() {
    return {
      orderlist: [],
      search: "",
    };
  },

  async created() {
    let p = new Promise((resolve, reject) => {
      getAllUser().then((res) => {
        if (res != "error") {
          resolve(res);
        }
      });
    });
    p.then((value) => {
      value.forEach((item) => {
        let userOrder = {};
        userOrder.userid = item._id;
        userOrder.name = item.username;
        userOrder.phone = item.phone;
        let res = this.getUserOrder(item._id);
        res.then((value) => {
          userOrder.orders = value;
          this.orderlist.push(userOrder);
        });
      });
    });
    console.log(this.orderlist);
  },
  methods: {
    getShow() {
      alert("dianji");
      let s = {};
      this.orderlist.forEach((item, index) => {
        item.orders.forEach((item1, index1) => {
          if (item1.orderid === this.search) {
            s.name = item.name;
            s.phone = item.phone;
            s.userid = item.userid;
            s.orders = [];
            s.orders.push(item1);
            this.orderlist.length = 0;
            this.orderlist.push(s);
            return;
          }
        });
      });
    },
    // 显示所有订单
    async showAll() {
      if (this.orderlist === []||this.search==="") {
        this.orderlist.length=0
        let p = new Promise((resolve, reject) => {
          getAllUser().then((res) => {
            if (res != "error") {
              resolve(res);
            }
          });
        });
        p.then((value) => {
          value.forEach((item) => {
            let userOrder = {};
            userOrder.userid = item._id;
            userOrder.name = item.username;
            userOrder.phone = item.phone;
            let res = this.getUserOrder(item._id);
            res.then((value) => {
              userOrder.orders = value;
              this.orderlist.push(userOrder);
            });
          });
        });
      }
    },
    // 取消订单
    cancleOrder(oid, st) {
      ModifyOrderByState(oid, st).then((res) => {
        if (res === "success") {
          this.orderlist.forEach((item, index) => {
            item.orders.forEach((items, index) => {
              if (items.orderid === oid) {
                items.state = st;
              }
            });
          });
        }
      });
    },
    deleteOrder(oid) {
      deleteOrders(oid).then((res) => {
        if (res === "success") {
          this.orderlist.forEach((item, ind) => {
            item.orders.forEach((items, index) => {
              if (items.orderid === oid) {
                this.orderlist[ind].orders.splice(index, 1);
              }
            });
          });
        }
      });
    },
    // 获取对应用户的订单
    async getUserOrder(id) {
      let res = await findOrderByState(id);
      return res;
    },
  },
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
};
</script>
<style>
.orderManager .ordermanager-title {
  display: flex;
  justify-content: center;
  margin: 20px 0 20px 0px;
  font-size: 16px;
  background-color: #f3f2f2;
  height: 40px;
  align-items: center;
}

.orderManager .ordermanager-title span {
  margin-right: 20px;
}
.orderManager .top {
  margin-top: 20px;
  margin-bottom: 20px;
}
.orderManager .top input {
  margin-left: 20px;
  width: 200px;
  height: 38px;
  outline: none;
}
.contentOrder .item {
  width: 100%;
  margin-top: 20px;
}
.contentOrder .item ul {
  width: 100%;
  flex-direction: column;

  margin-bottom: 20px;
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
.contentOrder .item ul li:nth-child(1),
.contentOrder .item ul .total {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
}
.contentOrder .item ul .total button {
  width: 150px;
  height: 40px;
  border: none;
  background-color: orangered;
  font-size: 16px;
  color: white;
}
.contentOrder .item ul li:nth-child(1) span {
  margin-left: 5px;
}
.contentOrder .item ul .order-address {
  margin-top: 15px;
  text-align: left;
  box-sizing: border-box;
  padding: 0px 50px 0px 50px;
  /* display: flex; */
  /* padding: 15px; */
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
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>