import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import questionnaire from '../components/question/NeQuestion.vue'
import result from '../components/question/NeResult.vue'
import checkresults from '../components/question/NeCheckResult.vue'
import administration from '../components/administration/NeAdmin.vue'
import adminPool from '../components/administration/NeAdminPool.vue'
import adminEntreprise from '../components/administration/NeAdminEntreprise.vue'
import adminQuestion from '../components/administration/NeAdminQuestions.vue'
import adminReponseQuestion from '../components/administration/NeAdminResponsesQuestion.vue'
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
  },
  {
    path: '/result/',
    name: 'result',
    component: result
  },
  {
    path: '/checkresults',
    name: 'checkresults',
    component: checkresults
  },
  {
    path: '/admin/',
    name: 'admin',
    component: administration
  },
  {
    path: '/admin/pool',
    name: 'admin-pool',
    component: adminPool
  },
  {
    path: '/admin/entreprise',
    name: 'admin-entreprise',
    component: adminEntreprise
  },
  {
    path: '/admin/questions/:entreprise',
    name: 'admin-questions',
    component: adminQuestion
  },
  {
    path: '/admin/questions/:entreprise/:question',
    name: 'admin-response-questions',
    component: adminReponseQuestion
  }
]

const router = new VueRouter({
  routes
})

export default router
