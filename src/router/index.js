import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import questionnaire from '../components/question/NeQuestion.vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/questionnaire/:name/:firstname/:enterprise/',
    name: 'questionnaire',
    component: questionnaire
  }
]

const router = new VueRouter({
  routes
})

export default router
