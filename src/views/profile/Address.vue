<template>
  <div class="address">
    <div :class="addclass"></div>
    <div class="address-box" v-if="show">
      <header>
        <a href="#" class="shutdown" @click="shutdown"
          ><i class="iconfont icon-err1"></i
        ></a>
        <div class="title address-w"  v-if="modify">添加收货地址</div>
        <div class="title address-w"  v-else>修改收货地址</div>
      </header>
      <div class="address-content address-w" >
        <div class="add-top">
          <input
            type="text"
            name="username"
            placeholder="姓名"
            id=""
            v-model="addressInfo.name"
          />
          <input
            type="text"
            name="phone"
            placeholder="手机号"
            id=""
            v-model="addressInfo.phone"
          />
        </div>
        <v-distpicker
          :province="addressInfo.province"
          :city="addressInfo.city"
          :area="addressInfo.area"
          @province="onChangeProvince"
          @city="onChangeCity"
          @area="onChangeArea"
        ></v-distpicker>
        <textarea
          placeholder="详细地址"
          class="address-w"
          v-model="addressInfo.info"
        ></textarea>
        <div class="footer">
          <p></p>
          <button @click="makesure">确定</button>
          <button @click="resert">取消</button>
        </div>
      </div>
    </div>
    <h1>收货地址</h1>
    <ul>
      <li>
        <a href="#" @click="itemAdd"
          ><div class="add-desc">
            <i class="iconfont icon-plus"></i>
            <span>添加收货地址</span>
          </div>
        </a>
      </li>
      <li v-for="(item, index) in this.$store.state.addressinfo" :key="index" >
        <div :class="['address-show',activeItem===index?'active':' ']" @click="chooseAddress(item,index)" >
          <h1 class="name">{{ item.name }}</h1>
          <p class="phone">{{ item.phone }}</p>
          <p class="address-s">
            {{ item.province}}  {{ item.city }}  {{ item.area }}
          </p>
          <p class="addressinfo">{{ item.info }}</p>
          <div class="operate">
            <a href="#" @click="display(item._id)"><span class="display" >修改</span></a>
              <a href="#" @click="Delete(item._id)"><span class="delete" >删除</span></a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import { getAddress } from "network/detail.js";
import { saveAddressToDB,deleteAddressToDB ,modifyAddressToDB} from "network/profile.js";
export default {
  name: "Address",
  data() {
    return {
      // 灰色罩子效果
      addclass: "",
      // 是否弹出对话框
      show: false,
      // 活动的文本框
      activeitem: "",
         activeItem:-1,
      addressInfo: {
        name: "",
        phone: "",
        province: "",
        city: "",
        area: "",
        info: "",
     
      },
        modify:true
    };
  },
  computed: {
    // 展示之前的收货地址
    getAddress() {
      if (this.$store.state.addressInfo == null) {
        return [];
      } else {
        return this.$store.state.addressInfo;
      }
    }
  },
  created() {
    //判断之前是否请求过收货地址
    if (this.$store.state.addressflag === 0) {
      //如果之前没有请求过则对服务器发送请求
      getAddress(this.$store.state.personal._id).then((res) => {
        console.log(res)
        // 保存到vuex中
        this.$store.commit({
          type: "saveAddressInfo",
          res,
        });
      });
    }
  },
  components: {
    VDistpicker,
  },
  methods: {
    getActive()
    {
      this.isActive=true
    },
    // 发送选择的数据到父组件
    chooseAddress(item,index)
    {
      this.activeItem=index
          this.$emit('getAddress',item)
    },
    modifyAddress()
    {
      console.log(this.addressInfo)
this.$store.state.addressinfo = this.$store.state.addressinfo.map(item => {
    return item._id === this.addressInfo._id ? this.addressInfo: item;
  });
modifyAddressToDB(this.addressInfo).then(res=>{
  if(res==='fail')
  {
    alert("修改失败")
  }
  else{
    alert("修改成功")

  }
})
  this.shutdown();

    },
    // 修改地址
    display(id)
    {
           this.addclass = "model";
      this.show = true;
      alert(id)
       this.show=true
       this.modify=false
       let addresslist=this.$store.state.addressinfo

       addresslist.forEach((item,index,addresslist)=>{
         if(item._id===id)
         {
             this.addressInfo.name=item.name;
             this.addressInfo.phone=item.phone;
             this.addressInfo.province=item.province;
             this.addressInfo.city=item.city;
             this.addressInfo.area=item.area;
             this.addressInfo.info=item.info;
             this.addressInfo._id=id
         }
         return
       })
       
    },
    // 删除地址
      Delete(id)
    {
        this.addclass = "model";
        let addresslist=this.$store.state.addressinfo
        // 删除地址
      addresslist.forEach((item,index,addresslist)=>{
        if(item._id===id)
        {
          this.$store.state.addressinfo.splice(index,1)
          deleteAddressToDB(id).then(res=>{
            if(res==='fail')
            {
              alert("删除失败")
            }
            else if(res==='success')
            {
              alert("删除成功")
               this.addclass = "";
            }
          })
        }
      })
    },
        // 确认
    async makesure() {
  
      let phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(this.addressInfo.phone)) {
        alert("号码格式不正确，请重新输入");
        this.addressInfo.phone = "";
      } else {
        if (
          this.addressInfo.name &&
          this.addressInfo.phone &&
          this.addressInfo.province&&
          this.addressInfo.city &&
          this.addressInfo.area &&
          this.addressInfo.info
        ) {
          // 如果是修改后提交
          if(this.modify===false)
          {
            this.modifyAddress()
          }
          else{
          let addressInfo = this.addressInfo;
          let list = this.$store.state.addressinfo;
          // 查找地址是否存在
          let flag = false;
          list.forEach((element, index, list) => {
            if(
              element.name === addressInfo.name &&
              element.phone === addressInfo.phone &&
              element.province === addressInfo.province &&
              element.city === addressInfo.city &&
              element.area === addressInfo.area &&
              element.info === addressInfo.info
            )
             {
              alert("该地址已经存在");
              flag = true;
              this.addressInfo = this.$options.data().addressInfo;
              return;
            }
          });
// 如果地址不存在
          if (!flag) {
            this.show = false;
            this.addclass = "";
            let result = await saveAddressToDB(
              this.addressInfo,
              this.$store.state.personal
            );
            if (result === "fail") {
              alert("添加失败");
            } else {
            
            //  放进去了
            this.addressInfo._id=result._id
            this.$store.commit({
              type: "addAddressInfo",
              addressInfo,
            });
              alert("添加成功");
            console.log(this.$store.state.addressinfo)

            }
          } 
        }
      }
        else {
            alert("请填写完整");
          }
      }
      },
    // 重置
    resert() {
      this.addressInfo = this.$options.data().addressInfo;
    },
    onChangeProvince(a) {
      this.addressInfo.province = a.value;
    },
    onChangeCity(a) {
      this.addressInfo.city = a.value;
    },
    onChangeArea(a) {
      this.addressInfo.area = a.value;
    },
    itemAdd() {
      this.addclass = "model";
      this.show = true;
    },
    // 关闭窗口
    shutdown() {
      this.show = false;
      this.addclass = "";
            this.resert()
      if(this.modify===false)
      {
        this.modify=true
      }
    },
    itemclick(event) {
      event.addclass = "active";
    },
  }
};
</script>
<style scoped>
.active {
  border: 1px solid #ffb27f;

/* border-color: orangered; */
}
.address-w {
  width: 640px;
  margin: auto;
}
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
    width: 660px;
    border: 1px solid gainsboro;
    position: fixed;
    top: 100px;
    z-index: 3;
    left:100px;
    background-color: white;
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
  color: white;
}
.address-box header {
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.address-box header .title {
  font-size: 18px;
  color: #424242;
  height: 60px;
  line-height: 60px;
  font-weight: 400;
}
.address-box .address-content {
  box-sizing: border-box;
  padding-top: 20px;
}
.address-box .address-content .add-top {
  display: flex;
  justify-content: space-between;
}
.address-box .address-content .add-top input {
  width: 49%;
  height: 40px;
  box-sizing: border-box;
  padding: 0px 0px 0px 12px;
  outline: none;
  border: 1px solid #e0e0e0;
  transition: border-color 0.2s linear;
}
.address-box .address-content .add-top input:focus {
  border: 1px solid orangered;
}
.address {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 0px 0px 50px;
}
.address h1 {
  font-size: 30px;
  font-weight: 400;
  line-height: 68px;
  color: #757575;
  text-align: left;
}
.address-box .address-content textarea {
  /* width: 100%; */
  height: 70px;
  outline: none;
  border: 1px solid #e0e0e0;
  margin-top: 20px;
  box-sizing: border-box;
  padding-left: 12px;
  padding-top: 12px;
}
.address-box .address-content .footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
      margin-bottom: 20px;
}
.address-box .address-content .footer button {
  width: 160px;
  height: 40px;
  color: white;
  font-size: 20px;
}
.address-box .address-content .footer button:nth-of-type(1) {
  background-color: orangered;
  border: 1px solid orangered;
  margin-right: 25px;
}
.address-box .address-content .footer button:nth-of-type(2) {
  background-color: #b0b0b0;
  border: 1px solid #b0b0b0;
}
ul {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
ul li {
  
    width: 30%;
  height: 180px;
  border: 1px solid #e0e0e0;
  margin-right: 20px;
  margin-bottom: 10px;
}
ul li:nth-child(1) {
  display: flex;
  justify-content: center;
  align-items: center;
}
ul li:nth-child(1) .add-desc {
  display: flex;
  flex-direction: column;
  align-items: center;
}
ul li:nth-child(1) .add-desc i {
  font-size: 30px;
}
ul li:nth-child(1) .add-desc span {
  color: #b0b0b0;
}
ul li .address-show {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
}
ul li .address-show .name {
  font-size: 18px;
  color: #333;
  line-height: 30px;
  margin-bottom: 10px;
}
ul li .address-show p:nth-of-type(n + 1) {
  color: #757575;
  margin-bottom: 5px;
}
ul li .address-show .operate  {
  width: 100%;
  padding: 0px 10px 0px 10px;
  text-align: right;
  box-sizing: border-box;
  margin-top: 20px;
  display: none;
}
ul li .address-show .operate  a{
   color: red;
}
ul li .address-show:hover .operate {
  display: block;

}
ul li .address-show .operate .delete {
  margin-left: 10px;
}
</style>