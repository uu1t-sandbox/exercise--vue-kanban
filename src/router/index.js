import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home.vue'
import KbnLoginView from '@/components/templates/KbnLoginView.vue'
import { authorizeToken } from './guards'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: KbnLoginView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '@/views/About.vue')
    }
  ]
})

router.beforeEach(authorizeToken)

export default router
