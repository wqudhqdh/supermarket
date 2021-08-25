<template>
  <div>
    <div id="myChart" :style="{ width: '500px', height: '400px' }"></div>
  </div>
</template>
<script>
import { getAllProducts } from "network/home.js";
import {getProductDetail} from 'network/detail.js'
export default {
  name: "dataStatistics",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      xdatas: "",
      datas:[]
    };
  },
  created() {
    //获取所有的商品
  },
  async mounted() {
    let value = await getAllProducts();
    let result = [];
    value.forEach((element) => {
      result.push(element.name);
      this.getProductnum(element._id).then(value=>{
          console.log(1111)
          let sum=0
          value.forEach((item,idnex)=>{
             sum+=item.sales
          })
          this.datas.push(sum)
             this.drawLine();
      })
    });
    this.xdatas=result

  },
  methods: {
     async  getProductnum(id)
      {
          let productlist=await getProductDetail(id)
          return productlist
      },
    drawLine() {
      console.log(23232);
      console.log(this.xdatas);
      console.log(this.datas)
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "销量排行" },
        tooltip: {},
        xAxis: 
          {
            data: this.xdatas,
            triggerEvent: true,
            axisLabel:{interval: 0,rotate: '45'}
          },
        yAxis: {},
        series: [
          {

            name: "销量",
            type: "bar",
            data: this.datas
          },
        ],
      });
      console.log(this.xdatas);
    },
  },
};
</script>
<style>
#myChart{
    margin: auto;
}
</style>