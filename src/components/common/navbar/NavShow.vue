<template>
     <div  class="show-products">
     <ul>
         <li v-for="(item,i) in products" :key=i>
             <div class="icon">
                 <img :src="require('assets/img/'+item.img)">
             </div>
             
             <div class="prod-info">
                 <span class="name">
                    {{item.name}}
                 </span>
                 <span class="price">{{item.price}}</span>
             </div>
         </li>
     </ul>
  </div>

</template>


<script>
export default {
    name:"NavShow",
    data(){
        return{
          
        }
    },
    props:["products"]
}
</script>


<style scoped>
.show-products {
    width: 100%;
    height: 200px;
    /* background-color: orangered; */
    border-top:1px solid #e0e0e0 ;
    box-sizing: border-box; 
    padding-top: 20px;
    position: absolute;
    z-index: 2;
    background-color: white;
}
.show-products ul{
    width: 100%;
    height: 100%;
    display: flex;
 
    
}
.show-products ul li .icon{
    width: 100%;
    /* border-right:1px solid palevioletred; */
    border-left:1px solid  #e0e0e0;
}
.show-products ul li .icon img{
    /* width: 130px; */
}
.show-products ul li{
    /* border-right:1px solid  #e0e0e0 ; */
    flex: 1;
}
.show-products ul li .prod-info{
width: 100%;
height: 50px;
/* border:1px 
solid palegreen; */
display: flex;
flex-direction: column;
justify-content: space-around;
}
.show-products ul li .prod-info .name{
    font-size: 15px;
    font-weight:400;
}
.show-products ul li .prod-info .price{
    font-size: 15px;
    color: orange;

}
</style>