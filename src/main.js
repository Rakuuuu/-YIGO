import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './route/routes.js'
import axios from 'axios';
import VueAxios from 'vue-axios';
//注意use要在mount之前
const app = createApp(App)
app.use(router)
axios.defaults.baseURL = 'https://43.139.40.29:5000'
app.use(VueAxios,axios)
app.mount('#app')
