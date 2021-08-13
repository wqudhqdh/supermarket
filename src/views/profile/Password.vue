<template>
  <div class="password">
    <div>
      <span >登录密码修改：</span>
      <i class="iconfont icon-xiugai1" @click="itemclick1()"></i>
    </div>
    <div>
      <span>支付密码修改：</span>
      <i class="iconfont icon-xiugai1" @click="itemclick2()"></i>
    </div>
  </div>
</template>
<script>
import {changePassword,changePayPassword} from 'network/profile.js'
export default {
  name: "Password",
  methods:{
      itemclick1(){
          let password=prompt("请输入新密码")
          changePassword(this.$store.state.personal._id,password).then(res=>{
             if(res==='success')
             {
                 alert("修改成功")
             }
          })
      },
      itemclick2(){
          let password1=prompt("请输入原支付密码")
          if(password1===this.$store.state.personal.paypassword)
          {
                let password2=prompt("请输入新的支付密码")
   changePayPassword(this.$store.state.personal._id,password2).then(res=>{
             if(res==='success')
             {
                 alert("修改成功")
             }
          })
          }
          else{
              alert("密码错误，请重试")
          }
       
      }
  }
};
</script>
<style>
.password {
  box-sizing: border-box;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.password span {
  font-size: 16px;
}
</style>