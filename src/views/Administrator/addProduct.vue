<template>
<div class="addproduct">
    

    <el-steps :active="active" :align-center="true" :finish-status="wait">
  <el-step title="步骤 1">
  </el-step>
  <el-step title="步骤 2">
  </el-step>
  <el-step title="步骤 3">
  </el-step>
</el-steps>
<div v-if="active===0">232323</div>
<div v-else-if="active===1">23</div>
<div v-else="active===2">2</div>
<el-button style="margin-top: 12px;" @click="next">下一步</el-button>

</div>

</template>
<script>
export default {
    name:"addProduct",
     data() {
      return {
        active: 0
      };
    },

    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      }
    }
}
</script>
<style>
.addproduct{
    width: 800px;
    height: 300px;
    position: absolute;
    left: 400px;
    /* top: 50%; */
    /* left: 50%; */
    top: 200px;
    background-color: #f3f2f2;
}
</style>