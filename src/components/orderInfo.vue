<template>
  <div class="title fw-bold" v-if="allOrderInfo.length>0">我的订单</div>
  <div class="shopping-cast">
    <table class="table table-borderless table-hover text-center shadow-lg align-middle" v-if="allOrderInfo.length>0">
      <thead>
      <tr>
        <th scope="col" style="width: 20%">订单号</th>
        <th scope="col" style="width: 40%" colspan="2">订单概览</th>
        <th scope="col" style="width: 20%">下单时间</th>
        <th scope="col" style="width: 7%">状态</th>
        <th scope="col" style="width: 13%">操作</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="i in allOrderInfo" :key="i">
          <td>{{ i[0] }}</td>
          <td style="display: flex">
            <div v-if="i[2].length<=3">
              <img v-for="j in i[2]" :key="j" :src=j[1] alt="" width="100" height="100" class="rounded-1 border-1 shadow" style="margin:0 5px">
            </div>
            <div v-if="i[2].length>3">
              <img :src=i[2][0][1] alt="" width="100" height="100" class="rounded-1 border-1 shadow" style="margin:0 5px">
              <img :src=i[2][1][1] alt="" width="100" height="100" class="rounded-1 border-1 shadow" style="margin:0 5px">
              <img :src=i[2][2][1] alt="" width="100" height="100" class="rounded-1 border-1 shadow" style="margin:0 5px">
            </div>
          </td>
          <td v-if="i[2].length>3">
            . . .共{{i[2].length}}件商品
          </td>
          <td v-if="i[2].length<=3">
            共{{i[2].length}}件商品
          </td>
          <td>{{ i[3].toString().slice(0,4) + "年" + i[3].toString().slice(4,6) + "月" + i[3].toString().slice(6,8) + "日 " + i[3].toString().slice(8,10) + ":" + i[3].toString().slice(10,12)}}</td>
          <td v-if="i[4]===0" class="text-danger">未付款</td>
          <td v-if="i[4]===1" class="text-success">已付款</td>
          <td v-if="i[4]===2" class="text-secondary">已退款</td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-outline-primary" v-if="i[4]===0||i[4]===2" @click="sureDelete(i[0])">删除</button>
              <button type="button" class="btn btn-outline-primary" v-if="i[4]===1" @click="payBack(i[0])">退款</button>
              <button type="button" class="btn btn-outline-primary" @click="toOrder(i[0])">查看</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div id="no-goods" v-if="allOrderInfo.length===0">
    <div class="text-center" style="left: 50%;top:50%;transform: translate(0,50%)">
      <img src="../assets/img/没有相关.png" alt="">
      <h6 class="text-secondary">这里没有任何订单，点击浏览商品。</h6>
      <button class="btn btn-primary" style="margin-top: 10px" @click="this.$parent.$router.push({path:'/goods/list'})">好的</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "orderInfo",
  data(){
    return{
      allOrderInfo:[]
    }
  },
  mounted() {
    if(!window.sessionStorage.getItem('name')){
      this.$parent.$router.push('/user/login')
      return
    }

    axios.post('/api/getAllOrders',{username:window.sessionStorage.getItem('name')}).then((response)=>{
      this.allOrderInfo=response.data
      for(var i in this.allOrderInfo)
        this.allOrderInfo[i][2]=JSON.parse(JSON.parse(this.allOrderInfo[i][2]))
      console.log(this.allOrderInfo)
    })
  },
  methods:{
    toOrder:function (id) {
      this.$parent.$router.push({path:'/order/payInfo',query:{username:window.sessionStorage.getItem('name'),orderId: id}})
    },
    sureDelete:function (id) {
      this.axios.post('/api/deleteOrder',{orderId:id, username:window.sessionStorage.getItem('name')}).then((response)=>{
        if(response.data==='删除成功')
          this.$parent.$router.go(0)
        else if(response.data==='删除失败')
          window.alert('系统异常，删除失败')
        else if(response.data==='用户信息不正确') {
          window.sessionStorage.removeItem('name')
          this.$parent.$router.push({path:'user/login'})
        }
      })
    },
    payBack:function (id) {
      this.axios.post('/api/payBack',{orderId:id, username:window.sessionStorage.getItem('name')}).then((response)=>{
        if(response.data==='退款成功')
          this.$parent.$router.go(0)
        else if(response.data==='退款失败')
          window.alert('系统异常，退款失败')
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
