import Vue from 'vue'
import GSignInButton from 'vue-google-signin-button'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import HomePage from './views/HomePage.vue'

Vue.use(GSignInButton)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})
