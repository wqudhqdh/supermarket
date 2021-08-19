<template>
<div class="container" @click="itemclick">
    <!-- <slot name="img"></slot> -->
    <img :src="productinfo.img">
    <div class="info-container">
        <div class="product-info">
            <h3 class="name">{{productinfo.name}}</h3>
            <span class="info">{{productinfo.info}}</span>
        </div>
              <span class="price">{{productinfo.price}}元起</span>
    </div>
</div>
</template>
<script>
export default {
    name:"Product",
    props:["productinfo"],
    methods:{
        itemclick(){
            console.log("detail")
              this.$router.push("/detail/"+this.productinfo._id);
        }
    }
}
</script>
<style scoped>
.container{
    width: 234px;
    height: 300px;
    background-color:white;
    /* display: flex;
    flex-direction: column; */
    box-sizing: border-box;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
        align-items: center;
}
.container img{
    width:160px;
}
.product-info{
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.product-info .name{
    color: #333;
    font-size: 14px;
    margin-bottom: 5px;
}
.product-info .info{
    font-size: 12px;
    color: #b0b0bb;
}
.price{
    color: #ff6700;
}
</style>