
<template>
  <div class="personalinfo">
    <div class="top">
      <div class="left">
        <label>
          <img :src="!flag ? imgsrc1 : imgsrc2" />
          <input
            @change="imgChoose($event)"
            class="none"
            type="file"
            accept="image/*"
          />
        </label>
        <div class="profile">
          <!-- <router-link :to="{path:'/profile/account',query:{info:'个人信息'}}" >去修改个人信息></router-link> -->
        </div>
      </div>
      <div class="right">
        <p>
          <span>用户昵称：</span>
          <span>{{ this.$store.state.personal.username }}</span>
          <el-button type="text" @click="dialogFormVisible = true">
            <i class="iconfont icon-xiugai1"></i>
          </el-button>
          <el-dialog
            title="用户昵称修改"
            :visible.sync="dialogFormVisible"
            center="true"
            destroy-on-close="true"
          >
            <el-form :model="form">
              <el-form-item label="用户昵称" :label-width="formLabelWidth">
                <el-input v-model="name" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="checkUsername()"
                >确认修改</el-button
              >
            </div>
          </el-dialog>
        </p>
        <p>
          <span> 绑定手机： </span>
          <span> {{ this.$store.state.personal.phone }}</span>
        </p>
        <p>
          <span>绑定邮箱： </span
          ><span>
            {{ this.$store.state.personal.email }}
          </span>
        </p>
        <div>
          <span>账户余额：{{ this.$store.state.personal.account }}元</span>
          <a href="#" @click="addCount">充值</a>
        </div>
      </div>
    </div>
    <div class="bootom">
      <ul>
        <li>
          <img src="~assets/img/portal-icon-1.png" />

          <div>
            <span>待支付的订单</span>
            <router-link
              :to="{
                path: '/profile/order/nopaid',
                query: { info: '我的订单', info2: '待支付' },
              }"
              >查看待支付的订单></router-link
            >
          </div>
        </li>
        <li>
          <img src="~assets/img/portal-icon-2.png" />

          <div>
            <span>待收货的订单</span>
            <router-link
              :to="{
                path: '/profile/order/waitesend',
                query: { info: '我的订单' },
              }"
              >查看待收货的订单></router-link
            >
          </div>
        </li>
        <li>
          <img src="~assets/img/portal-icon-3.png" />
          <div>
            <span>待评价商品数</span>
            <a href="#">查看待评价商品></a>
          </div>
        </li>
        <li>
          <img src="~assets/img/portal-icon-4.png" />
          <div>
            <span>喜欢的商品</span>
            <a href="#">查看喜欢的商品></a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { saveImgSrc, modifyusername } from "network/profile.js";
import { checkNames } from "network/user.js";
export default {
  name: "PersonalInfo",
  data() {
    return {
      imgsrc1: require("assets/img/profile.jpg"),
      imgsrc2: null,
      flag: false,
      dialogFormVisible: false,
      name: "",
      formLabelWidth: "120px",
    };
  },
  created() {
    // 判断图片是否修改过
    if (this.$store.state.personal.imgSrc === " ") {
    } else {
      this.flag = true;
      this.imgsrc2 = this.$store.state.personal.imgSrc;
    }
  },
  methods: {
    // 校验用户名是否存在
    checkUsername() {
      console.log("name");
      checkNames(this.name).then((res) => {
        if (res === 0) {
          alert("用户名已注册");
        } else {
          modifyusername(this.$store.state.personal._id, this.name).then(
            (res) => {
              let name = this.name;
              this.$store.commit({
                type: "changeUsername",
                name,
              });
              alert("修改成功");
            }
          );
        }
      });
      this.dialogFormVisible = false;
    },
    // 确认修改
    itemClick() {
      alert(this.name);
      let flag = this.checkUsername();
      if (flag) {
        alert(flag);
      }
      // this.dialogFormVisible = false
    },
    // 更换头像
    imgChoose(event) {
      let url = event.target.files[0];
      console.log(url);
      console.log(JSON.stringify(url));
      if (url == undefined) {
        throw error("url is not defined");
      }
      if ("FileReader" in window) {
        this.flag = true;
        let img = new FileReader();
        img.readAsDataURL(url);
        img.onload = ({ target }) => {
          this.imgsrc2 = target.result;
          let imgsrc = target.result;
          saveImgSrc(this.$store.state.personal._id, this.imgsrc2).then(
            (res) => {
              if (res === "success") {
                this.$store.commit({
                  type: "changeImgsrc",
                  imgsrc,
                });
                alert("头像修改成功");
              }
            }
          );
        };
      } else {
        throw error("no FileReader in window");
      }
    },
    // 账户充值
    addCount() {
      let paypassword = prompt("请输入您的支付密码", "");
      if (paypassword === this.$store.state.personal.paypassword) {
        let money = prompt("请输入您要充值的金额", 0);
        let account = this.$store.state.personal.account + parseInt(money);
        this.$store.dispatch("changeAccount", account).then((res) => {
          if (res === "success") {
            alert("充值成功");
          } else {
            alert("充值失败");
          }
        });
      } else {
        alert("支付密码错误,请重新输入");
      }
    },
  },
};
</script>
<style scoped>
@import "~assets/css/personalinfo.css";
.none {
  display: none;
}
</style>