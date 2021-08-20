<template>
  <div class="addproduct">
    <el-steps :active="active" :align-center="true" :finish-status="wait">
      <el-step title="步骤 1"> </el-step>
      <el-step title="步骤 2"> </el-step>
      <el-step title="步骤 3"> </el-step>
    </el-steps>
    <div v-if="active === 0">
      <h1>商品基本信息填写</h1>
      <span>类别：</span>
      <el-select v-model="product.category" placeholder="请选择" @change="change()">
        <el-option
          v-for="item in options"
          :key="item.number"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
      <div class="name">
        <span>商品名称：</span>
        <el-input
          v-model="product.name"
          placeholder="请输入内容"
          type="text"
          style="width: 217px; margin: 10px 0px 10px 0px"
        ></el-input>
      </div>
      <div class="info">
        <span>商品描述：</span>
        <el-input
          v-model="product.info"
          placeholder="请输入内容"
          type="textarea"
          style="width: 217px"
        ></el-input>
      </div>
    </div>
    <div v-else-if="active === 1">
      <h1>商品参数信息选择</h1>
      <span>颜色：</span>
      <el-select v-model="product.color" placeholder="请选择" @change="change()" v-if="product.category.includes('手机')"> 
        <el-option 
          v-for="item in colors"
          :key="item.number"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
        <el-select v-model="product.color" placeholder="请选择" @change="change()" v-else> 
        <el-option 
          v-for="item in screen"
          :key="item.name"
          :label="item.color"
          :value="item.color"
        >
        </el-option>
      </el-select>
      <div class="version" style="margin-top:10px" v-if="product.category.includes('手机')">
        <span>内存：</span>
        <el-select v-model="product.version" placeholder="请选择" @change="change()">
          <el-option
            v-for="item in versions"
            :key="item.color"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
   
      </div>
       <div class="version" style="margin-top:10px" v-else>
        <span>尺寸：</span>
        <el-select v-model="product.version" placeholder="请选择" @change="change()">
          <el-option
            v-for="item in screen"
            :key="item.number"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
   
      </div>
           <div>
          <span>价格：</span>
          <el-input
            v-model="product.price"
            placeholder="请输入价格"
            type="text"
            style="width: 217px; margin: 10px 0px 10px 0px"
          ></el-input>
        </div>
        <div>
          <span>库存：</span>
          <el-input
            v-model="product.num"
            placeholder="请输入库存数"
            type="text"
            style="width: 217px; margin: 10px 0px 0px 0px"
          ></el-input>
        </div>
    </div>

    <div v-else-if="active === 2">
      <div>上传商品图片：</div>
         <label>
          <img :src="product.imageUrl" style="width:300px;height:200px" />
          <!-- <img src="~assets/img/phone1.png" v-else> -->
          <input
            @change="imgChoose($event)"
            class="none"
            type="file"
            accept="image/*"
          />
        </label>
      
    </div>
    <el-button style="margin-top: 12px" @click="next">下一步</el-button>

  </div>
</template>
<script>
import { getCategory ,addProduct} from "network/admin.js";
export default {
  name: "addProduct",
  data() {
    return {
      active: 0,
      options: [],
      product: {
        name: "",
        info: "",
        category: "",
        imageUrl:require("assets/img/profile.jpg"),
        price:0,
        color:"",
        version:"",
        num:0
      },
      colors: [
        {
          name: "梦幻紫",
          number: 1,
        },
        {
          name: "星空蓝",
          number: 2,
        },
        {
          name: "少女粉",
          number: 3,
        },
      ],
       screen:[
         {
           name:"65英寸",
           color:"黑色"
         },{
         name:"63英寸",
           color:"灰色"
         }
       ],
      versions: [
        {
          name: "6+128G",
          number: 1,
        },
        {
          name: "8+128G",
          number: 2,
        },
        {
          name: "6+256G",
          number: 3,
        },
      ],
    };
  },
  async created() {
    this.options = await getCategory();
    console.log(this.options);
  },
  methods: {
    next() {
      if (this.active++ > 2) {
        alert("dsd")
         addProduct(JSON.stringify(this.product)).then(res=>{
                console.log(res)
         })
      }
    },
    change() {
      this.$forceUpdate();
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
          this.product.imageUrl = target.result;
  
        };
      } else {
        throw error("no FileReader in window");
      }
    }

    
  },
};
</script>
<style>
.none {
  display: none;
}
.addproduct {
  width: 800px;
  height: 350px;
  position: absolute;
  left: 400px;
  /* top: 50%; */
  /* left: 50%; */
  top: 200px;
  background-color: #e8dcdc;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>