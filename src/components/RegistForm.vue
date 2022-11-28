<template>
  <div id="regist-form" class="shadow-lg">
    <form action="" @submit.prevent="getRegister" method="post">
      <div class="login-title"><h3 class="fw-bold">创建您的账户</h3></div>
      <div class="mb-3">
        <label for="exampleInput1" class="form-label">用户名：</label>
        <input type="text" class="form-control" id="exampleInput1" v-model="userId">
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">密码：</label>
        <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword2" class="form-label">确认密码：</label>
        <input type="password" class="form-control" id="exampleInputPassword2" v-model="confirmPassword">
      </div>

      <div id="regist-button">
        <button type="submit" class="btn btn-primary">注册</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegistForm",
  data(){
    return{
      userId:'',
      password:'',
      confirmPassword:''
    }
  },
  methods:{
    getRegister: function () {
      if(this.password!==this.confirmPassword) {
        window.alert('两次密码输入不符，请重新输入！')
        return
      }

      let data = {'userId':this.userId,'password':this.password}

      axios.post('/api/registerConfirm',data).then((response)=>{
        if(response.data==='用户名已存在')
          window.alert('用户名已存在，请重新输入！')
        else if(response.data==='注册成功') {
          window.alert('注册成功，请登录！')
          this.$parent.$router.push({path:'/user/login'})
        }
        else if(response.data==='发生错误')
          window.alert('系统错误！')
      })
    }
  }
}
</script>

<style scoped>
  @import "../assets/css/app.css";
</style>
