<template>
  <nav class="navbar navbar-expand-lg navbar-light shadow-lg">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/goods/list">
        <img src="./assets/img/购物车.png" alt="" width="35" height="35" style="margin-bottom: 5px">
        易购YIGO
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/goods/list">商品</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">购物车</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/order">订单</router-link>
          </li>
        </ul>
        <span>
            <router-link class="btn btn-outline-primary btn-sm" v-if="flag===0" to="/cart">登录</router-link>
            <span v-if="flag===1" class="text-secondary" style="top:3px;position:relative;">你好！{{userId}}。</span><button class="btn btn-outline-primary btn-sm" v-if="flag===1" @click="exit">退出</button>
      </span>
      </div>
    </div>
  </nav>

  <router-view/>
<!--  <LoginForm/>-->
<!--  <RegistForm/>-->
<!--  <goodsInfo/>-->
<!--  <shoppingCast/>-->
<!--  <payInfo/>-->
<!--  <AddingToCart/>-->
<!--  <div id="bottom-info"><p>-->
<!--    @Raku<br>-->
<!--    QQ:1506421526<br>-->
<!--    PoweredBy:Vue-Cli+Flask-->
<!--  </p>-->
<!--  </div>-->
</template>

<script>
// import payInfo from "@/components/payInfo";
// import RegistForm from "@/components/RegistForm";
// import LoginForm from "@/components/LoginForm";
// import goodsInfo from './components/goodsInfo.vue'
// import shoppingCast from "@/components/shoppingCast";
// import AddingToCart from "@/components/AddingToCart";

export default {
  data(){
    return{
      flag:0,//用于标记是否已经登陆，0登出，1登录
      userId:window.sessionStorage.getItem('name')
    }
  },
  mounted() {
    if(window.sessionStorage.getItem('name'))
      this.flag=1
    else
      this.flag=0
  },
  name: 'App',
  components: {
    // RegistForm,
    // LoginForm,
    // goodsInfo,
    // shoppingCast,
    // payInfo,
    // AddingToCart
  },
  methods:{
    toLogin:function () {
      this.$router.push({path:'/user/login'})
    },
    exit:function () {
      window.sessionStorage.removeItem('name')
      this.$router.go(0)
    }
  }
}
</script>

<style>
  @import "./assets/css/app.css";
</style>
