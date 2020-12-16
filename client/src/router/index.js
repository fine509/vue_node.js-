import Vue from 'vue'
import Router from 'vue-router'

import Index from 'views/index/index.vue'
import Register from 'views/login_register/Register'
import NotFound from 'views/404/404'
import Login from 'views/login_register/Login'
import Home from 'views/index/indexChild/home.vue'
import Profile from 'views/index/indexChild/profile.vue'
import Fundlist from 'views/index/indexChild/fundlist.vue'
import User from 'views/index/indexChild/user.vue'
import Summation from 'views/index/indexChild/summation.vue'
import CashCount from 'views/index/indexChild/cashCount.vue'
import MiBao from 'views/index/indexChild/MiBao.vue'
import Findpassword from 'views/login_register/Findpassword.vue'
import Owe from 'views/index/indexChild/owe.vue'
import Borrow from 'views/index/indexChild/borrow.vue'
import Analyse from 'views/index/indexChild/analyse.vue'
Vue.use(Router)

const routes = [{
        path: '/',
        redirect: '/index/home'
    },
    {
        path: '/index',
        name: 'index',
        redirect: '/index/home',
        component: Index,
        children: [{
            path: 'home',
            name: 'home',
            component: Home
        }, {
            path: 'profile',
            name: 'profile',
            component: Profile

        }, {
            path: 'fundlist',
            component: Fundlist
        }, {
            path: 'user',

            component: User
        }, {
            path: 'summation',
            component: Summation
        }, {
            path: 'cashcount',
            component: CashCount
        }, {
            path: 'mibao',
            component: MiBao
        }, {
            path: 'owe',
            component: Owe
        }, {
            path: 'Borrow',
            component: Borrow
        }, {
            path: 'analyse',
            component: Analyse
        }]
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/login',
        component: Login,
        children: []
    },
    {
        path: '/find',
        component: Findpassword
    },


    //出错
    {
        path: '*',
        component: NotFound
    }
]

//创建router实例
const router = new Router({
    routes,
    mode: 'history',
    base: process.env.BASE_URL
})


//路由守卫 判断是否存在token,若存在则表示已经登录过了
router.beforeEach((to, from, next) => {
    const hastoken = localStorage.logintoken ? true : false;
    if (to.path.includes('/login') || to.path.includes('/register') ||
        to.path.includes('/find')) { next() } else hastoken ? next() : next('/login')
    if ((to.path.includes('/login') || to.path.includes('/register')) && hastoken) {
        next('/index')
    }

})

export default router