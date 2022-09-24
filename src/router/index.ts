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
    props: true
  },
  {
    path: '/transactions-history',
    name: 'History',
    component: History
  },
  {
    path: '/rates',
    name: 'Rates',
    component: Rates
  },
  {
    path: '/testimonials',
    name: 'Testimonials',
    component: Testimonials
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: '/sign-in',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/update-trade/:reference',
    name: 'UpdateTrade',
    component: TradeUpdate,
    props: true
  },
  {
    path: '/verify-user/:reference',
    name: 'VerifyUser',
    component: VerifyUser,
    props: true
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
