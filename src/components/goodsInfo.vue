<template>
  <div class="title fw-bold">所有商品</div>

  <div class="all-goods container">
    <div class="row row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-1 align-items-center">
      <div class="col card-box" v-for="i in goodsInfo" :key="i">
        <div class="good-card card border-0 shadow-lg rounded-0">
          <img :src=i.img class="card-img-top" alt="...">
          <div class="card-body overflow-hidden">
            <h5 class="card-title text-danger">￥{{parseFloat(i.price).toFixed(2)}}</h5>
            <p class="card-text overflow-hidden">{{i.info}}</p>
          </div>
          <div class="card-body text-center">
            <button class="btn btn-primary" v-on:click="toAdd(i)">加入购物车</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
// import {goodsData} from "@/assets/js/data";

export default {
  name: "goodsInfo",
  data(){
    return{
      goodsInfo:null
    }
  },
  mounted() {
    this.axios.post('/api/goods')
    this.axios.post('/api/goods').then((response)=> {
      this.goodsInfo = eval(response.data)
      // window.console.log(response.data)
    })
  },
  methods:{
    toAdd:function (i) {
      this.$parent.$router.push({path:'/cart/add',query:{id:i.id,img:i.img,info:i.info,username:window.sessionStorage.getItem('name')}})
    }
  }
}
</script>

<style scoped>
  @import "../assets/css/app.css";
</style>
