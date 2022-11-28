<template>
  <div class="title fw-bold">{{ msg }}</div>
  <div class="card mb-3 border-0 shadow-lg" style="max-width: 650px; margin-top: 80px;left:50%;transform: translate(-50%)">
    <div class="row g-0">
      <div class="col-md-4">
        <img :src=goods.img style="position: relative;padding: 15px" class="img-fluid  rounded-start" alt="..." width="200">
      </div>
      <div class="col-md-8" style="position:relative;top: 50%; transform: translate(0,15%)">
        <div class="card-body text-center">
          <h5 class="card-title" style="padding-bottom: 20px">{{ goods.info }}</h5>
          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button class="btn btn-outline-primary" style="margin-bottom: 10px" v-on:click="this.$parent.$router.push({path:'/cart'})">去购物车</button>
            <button class="btn btn-outline-primary" style="margin-bottom: 10px" v-on:click="this.$parent.$router.push({path:'/goods/list'})">继续购物</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddingToCart",
  data(){
    return{
      goods: {},
      msg:''
    }
  },
  mounted() {
    if(!window.sessionStorage.getItem('name')) {
      this.$parent.$router.push('/user/login')
      return
    }

    this.goods = {
      id:this.$parent.$route.query.id,//获取url的传参
      img:this.$parent.$route.query.img,
      info:this.$parent.$route.query.info
    }

    axios.post('api/addToCart',
        {
            username:window.sessionStorage.getItem('name'),
            goodsId:this.$parent.$route.query.id
        }).then((response)=>{
          if(response.data==='加入失败')
            this.$parent.$router.push({path:'/goods/list'})
          else if(response.data==='商品已存在于购物车')
            this.msg='商品已存在于购物车中'
          else
            this.msg='商品已成功加入购物车'
        }
    )
  }
}
</script>

<style scoped>
</style>
