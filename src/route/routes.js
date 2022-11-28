import {createRouter, createWebHistory} from 'vue-router'
import goodsInfo from "@/components/goodsInfo";
import shoppingCast from "@/components/shoppingCast";
import loginForm from "@/components/LoginForm";
import RegistForm from "@/components/RegistForm";
import AddingToCart from "@/components/AddingToCart";
import payInfo from "@/components/payInfo";
import orderInfo from "@/components/orderInfo";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            name: 'none',
            path: '',
            component: goodsInfo,
            meta:{
                title:'易购YIGO | 浏览商品'
            }
        },
        {
            name: 'goodsInfo',
            path: '/goods/list',
            component: goodsInfo,
            meta:{
                title:'易购YIGO | 浏览商品'
            }
        },
        {
            name: 'cart',
            path: '/cart',
            component: shoppingCast,
            meta:{
                title:'易购YIGO | 购物车'
            }
        },
        {
            name: 'login',
            path: '/user/login',
            component: loginForm,
            meta:{
                title:'易购YIGO | 用户登录'
            }
        },
        {
            name: 'register',
            path: '/user/register',
            component: RegistForm,
            meta:{
                title:'易购YIGO | 用户注册'
            }
        },
        {
            name:'AddingToCart',
            path:'/cart/add',
            component: AddingToCart,
            meta:{
                title:'易购YIGO | 加入购物车'
            }
        },
        {
            name:'payInfo',
            path:'/order/payInfo',
            component: payInfo,
            meta:{
                title:'易购YIGO | 订单详情'
            }
        },
        {
            name:'orderInfo',
            path:'/order',
            component: orderInfo,
            meta:{
                title:'易购YIGO | 用户订单'
            }
        }
    ]
})

router.beforeEach((to, from, next) => {

    if (to.meta.title) { //如果设置标题，拦截后设置标题
        document.title = to.meta.title
    }
    next()
})

export default router;
