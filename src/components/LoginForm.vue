<template>
  <div class="shadow-lg login-window" id="#login-window">
    <form id="login" action="" @submit.prevent="login">
      <div class="login-title"><h3 class="fw-bold">账户登录</h3></div>
      <div class="mb-3">
        <label for="userId" class="form-label">用户名：</label>
        <input type="text" class="form-control" id="userId" aria-describedby="emailHelp" v-model="name">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">密码：</label>
        <input type="password" class="form-control" id="password" v-model="password">
      </div>
      <div id="login-button">
        <button type="submit" class="btn btn-primary">登录</button>
      </div>
      <div id="no-account">没有帐户？
        <button @click="toRegist" class="btn btn-link text-primary text-decoration-none">点击注册</button>
      </div>
    </form>
  </div>
</template>

<script>
// import {setCookie,/*getCookie*/} from '@/assets/js/cookie'
import axios from "axios";

export default {
  name: "LoginForm",
  data() {
    return {
      name: '',
      password: ''
    }
  },
  mounted() {
    if(window.sessionStorage.getItem('name'))
      this.$parent.$router.push({path:'/goods/list'});
  },
  methods: {
    toRegist: function () {
      this.$parent.$router.push({path: '/user/register'})
    },
    login: function () {
      if(this.name===''||this.password===''){
        window.alert('请输入完整信息')
        return
      }
      let data = {"name": this.name, "password": this.password}

      axios.post('/api/loginConfirm',data,{headers:{contentType:'application/json;charset=UTF-8'}}).then((response)=> {
        if(response.data==='登录成功') {
          // window.console.log(response)
          window.sessionStorage.setItem('name',this.name)
          this.$parent.$router.push('/goods/list')
          this.$parent.$router.go(0)
        }else if(response.data==='密码错误'){
          window.alert('密码错误！')
        }else if(response.data==='用户名不存在'){
          window.alert('用户名不存在！')
        }
      })
    }
  }
}
</script>

<style scoped>
  @import "../assets/css/app.css";
</style>
