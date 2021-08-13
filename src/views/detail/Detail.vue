<template>
  <div>
    <div :class="addclass"></div>
    <nav-bar></nav-bar>
    <div class="address-box" v-if="addstate">
      <a href="#" class="shutdown" @click="shutdown"
        ><i class="iconfont icon-err1"></i
      ></a>
      <div class="title">我的收货地址</div>
      <div class="adress-content">
        <span
          v-if="
            this.$store.state.addressinfo == null ||
            this.$store.state.addressinfo.length === 0
          "
        >
          暂无收货地址,去
          <router-link
            :to="{ path: '/profile/address', query: { info: '收货地址' } }"
            style="color: red"
            >添加</router-link
          >
        </span>
        <div v-else>
          <ul class="address-show">
            <li
              @click="addressclick(index)"
              v-for="(item, index) in addressList"
              :key="index"
            >
              <div>{{ item.name }}</div>
              <div>
                {{ item.province }} {{ item.city }} {{ item.area }}
                {{ item.info }}
              </div>
            </li>
          </ul>
          <el-pagination
            small
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :current-page="currentPage"
            :page-size="pagesize"
            :total="getTotal()"
          >
            >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="productInfo-container w">
      <div class="left">
        <img
          :src="require('assets/img/' + productInfo[0].showInfoImg)"
          style="width: 560px; height: 560px"
        />
      </div>
      <div class="right">
        <h2>{{ name }}</h2>
        <div class="address">
          <i class="fa fa-map-marker"></i>
          <span>{{ addressinfo }}</span>
          <a href="#" @click="addressChange">修改</a>
        </div>
        <br />
        <div class="color">
          <div class="title">选择颜色</div>
          <ul>
            <li v-for="(item, index) in getColor()" :key="index">
              <a
                href="javascript:;"
                @click="addclass1(index)"
                :class="{ active: activeClass1 == index }"
                >{{ item }}</a
              >
            </li>
          </ul>
        </div>

        <div class="version">
          <div class="title">选择版本</div>
          <ul>
            <li v-for="(item, index) in getVersion()" :key="index">
              <a
                 href="javascript:;"
                @click="addclass2(index)"
                :class="{ active: activeClass2 == index }"
                >{{ item }}</a
              >
            </li>
          </ul>
        </div>
        <div class="total">
          <div class="total-top">
            <span>{{ name }} {{ co }} {{ ver }} </span>
            <span>{{ totalPrice }}元</span>
          </div>
          <div class="sum">
            <span>总计：</span>
            <span>{{ totalPrice }}元</span>
          </div>
        </div>
        <a href="javascript:;" class="addCart" @click="addShoppingCart">加入购物车</a>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import { getProductDetail, getAddress,addToShoppingCart } from "network/detail.js";
import NavBar from "components/common/navbar/NavBar.vue";
import Footer from "components/common/Footer.vue";
export default {
  name: "Detail",
    components: {
    NavBar,
    Footer
  },
   // 获取商品详情数据
  created() {
    this.id = this.$route.params.id;
    getProductDetail(this.id).then((res) => {
      this.productInfo = res;
      this.name = res[0].name;
      this.co = res[0].color;
      this.ver = res[0].version;
      this.totalPrice = res[0].price;
    })
  },
  data() {
    return {
      id: null,//商品id
      name: "",//商品名
      color: [],
      version: [],
      productInfo: [],//商品详情信息表
      activeClass1: 0,
      activeClass2: 0,
      totalPrice: 0,//商品价格
      co: "",//商品颜色
      ver: "",//商品型号
      addstate: false,
      addclass: "",
      currentPage: 1, //初始页
      pagesize: 6, //    每页的数据
      addressList: [],
      addressinfo: "湖南永州",
    };
  },
  computed: {
    // 获取总价
    getTotalPrice() {
      this.productInfo.forEach((item) => {
        if (item.color === this.co && item.version === this.ver) {
          this.totalPrice = item.price;
        }
      });
    },
  },
  
  methods: {
    // 加入购物车
    addShoppingCart()
    {
       this.productInfo.forEach((item,index,array)=>{
             if(item.color===this.co&&item.version===this.ver)
             {
              //  alert(this.$store.state.personal._id)
              addToShoppingCart(this.$store.state.personal._id,item).then(res=>{
                  if(res==='success')
                  {
                    alert("加入购物车成功");
                  }
              })
              return;
             }
       });
    
    },
    // 获取一共有多少条数据
    getTotal() {
      return this.$store.state.addressinfo.length;
    },
    // 选择收货地址
    addressclick(index) {
      this.addstate = false;
      this.addclass = "";
      this.addressList.forEach((value, index1, Array) => {
        if (index === index1) {
          this.addressinfo =
            value.province +
            " " +
            value.city +
            " " +
            value.area +
            " " +
            value.info;
          return;
        }
      });
    },
    //获取当前页的数据
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log((this.currentPage - 1) * this.pagesize);
      this.addressList = this.$store.state.addressinfo.slice(
        (this.currentPage - 1) * this.pagesize,
        (this.currentPage - 1) * this.pagesize + this.pagesize
      );
    },
    // 关闭窗口
    shutdown() {
      this.addstate = false;
      this.addclass = "";
    },
    // 获取对应用户的收货地址
    async addressChange() {
      //判断之前是否请求过收货地址
      if (this.$store.state.addressflag === 0) {
        //如果之前没有请求过则对服务器发送请求
        let res = await getAddress(this.$store.state.personal._id);
        // 保存到vuex中
        this.$store.commit({
          type: "saveAddressInfo",
          res,
        });
      }
      this.addressList = this.$store.state.addressinfo.slice(0, this.pagesize);
      this.addstate = true;
      this.addclass = "model";
    },
    addclass1(i) {
      this.activeClass1 = i;
      this.co = this.color[i];
      this.getTotalPrice;
    },
    addclass2(i) {
      this.activeClass2 = i;
      this.ver = this.version[i];
      this.getTotalPrice;
    },
    // 获取该商品的所有颜色
    getColor() {
      //  console.log("1111")
      this.productInfo.forEach((item) => {
        if (this.color.indexOf(item.color) === -1) {
          this.color.push(item.color);
        }
      });
      return this.color;
    },
    // 获取该商品的所有的型号
    getVersion() {
      this.productInfo.forEach((item) => {
        if (this.version.indexOf(item.version) === -1) {
          this.version.push(item.version);
        }
      });
      // this.ver=this.version[0]
      return this.version;
    },
  }
}
</script>
<style>
.model {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  opacity: 0.5;
  background-color: #000;
  z-index: 2;
}
.address-box {
  width: 700px;
  height: 400px;
  border: 1px solid gainsboro;
  position: fixed;
  margin-left: 250px;
  margin-top: 0px;
  z-index: 3;
  background-color: white;
  /* overflow: hidden; */
}
.address-box .address-show {
  width: 100%;
  box-sizing: border-box;
  padding: 30px 30px 0px 30px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.address-box .address-show li {
  width: 45%;
  text-align: left;
  margin-bottom: 15px;
  box-sizing: border-box;
  padding: 15px;
}
.address-box .address-show li:hover {
  background-color: rgb(189, 185, 185, 0.3);
}
.address-box .address-show li div:nth-child(1) {
  color: #333;
}
.address-box .address-show li div:nth-child(2) {
  font-size: 12px;
  color: #b0b0b0;
  margin-top: 5px;
}
.address-box .shutdown {
  position: absolute;
  right: 4px;
  padding-top: 4px;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
}
.address-box .shutdown:hover {
  background-color: orangered;
  border-radius: 50%;
}
.address-box .title {
  font-size: 16px;
  color: #b0b0b0;
  text-align: left;
  margin-top: 15px;
  margin-left: 20px;
}
body {
  background-color: white;
}
/* .el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
.productInfo-container {
  display: flex;
  justify-content: space-evenly;
}
.productInfo-container title {
  font-size: 18px;
}
.productInfo-container .left {
  width: 560px;
  z-index: 0;
}
.productInfo-container .right {
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
}
.productInfo-container .right h2 {
  font-size: 24px;
  font-weight: 400;
  color: #212121;
  margin-bottom: 10px;
}
.productInfo-container .right .address {
  padding: 30px 50px;
  position: relative;
  background: #fafafa;
  border: 1px solid #e0e0e0;
}
.productInfo-container .right .address span {
  margin-left: 10px;
  margin-right: 10px;
}
.productInfo-container .right .address a {
  color: orangered;
}
.productInfo-container .right .color {
  margin-bottom: 10px;
}
.productInfo-container .right .color ul {
  width: 100%;
  height: 50px;
  text-align: center;
}
.productInfo-container .right .color ul li {
  width: 292px;
  height: 42px;
  float: left;
  margin-top: 10px;
  margin-right: 5px;
  border: 1px solid #e0e0e0;
}
.productInfo-container .right .color ul li a:link {
  width: 100%;
  height: 100%;
  display: inline-block;
  line-height: 42px;
}
.productInfo-container .right .version ul {
  width: 100%;
  height: 50px;
  text-align: center;
}
.productInfo-container .right .version ul li {
  width: 292px;
  height: 42px;
  float: left;
  margin-top: 10px;
  margin-right: 5px;
  border: 1px solid #e0e0e0;
}
/* .productInfo-container .right .version ul li a:active {
  border: 1px solid #ff6700;
  z-index: 3;
} */
.productInfo-container .right .version ul li a:link {
  width: 100%;
  height: 100%;
  display: inline-block;
  line-height: 42px;
  /* border: 1px solid #e0e0e0; */
}
.productInfo-container .right .version ul li a:active {
  border: 1px solid #ff6700;
  z-index: 3;
}
.active {
  border: 1px solid #ff6700;
  color: orangered;
  z-index: 3;
}
.productInfo-container .right .total {
  width: 100%;
  height: 146px;
  background-color: #f9f9fa;
  margin-top: 10px;
}
.productInfo-container .right .total .total-top {
  width: 540px;
  height: 30px;
  margin: auto;
  color: #616161;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.productInfo-container .right .total .sum {
  font-size: 24px;
  color: #ff6700;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 20px 0px 0px 30px;
}
.productInfo-container .right .addCart {
  width: 298px;
  height: 52px;
  line-height: 52px;
  font-size: 16px;
  background: #ff6700;
  border-color: #ff6700;
  color: #fff;
  text-align: center;
  margin-top: 10px;
}
</style>