<template>
  <div class="admin">
    <div class="title">后台管理系统</div>
    <div class="admin-container">
      <div class="pro-container w">
        <div class="left" ref="items">
          <dl class="order">
            <dt>管理中心</dt>
            <router-link to="/admin/productmanager" > <dd :class="currentIndex===0?'activeAdmin':''" @click="itemClick(0)">商品管理</dd></router-link>
              <router-link to="/admin/ordermanager" > <dd :class="currentIndex===1?'activeAdmin':''" @click="itemClick(1)">订单管理</dd></router-link>
              <router-link to="/admin/usermanager" > <dd :class="currentIndex===2?'activeAdmin':''" @click="itemClick(2)">用户管理</dd></router-link>
             <router-link to="/admin/data" >  <dd :class="currentIndex===3?'activeAdmin':''" @click="itemClick(3)">数据统计</dd></router-link>
          </dl>
        </div>
        <div class="right">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Admin",
  data(){
    return{
      currentIndex:-1
    }
  },
  methods:{
    itemClick(index)
    {

      this.currentIndex=index
    }
  }
};
</script>
<style>
.admin .pro-container .left .activeAdmin{
  color: orangered;
}
.admin .title {
  height: 41px;
  line-height: 41px;
  font-size: 24px;
  text-align: center;
  background-color: #b3abab;
  color: white;
}
.admin .admin-container {
  background-color: rgb(243 242 242);
  margin-top: 20px;
}
.admin .pro-container {
  display: flex;
  justify-content: space-between;
}

.admin .pro-container .left {
  width: 10%;
  background-color: white;
  text-align: center;
}

.admin .pro-container .left .order,
.admin .pro-container .left .pro,
.admin .pro-container .left .account {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  box-sizing: border-box;
}

.admin .pro-container .left .order {
  height: 184px;
}

.admin .pro-container .left .pro {
  height: 150px;
}

.admin .pro-container .left .account {
  height: 100px;
}

.admin .pro-container .left dl {
  margin-bottom: 5px;
}

.admin .pro-container .left dt {
  font-size: 16px;
  font-weight: 400;
  line-height: 52px;
  color: #333;
  margin: 0;
  padding: 0;
}

.admin .pro-container .left dd {
  color: #928f8f;
}

.admin .pro-container .right {
  width: 85%;
  background-color: white;
}
</style>