import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/index'
import Register from '@/views/Register'
import Login from '@/views/login'
import Home from '@/views/Home'
import InfoShow from '@/views/InfoShow'
import FundList from '@/views/FundList'
import UserList from '@/views/UserList'

import NotFound from '@/views/404'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Index,
    children: [{
        path: "",
        component: Home
      },
      {
        path: "/home",
        name: "home",
        component: Home
      },
      {
        path: "/infoshow",
        name: "infoshow",
        component: InfoShow
      },
      {
        path: "/fundlist",
        name: "fundlist",
        component: FundList
      },
      {
        path: "/fundlist",
        name: "fundlist",
        component: FundList
      },
      {
        path: "/userlist",
        name: "userlist",
        component: UserList
      }
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // ls 中是否拥有token
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login")
  }
})


export default router