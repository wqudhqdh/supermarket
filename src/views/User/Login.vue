<template>
  <form action="#" method="post" onsubmit="return false" ref="log">
    <div v-if="loginChoice">
      <input
        type="text"
        placeholder="用户名/手机号"
        v-model="loginForm.account"
      />
      <div class="send-info">
        <input
          type="password"
          placeholder="密码"
          v-model="loginForm.password"
        />
      </div>
    </div>
    <div v-else>
      <input type="text" placeholder="邮箱" v-model="loginForm.account" />
      <span v-if="checkemail === 0" class="email">邮箱格式不正确</span>
      <div class="send-info">
        <input type="password" placeholder="验证码" v-model="code" />
        <a
          href="#"
          @click="sendCode()"
          v-if="isRun"
          style="pointer-events: none"
          >{{ runTime }}秒后重新获取</a
        >
        <a href="#;" @click="debouncedsendCode" v-else>获取邮箱验证码</a>
      </div>
    </div>
    <input type="submit" value="登录" class="submit" @click="debouncedLogin" />
    <div class="info">
      <a href="#">修改密码</a>
      <a href="#" v-if="loginChoice" @click="changeState">邮箱登录</a>
      <a href="#" v-else @click="changeState">手机账号登录</a>
    </div>
  </form>
</template>
<script>
import {
  LoginAccount,
  LoginEmail,
  sendCodeToEmail,
  CheckEmails,
} from "network/user.js";
import { parse } from "qs";
export default {
  name: "Login",
  created() {
    // 邮箱验证
    this.debouncedsendCode = _.debounce(this.sendCode, 1000);
    // 登录
    this.debouncedLogin = _.debounce(this.login, 1000);
  },
  data() {
    return {
      loginChoice: true,
      isRun: false,
      runTime: 15,
      checkemail: 1,
      code: "",
      // account:"",
      loginForm: {
        account: "",
        password: "",
      },
      receivecode: "",
    };
  },
  methods: {
    // 切换登录方式
    changeState() {
      this.loginChoice = !this.loginChoice;
    },
    // 发送验证码
    async sendCode() {
      console.log("asyc");
      // 验证邮箱格式是否正确并监测是否注册过
      let a = await this.checkEmail();
      console.log(a);
      console.log(this.checkemail);
      if (this.checkemail == 2) {
        console.log("1111");
        this.isRun = true;
        // 通知服务器发送验证码,并取得验证码
        this.receivecode = await sendCodeToEmail(this.loginForm.account);
        if (this.receivecode === -1) {
          alert("邮箱内部错误，请重试");
          this.isRun = false;
          return;
        }
        this.clock = setInterval(() => {
          if (this.runTime === 0) {
            this.runTime = 15;
            this.isRun = false;
            clearInterval(this.clock);
            this.receivecode = "";
          }
          this.runTime--;
        }, 1000);
      }
    },
    //校验邮箱格式是否正确，并校验是否注册过
    async checkEmail() {
      console.log("email");
      let regex =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!regex.test(this.loginForm.account)) {
        this.checkemail = 0;
        return;
      } else {
        let res = await CheckEmails(this.loginForm.account);
        if (res === 1) {
          alert("该邮箱未注册，请注册后登录");
          this.checkemail = 1;
          return false;
        } else {
          console.log("2222");
          this.checkemail = 2;
          console.log(this.checkemail);
          return true;
        }
      }
    },
    // 登录
    login() {
      //  邮箱登录
      if (
        !(this.loginForm.account && this.code) &&
        this.loginChoice === false
      ) {
        alert("请填写完整");
      }
      // 账号密码登录
      else if (
        !(this.loginForm.account && this.loginForm.password) &&
        this.loginChoice === true
      ) {
        alert("请填写完整");
      } else {
        if (this.loginChoice === false) {
          // 判断验证码是否正确
          if (this.code != this.receivecode) {
            alert("验证码输入错误,请重新验证");
          } else {
            this.loginForm.password = this.code;
            // 生成token
            LoginEmail(this.loginForm).then((res) => {
              console.log(res);
              if (res.length != 0) {
                // 将登陆成功之后的token，保存到sessionStorage
                alert("登录成功");
                window.sessionStorage.setItem("token", res.token);
                let person = res.data[0];
                this.$store.commit({
                  type: "savePersonalInfo",
                  person,
                });
                this.$router.push("/home");
              }
            });
          }
        } else {
          LoginAccount(this.loginForm).then((res) => {
            console.log(res);
            if (res.length != 0) {
              // 将登陆成功之后的token，保存到sessionStorage
              alert("登录成功");
              window.sessionStorage.setItem("token", res.token);
              let person = res.data[0];
              this.$store.commit({
                type: "savePersonalInfo",
                person,
              });
              if (this.$store.state.personal.level === 0) {
                this.$router.push("/home");
              } else {
                this.$router.push("/admin");
              }
            } else {
              alert("账户或密码错误，请重试");
            }
          });
        }
      }
    },
  },
};
</script>
<style scoped>
input {
  width: 300px;
  height: 50px;
  outline: none;
  border: 1px solid bisque;
  margin-bottom: 20px;
}
form .email {
  position: absolute;
  right: 0;
  top: 20px;
}
span {
  font-size: 12px;
  color: red;
}
.send-info {
  position: relative;
}
.send-info a {
  position: absolute;
  top: 15px;
  right: 0px;
  font-size: 12px;
  color: #ff5c00;
}
.submit,
.reset {
  margin-top: 20px;
  background-color: #ff5c00;
  font-size: 20px;
  border: #ff5c00;
  color: white;
  border-radius: 5px;
  opacity: 0.5;
}
.info {
  width: 300px;
  height: 40px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.info a {
  color: #ff5c00;
}
</style>
