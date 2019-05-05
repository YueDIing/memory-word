import Vue from 'vue'
import Router from 'vue-router'
import bus from '../assets/script/bus'

// components
import home from '../components/home/home'
import test from '../components/test/test'
import translation from '../components/translation/translation'

// usercenter adn children components
import userCenter from '../components/head/userCenter'
import testprint from '../components/test/components/print'
import wordManage from '../components/head/components/wordManage'
import testmanage from '../components/head/components/testmanage'
import classifyManage from '../components/head/components/classifymanage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home' // 重定向路由
    },
    { // 当路由不匹配时, 重定向到首页
      path: '*',
      redirect: '/'
    },
    { // 主页
      path: '/home',
      name: '/home',
      component: home
    },
    { // 查看试卷页
      path: '/test',
      name: 'test',
      component: test
    },
    { // 翻译页
      path: '/translation',
      name: 'translation',
      component: translation
    },
    { // 用户中心
      path: '/userCenter',
      name: 'userCenter',
      component: userCenter,
      redirect: '/userCenter/wordManage',
      children: [
        { // 单词管理
          path: 'wordManage',
          name: 'wordManage',
          component: wordManage
        },
        { // 试卷管理
          path: 'testmanage',
          name: 'testmanage',
          component: testmanage
        },
        { // 分类管理
          path: 'classifyManage',
          name: 'classifyManage',
          component: classifyManage
        },
        { // 打印页
          path: 'testprint',
          name: 'testprint',
          component: testprint
        }
      ],
      /**
       * Vue Router 钩子函数
       * @param {Object} target 目标路由
       * @param {Object} origin 源路由
       * @param {function} next 回调, 进入下一个路由
       */
      beforeEnter (target, origin, next) {
        // 路由拦截, 防止没有权限进入管理页
        if (target.path.indexOf('userCenter') > -1) {
          console.log(bus)
          bus.$on('userInfo', res => {
            console.log(res)
            if (res._level / 1 !== 0) {
              next('/')
            }
            bus.$off('userInfo')
          })
        }
        next()
      }
    }
  ]
})
