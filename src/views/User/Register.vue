<template>
  <div class="container">
    <form action="#" method="post" onsubmit="return false">
      <input
        name="username"
        type="text"
        placeholder="用户名"
        id="username"
        v-model="name"
      />
      <span v-if="checkname" class="username">用户名已存在</span>
      <input name="phone" type="text" placeholder="手机号" v-model="phone" />
      <span v-if="checkphone === 0" class="phone">手机号格式不正确</span>
      <span v-else-if="checkphone === 1" class="phone">手机号已存在</span>
      <input name="email" type="email" placeholder="邮箱" v-model="email" />
      <span v-if="checkemail === 0" class="email">邮箱格式不正确</span>
      <span v-else-if="checkemail === 1" class="email">邮箱已存在</span>
      <div class="send-info">
        <input type="text" placeholder="验证码" v-model="code" />
        <a
          href="#"
          @click="sendCode()"
          v-if="isRun"
          style="pointer-events: none"
          >{{ runTime }}秒后重新获取</a
        >
        <a href="#;" @click="sendCode()" v-else>获取邮箱验证码</a>
      </div>
      <input type="password" placeholder="登录密码" v-model="password" />
      <input type="password" placeholder="支付密码" v-model="paypassword" />
           <span v-if="!checkpaypassword" class="paypassword">支付密码为6位数字格式</span>
      <input type="submit" value="注册" class="submit" @click="register()" />
    </form>
  </div>
</template>
<script>
import {
  sendCodeToEmail,
  checkNames,
  CheckPhones,
  CheckEmails,
  Register,
} from "network/user.js";
import lodash from "lodash";
export default {
  name: "Register",
  data() {
    return {
      isRun: false,
      runTime: 15,
      receivecode: "",
      code:"",
      name: "",
      phone: "",
      email: "",
      password: "",
      paypassword:"",
      checkname: false,
      checkphone: 2,
      checkemail: 2,
      checkcode: true,
      checkpaypassword:true
    };
  },
  watch: {
    name: function (news, olds) {
      // 一旦停止输入用户名则验证用户名是否存在过
      this.debouncedCheckUsername();
    },
    phone: function (news, olds) {
      this.debouncedCheckPhone();
    },
    email: function (news, olds) {
      this.debouncedCheckEmail();
    },
    paypassword:function(news,olds){
      this.debouncedCheckPaypassword();
    }
  },
  computed: {},
  created() {
    // 用户名验证
    this.debouncedCheckUsername = _.debounce(this.checkUsername, 1000);
    // 手机号码验证
    this.debouncedCheckPhone = _.debounce(this.checkPhone, 1000);
    // 邮箱验证
    this.debouncedCheckEmail = _.debounce(this.checkEmail, 1000);
    // 支付密码
    this.debouncedCheckPaypassword=_.debounce(this.checkPaypassword,1000)
  },
  methods: {
    // 发送验证码
 async sendCode() {
      if(this.checkemail===2)
      {
      console.log("code");
      this.isRun = true;
      // 通知服务器发送验证码,并取得验证码
      this.receivecode = await sendCodeToEmail(this.email);
      if(this.receivecode===-1)
      {
        alert("邮箱内部错误，请重试")
             this.isRun = false;
      return;
      }
      console.log(this.receivecode)
      this.clock = setInterval(() => {
        if (this.runTime === 0) {
          this.runTime = 15;
          this.isRun = false;
          clearInterval(this.clock);
          this.receivecode=""
        }
        this.runTime--;
      }, 1000);
      }
      else{
        alert("请重新确认邮箱")
      }
    },
  
    // 校验用户名是否存在
    checkUsername() {
      console.log("name");
      checkNames(this.name).then((res) => {
        if (res === 0) {
          this.checkname = true;
        } else {
          this.checkname = false;
        }
      });
    },
    // 校验手机号格式是否正确，并校验是否注册过
    checkPhone() {
      console.log("phone");
      let regex = /^1[3-9]\d{9}$/;
      if (!regex.test(this.phone)) {
        this.checkphone = 0;
        return;
      } else {
        CheckPhones(this.phone).then((res) => {
          if (res === 1) {
            this.checkphone = 2;
          } else {
            this.checkphone = 1;
          }
        });
      }
    },
    // 检查支付密码
    checkPaypassword()
    {
      console.log('paypassword')
         let regex=/^\d{6}$/
         if(!regex.test(this.paypassword))
         {
           console.log("1111")
            this.checkpaypassword=false
            return
         }
          console.log("2222")
         this.checkpaypassword=true
         return
    },
    //校验邮箱格式是否正确，并校验是否注册过
    checkEmail() {
      console.log("email");
      let regex =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!regex.test(this.email)) {
        this.checkemail = 0;
        return;
      } else {
        CheckEmails(this.email).then((res) => {
          if (res === 1) {
            this.checkemail = 2;
          } else {
            this.checkemail = 1;
          }
        });
      }
    },
      // 注册
    register() {
      console.log("reg")
      if (!(this.name && this.phone && this.email && this.password&&this.code&&this.paypassword)) {
        alert("请填写完整");
      }
      else if (this.code!=this.receivecode)
      {
        alert("验证码输入错误,请重新验证")
      }
      else if (
        this.checkname === false &&
        this.checkphone === 2 &&
        this.checkcode === true &&
        this.checkemail === 2&&
        this.checkpaypassword===true
      ) {
        const formData=new FormData();
        formData.append("username",this.name);
        formData.append("phone",this.phone);
        formData.append("email",this.email);
        formData.append("password",this.password);
         formData.append("paypassword",this.paypassword);
        Register(formData).then(res=>{
           if(res==="success")
           {
             alert("注册成功");
             this.name=""
             this.phone=""
             this.email=""
             this.code=""
             this.password=""
             this.$emit("loginChange");
           }
           else{
             alert("注册失败")
           }
        });

      }
      else{
        alert("信息错误，请重新核对信息")
      }
    },
  },
};
</script>
<style scoped>
form {
  position: relative;
}
input {
  /* position:relative; */
  width: 300px;
  height: 50px;
  outline: none;
  border: 1px solid bisque;
  margin-bottom: 10px;
}
span {
  font-size: 12px;
  color: red;
}
form .username {
  position: absolute;
  right: 0;
  top: 20px;
}
form .phone {
  position: absolute;
  right: 0;
  top: 80px;
}
form .email {
  position: absolute;
  right: 0;
  top: 140px;
}
.send-info {
  position: relative;
}
.send-info a {
  color: #ff5c00;
}
.send-info a {
  position: absolute;
  top: 15px;
  right: 0px;
  font-size: 12px;
}
.submit {
  margin-top: 20px;
  background-color: #ff5c00;
  font-size: 20px;
  border: #ff5c00;
  color: white;
  border-radius: 5px;
  opacity: 0.5;
}
</style>