import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '../components/Home/Home'
import Test from '../components/Test/Test'
import Translation from '../components/Translation/Translation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    },
    {
      path: '/Translation',
      name: 'Translation',
      component: Translation
    }
  ]
})
