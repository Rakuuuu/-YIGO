<template>
  <div class="title fw-bold" v-if="goodsInfo.length!==0">购物车</div>
  <div class="shopping-cast">
    <table class="table table-borderless table-hover text-center shadow-lg align-middle" v-if="goodsInfo.length!==0">
      <thead>
      <tr>
        <th scope="col" style="width: 10%">
          <input class="form-check-input" type="checkbox" id="select-all" @change="watchAll" v-model="isSelected">
          <label for="select-all">全选（{{goodsInfo.length}}）</label>
        </th>
        <th scope="col" style="width: 50%">商品</th>
        <th scope="col">价格</th>
        <th scope="col">数量</th>
        <th scope="col" style="width: 15%">小计</th>
        <th scope="col">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in goodsInfo" :key="i">
        <td>
          <input class="form-check-input" type="checkbox" id="checkbox" v-model="i[6]" @change="watchOne">
          <label for="checkbox"></label>
        </td>
        <td class="good-in-cast">
          <div class="good-photo">
            <img :src=i[1] class="img-thumbnail" alt="">
          </div>
          <div class="good-info"><p>{{i[2]}}</p></div>
        </td>
        <td class="text-danger">￥{{i[3]}}</td>
        <td>
          <input type="number" style="width: 45px; text-align: right" id="number" v-model="i[7]"  oninput="value=value.replace(/\D/g,null);value.slice(0,2);if(value>99)value=1;if(value<1)value=1" max="99" min="1" maxlength="2">
          <label for="number"></label>
        </td>
        <td class="text-danger">￥{{Math.abs((i[3]*i[7]).toFixed(2))}}</td>
        <td>
          <button class="btn btn-outline-primary" @click="deleteOne(i)">删除</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="bottom-bar shadow-lg" v-if="goodsInfo.length!==0">
    <div class="count">
      共选择了{{totalSelected}}件商品，总价格为<span class="text-danger">￥{{totalPrice.toFixed(2)}}</span>元。
    </div>
    <div class="button-group">
      <button class="btn btn-outline-warning" @click="deleteChoose">删除选中商品</button>
      <button class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#Modal">清空购物车</button>
      <button class="btn btn-outline-success" @click="toOrder"><span><img src="../assets/logo.png" width="15" height="15" alt=""></span>  结算</button>
    </div>
  </div>
  <div id="no-goods" v-if="goodsInfo.length===0">
    <div class="text-center" style="left: 50%;top:50%;transform: translate(0,50%)">
      <img src="../assets/img/没有相关.png">
      <h6 class="text-secondary">购物车中没有商品，点击浏览商品。</h6>
      <button class="btn btn-primary" style="margin-top: 10px" @click="this.$parent.$router.push({path:'/goods/list'})">好的</button>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">提示</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          确定要清除购物车吗？清除后的商品无法恢复。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">否</button>
          <button type="button" class="btn btn-primary" @click="sureClean">是</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "shoppingCast",
  mounted() {
    if(!window.sessionStorage.getItem('name')) {
      this.$parent.$router.push({path: '/user/login'})
      return
    }

    this.axios.post('/api/cart',{username:window.sessionStorage.getItem('name')}).then((response)=>{
      var tempdata=response.data
      // window.console.log(tempdata)
      for(var i=0;i<tempdata.length;i++) {
        tempdata[i].push(false,1)//追加是否选择和数量
        // console.log(tempdata[i])
      }
      this.goodsInfo=tempdata
      console.log(this.goodsInfo)
    })

    for(var i in this.goodsInfo)
      window.console.log(i)
  },
  data(){
    return{
      goodsInfo:[],
      isSelected:false//全选checkBox的值
    }
  },
  methods: {
    watchOne: function () {
      for (var i = 0; i < this.goodsInfo.length; i++)
        if (!this.goodsInfo[i][6]) {
          this.isSelected = false
          return
        }
      this.isSelected = true
    },
    watchAll: function () {
      for (var i = 0; i < this.goodsInfo.length; i++) {
        this.goodsInfo[i][6] = this.isSelected
      }
    },
    deleteOne: function (i) {
      axios.post("/api/deleteOne", {
        username: window.sessionStorage.getItem('name'),
        goodsId: i[0]
      }).then((response => {
        if (response.data === '删除成功')
          this.$router.go(0)
        else if (response.data === '删除失败')
          window.alert('系统错误，删除失败')
      }))
    },
    deleteChoose:function () {
      var toDelete= []
      for(var i=0; i<this.goodsInfo.length;i++)
        if(this.goodsInfo[i][6])
          toDelete.push(this.goodsInfo[i][0])//存待删除的商品id
      // window.console.log(toDelete)

      if(toDelete.length===0){
        window.alert('请选择至少1件商品')
        return
      }

      axios.post("/api/deleteChoose",{username:window.sessionStorage.getItem('name'),toDelete:toDelete}).then((response)=>{
        if (response.data === '删除成功')
          this.$router.go(0)
        else if (response.data === '删除失败')
          window.alert('系统错误，删除失败')
      })
    },
    sureClean: function () {
      axios.post("/api/cleanCart", {username: window.sessionStorage.getItem('name')}).then((response => {
        if (response.data === '清空成功')
          this.$router.go(0)
        else if (response.data === '清空失败')
          window.alert('清空失败')
      }))
    },
    toOrder:function () {
      var totalSelected= 0
      for(var i=0; i<this.goodsInfo.length;i++)
        if(this.goodsInfo[i][6])
          totalSelected+=1

      if(totalSelected===0){
        window.alert('请选择至少1件商品')
        return
      }

      var toPay=[]
      for(i=0; i<this.goodsInfo.length;i++)
        if(this.goodsInfo[i][6])
          toPay.push([this.goodsInfo[i][0],this.goodsInfo[i][1],this.goodsInfo[i][2],this.goodsInfo[i][3],this.goodsInfo[i][4],this.goodsInfo[i][5],this.goodsInfo[i][6],this.goodsInfo[i][7]])

      console.log(toPay)

      axios.post("/api/generateOrder", {username: window.sessionStorage.getItem('name'),toPay: toPay}).then((response => {
        if (response.data === '生成失败')
          window.alert('系统错误，订单生成失败')
        else
          this.$parent.$router.push({path:'/order/payInfo',query:{username:window.sessionStorage.getItem('name'),orderId: response.data}})
      }))
    }
  },
  computed:{
    totalPrice:function () {
      var totalPrice = 0

      for(var i=0; i<this.goodsInfo.length;i++)
        if(this.goodsInfo[i][6])
          totalPrice+=this.goodsInfo[i][3]*this.goodsInfo[i][7]

      return totalPrice
    },
    totalSelected:function () {
      var totalSelected = 0

      for(var i=0; i<this.goodsInfo.length;i++)
        if(this.goodsInfo[i][6])
          totalSelected+=1

      return totalSelected
    }
  }
}

</script>

<style scoped>
  @import "../assets/css/app.css";
</style>
