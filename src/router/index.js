import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/product',
    name: 'product.list',
    component: () => import(/* webpackChunkName: "about" */ '../views/manhoursinput/ListDaily.vue')
  },
  {
    path: '/product/create',
    name: 'product.create',
    component: () => import(/* webpackChunkName: "about" */ '../views/manhoursinput/Form.vue')
  },
  {
    path: '/user',
    name: 'user.list',
    component: () => import(/* webpackChunkName: "about" */ '../views/users/List.vue')
  },
  {
    path: '/user/create',
    name: 'user.create',
    component: () => import(/* webpackChunkName: "about" */ '../views/users/Form.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
