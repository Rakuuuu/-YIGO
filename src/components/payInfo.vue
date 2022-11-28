<template>
  <div class="title fw-bold">订单详情</div>
  <div class="shopping-cast">
    <table class="table table-borderless text-center shadow-lg align-middle">
      <thead>
      <tr>
        <th scope="col" style="width: 30%">商品</th>
        <th scope="col">价格</th>
        <th scope="col">数量</th>
        <th scope="col" style="width: 20%">小计</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in orderInfo[0]" :key="i">
        <td class="good-in-cast" style="margin-left: 20px">
          <div class="good-photo">
            <img :src=i[1] class="img-thumbnail" alt="">
          </div>
          <div class="good-info" style="top: 50%;transform: translate(0,25%)"><p>{{i[2]}}</p></div>
        </td>
        <td class="text-danger">￥{{parseFloat(i[3]).toFixed(2)}}</td>
        <td>
          x<span>{{i[7]}}</span>
        </td>
        <td class="text-danger">￥{{(i[3]*i[7]).toFixed(2)}}</td>

      </tr>
      <tr>
        <td colspan="3"></td>
        <td>总价格：<span class="text-danger">￥{{totalPrice}}</span></td>
      </tr>

      <tr style="display: flow">
        <td colspan="4">
          <div class="btn-group" style="padding: 20px 0;" role="group" aria-label="Basic mixed styles example">
            <button type="button" class="btn btn-outline-warning" @click="this.$parent.$router.push({path:'/order'})">返回</button>
            <button type="button" class="btn btn-success" @click="toPay" v-if="orderInfo[1]===0">点击支付</button>
            <button type="button" class="btn btn-outline-success" v-if="orderInfo[1]===1" disabled>已支付</button>
            <button type="button" class="btn btn-outline-secondary" v-if="orderInfo[1]===2" disabled>已退款</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "payInfo",
  data(){
    return{
      orderInfo:[]
    }
  },
  mounted() {
    if(!window.sessionStorage.getItem('name') || window.sessionStorage.getItem('name') !==this.$parent.$route.query.username)
      this.$parent.$router.push({path:'/user/login'});

    axios.post("/api/getOrder",{orderId:this.$parent.$route.query.orderId}).then((response)=>{
      if(response.data==='获取失败') {
        return
      }
      console.log(response.data)
      console.log(typeof response.data[0][0]) //string
      console.log(typeof response.data[0][1]) //number
      this.orderInfo.push(eval(response.data[0][0]),response.data[0][1])
      console.log(this.orderInfo)
      console.log(this.orderInfo[0].length)
    })
  },
  computed:{
    totalPrice:function () {
      var totalPrice=0

      for(var i in this.orderInfo[0])
        totalPrice+=this.orderInfo[0][i][3]*this.orderInfo[0][i][7]

      return totalPrice.toFixed(2)
    }
  },
  methods:{
    toPay:function () {
      axios.post('/api/toPay',{orderId:this.$parent.$route.query.orderId, username:window.sessionStorage.getItem('name')}).then((response)=>{
        if(response.data==='支付成功')
          this.$parent.$router.go(0)
        else if(response.data==='支付失败')
          window.alert('系统异常，支付失败')
        else if(response.data==='用户信息不正确') {
          window.sessionStorage.removeItem('name')
          this.$parent.$router.push({path:'user/login'})
        }
      })
    }
  }
}
</script>

<style scoped>
  @import "../assets/css/app.css";
</style>
