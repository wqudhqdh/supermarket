<template>
  <div class="allorder">
    <div class="top">
      <h2>我的订单</h2>
      <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
    </div>
    <div class="container">
      <ul class="allorder-container">
        <router-link
          :to="{ path: '/profile/order/havepaid', query: { info: '我的订单' } }"
        >
          <li
            :class="
              this.$route.path === '/profile/order/havepaid'
                ? 'active-order'
                : ''
            "
          >
            全部有效订单
          </li>
        </router-link>
        <router-link
          :to="{ path: '/profile/order/nopaid', query: { info: '我的订单' } }"
        >
          <li
            :class="
              this.$route.path === '/profile/order/nopaid' ? 'active-order' : ''
            "
          >
            待支付
          </li>
        </router-link>
        <router-link
          :to="{
            path: '/profile/order/waitesend',
            query: { info: '我的订单' },
          }"
        >
          <li
            :class="
              this.$route.path === '/profile/order/waitesend'
                ? 'active-order'
                : ''
            "
          >
            待收货
          </li>
        </router-link>
        <router-link
          :to="{
            path: '/profile/order/recycleOrder',
            query: { info: '我的订单' },
          }"
        >
          <li
            :class="
              this.$route.path === '/profile/order/recycleOrder'
                ? 'active-order'
                : ''
            "
          >
            订单回收站
          </li>
        </router-link>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "AllOrder"
};
</script>
<style>
.active-order {
  color: orangered;
}
.allorder {
  padding: 40px;
  color: #757575;
}
.allorder .top {
  text-align: left;
  display: flex;
  align-items: baseline;
}
.allorder .top h2 {
  font-size: 30px;
  margin-right: 10px;
}
.allorder .container .allorder-container {
  display: flex;
  justify-content: flex-start;
  font-size: 16px;
  padding-top: 30px;
}
.allorder .container .allorder-container li:nth-child(n + 2),
.allorder .container .allorder-container a:nth-child(n + 2) {
  /* margin-right: 10p; */
  margin-left: 10px;
  border-left: 1px solid #cac6c6;
  padding-left: 10px;
}
.allorder .container .allorder-container li:hover {
  cursor: pointer;
}
</style>