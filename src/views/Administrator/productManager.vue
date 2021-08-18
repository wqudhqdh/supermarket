<template>
  <div class="produtManager">
    <div class="top">
      <el-button type="primary" @click="showAll()">显示所有商品</el-button>
      <el-button type="primary" @click="addProduct()">添加商品</el-button>
      <input type="text" placeholder="请输入商品id" v-model="search" />
      <i class="fa fa-search" aria-hidden="true" @click="searchClick()"></i>
    </div>
    <el-table :data="this.productlist" height="450" border style="width: 100%"     :default-sort = "{prop: '_id', order: 'descending'}">
      <el-table-column prop="_id" label="商品id" width="80" sortable> </el-table-column>
      <el-table-column prop="category" label="类别" width="80">
      </el-table-column>
      <el-table-column prop="name" label="商品名称"> </el-table-column>
   
      <el-table-column label="商品图片">
        　　<template slot-scope="scope">
          　　　　<img
            :src="require('assets/img/' + scope.row.showInfoImg)"
            width="40"
            height="40"
            class="head_pic"
          />
          　　</template
        >
      </el-table-column>
      <el-table-column prop="version" label="内存"> </el-table-column>
      <el-table-column prop="color" label="颜色"> </el-table-column>
      <el-table-column prop="price" label="价格" sortable> </el-table-column>
      <el-table-column prop="sales" label="销量" sortable> </el-table-column>
      <el-table-column prop="inventory" label="库存" sortable > </el-table-column>

      <el-table-column label="操作">
        　　<template slot-scope="{ row }" >
          <i class="iconfont icon-xiugai1" @click="modifyProduct()" style="margin-right:10px"></i>
          <i class="iconfont icon-delete" @click="deleteProduct(row._id)"></i>
          　　</template
        >
      </el-table-column>
    </el-table>
 <add-product v-if="addState"></add-product>
  </div>
</template>
<script>
import { request } from "network/request.js";
import addProduct from 'views/Administrator/addProduct.vue'
export default {
  name: "productManager",
  data() {
    return {
      productlist: [],
      search: "",
      addState:0
    };
  },
  components:{
   addProduct
  },
  async created() {
    this.productlist = await request({
      url: "/api/getAllProductPramarter",
      method: "get",
    });
  },
  methods: {
    searchClick() {
        alert(this.search)
        this.productlist.forEach((item,index,arr)=>{
           if(item._id===this.search)
           {
               this.productlist.length=0
               this.productlist.push(item)
               this.search=""
           }
        })
    },
    modifyProduct()
    {
alert("modify")
    },
    deleteProduct(id)
  {
      let flag=confirm('确定要删除该商品吗？')
      if(flag)
      {
          this.productlist.forEach((item,index,arr)=>{
              if(item._id===id)
              {
                  this.productlist.splice(index,1);
                  return;
              }
          })
      }
  },
    // 显示所有商品
   async  showAll()
    {
    this.productlist = await request({
      url: "/api/getAllProductPramarter",
      method: "get",
    });
    },
    addProduct(){
        this.addState=!this.addState
    }

  },
};
</script>
<style>
.produtManager tabel {
  height: 400px;
  overflow: scroll;
}
.produtManager .top {
  margin-top: 20px;
  margin-bottom: 20px;
}
.produtManager .top input {
  margin-left: 20px;
  width: 200px;
  height: 38px;
  outline: none;
}
</style>