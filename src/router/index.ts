import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import History from '../views/History.vue'
import EditRate from '../views/EditRate.vue'
import ChangePassword from '../views/ChangePassword.vue'
import Rates from '../views/Rates.vue'
import Testimonials from '../views/Testimonials.vue'
import Users from '../views/Users.vue'
import Signin from '../views/Signin.vue'
import TradeUpdate from '../views/TradeUpdate.vue'
import VerifyUser from '../views/VerifyUser.vue'
import Bank from '../views/Bank.vue'
import CreateCoin from '../views/CreateCoin.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/edit-rate/:reference',
    name: 'EditRate',
    component: EditRate,
    props: true,
    meta: {requiresAuth: true}
  },
  {
    path: '/transactions-history',
    name: 'History',
    component: History,
    meta: {requiresAuth: true}
  },
  {
    path: '/rates',
    name: 'Rates',
    component: Rates,
    meta: {requiresAuth: true}
  },
  {
    path: '/testimonials',
    name: 'Testimonials',
    component: Testimonials,
    meta: {requiresAuth: true}
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {requiresAuth: true}
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: {guest: true}
  },
  {
    path: '/sign-in',
    name: 'Signin',
    component: Signin,
    meta: {guest: true}
  },
  {
    path: '/update-trade/:reference',
    name: 'UpdateTrade',
    component: TradeUpdate,
    props: true,
    meta: {requiresAuth: true}
  },
  {
    path: '/verify-user/:reference',
    name: 'VerifyUser',
    component: VerifyUser,
    props: true,
    meta: {requiresAuth: true}
  },

  {
    path: '/add-bank',
    name: 'Bank',
    component: Bank,
    props: true,
    meta: {requiresAuth: true}
  },
  {
    path: '/add-coin',
    name: 'CreateCoin',
    component: CreateCoin,
    props: true,
    meta: {requiresAuth: true}
  },


  // {
  //   path: '/',
  //   name: 'VerifyUser',
  //   component: VerifyUser,
  //   props: true,
  //   meta: {requiresAuth: true}
  // },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// This checks if user has been updated then routes back to login page if not authenticated
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if (sessionStorage.getItem('isAuthenticated') === 'true'){
      next()
      return
    }
    next('/sign-in')
  }else{
    next()
  }
})

// This routes user that are already authenticated to dashboard if they try to access the login page 
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.guest)){
    if (sessionStorage.getItem('isAuthenticated') === 'true'){
      console.log("Authenticated");
      
      next('/')
      return
    }
    next()
  }else{
    next()
  }
})
export default router
