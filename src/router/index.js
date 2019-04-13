import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '../components/Home/Home'
import Test from '../components/Test/Test'
import Translation from '../components/Translation/Translation'
import TestPrint from '../components/Test/components/print'
import UserCenter from '../components/Head/components/UserCenter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Home' // 重定向路由
    },
    { // 主页
      path: '/Home',
      name: 'Home',
      component: Home
    },
    { // 查看试卷页
      path: '/Test',
      name: 'Test',
      component: Test
    },
    { // 翻译页
      path: '/Translation',
      name: 'Translation',
      component: Translation
    },
    {
      path: '/TestPrint',
      name: 'TestPrint',
      component: TestPrint
    },
    { // 用户中心
      path: '/UserCenter',
      name: 'UserCenter',
      component: UserCenter
    }
  ]
})
