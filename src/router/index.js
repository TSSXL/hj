import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Home from '@/components/home'
import Forget from '@/components/forget'
import Classify from '@/components/classify'
import GoodsInfo from '@/components/goodsInfo'
import Mine from '@/components/mine'
import ShopCar from '@/components/shopCar'
import People from '@/components/people'
import For from '@/components/for'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/forget',
      name: 'Forget',
      component: Forget
    },
    {
      path: '/classify',
      name: 'Classify',
      component: Classify
    },
    {
      path: '/goodsInfo',
      name: 'GoodsInfo',
      component: GoodsInfo
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/shopCar',
      name: 'ShopCar',
      component: ShopCar
    },
    {
      path: '/people',
      name: 'People',
      component: People
    },
    {
      path: '/for',
      name: 'For',
      component: For
    }
  ]
})
